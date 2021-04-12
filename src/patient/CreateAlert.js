import React, { useState, useEffect } from 'react'
import {  createAlert } from './apiPatient'
import { isAuthenticated } from '../auth/index'
import { Redirect } from 'react-router-dom'
import Layout from '../core/Layout'



const CreateAlert = ({ history }) => {

    const [values, setValues] = useState({

        title: '',
        body:'',
        user: {},
        loading: false,
        error: '',
        redirectUser: false,
        success:false,
        formData: '',
        })

    const {
        title,
        body,
        loading,
        error,
        success,
        redirectUser,
        formData
    } = values


    const init = () => {

        setValues({ ...values, formData: new FormData() })
    }

    useEffect(() => {

        init()
    }, [])

    const handleChange = name => event => {
        const value = event.target.value
        formData.set(name, value);
        setValues({ ...values, error: false, [name]: event.target.value })
    }


    const clickSubmit = event => {
        showAlert()
        event.preventDefault()

        setValues({ ...values, error: '', loading: true })

        const userId = isAuthenticated().user._id
        const token = isAuthenticated().token
        createAlert(userId, token, formData)
            .then(data => {

                if (data.error) {

                    setValues({ ...values, error: data.error })
                } else {

                    setValues({

                        ...values,
                        title: '',
                        body: '',
                        loading: false,
                        success:true,
                        redirectUser: true
                     
                    })
                }
            })

    }

    const showAlert=()=>{

        alert('Your alert was sent successfuly') 
    }

    const DisplayAlertForm = () => (

        <div className='container col-md-5 mt-5'>
            <h4 className='mb-5 text-center'>Send Alert</h4>
            <form onSubmit={clickSubmit}>

                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input onChange={handleChange('title')} type="text" className="form-control" value={title} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea onChange={handleChange('body')} type='text' className="form-control" value={body} required />
                </div>
                <button  className="btn btn-raised btn-dark">Send Now</button>

            </form>

        </div>

    )


    const displayError = () => (

        <div className='container col-md-4'>
            <div className='alert alert-danger alert-dismissable' style={{ display: error ? '' : 'none' }}>
                {error}
            </div>
        </div>


    )
//baktash will work on sent alert
    const returnUserToPage = () => {
      
        if (redirectUser) {
            return <Redirect to='/user/dashboard?alert:sent' />
        }

    }
    const displaySuccess=()=>(

        <div className='container col-md-4'>
            <div className='alert alert-success alert-dismissable' style={{display:success ? '' :'none'}}>
                Alert Sent Successfully!
            </div>
        </div>


        )

    const showLoading = () => (

        loading && (<div className='alert alert-success'><h3>Loading....</h3></div>)
    )

    return (

        <div>

            <Layout title='Send Alert' description='Submit your alert to Your assigned nurse'>


            </Layout>
        

            <div>
                {DisplayAlertForm()}
                {displayError()}
                {displaySuccess()}
                {returnUserToPage()}
                {showLoading()}

            </div>
        </div>
    );
}

export default CreateAlert;