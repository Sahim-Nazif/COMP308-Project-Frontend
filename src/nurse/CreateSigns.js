import React, { useState, useEffect } from 'react'
import { createSigns } from './apiNurse'
import { isAuthenticated } from '../auth/index'
import { Redirect } from 'react-router-dom'
import Layout from '../core/Layout'



const CreateSigns = ({ history }) => {

    const [values, setValues] = useState({

        bodyTemperature: '',
        heartRate: '',
        bloodPressure: '',
        respiratoryRate: '',
        patientEmail: '',
        user: {},
        loading: false,
        error: '',
      
        redirectUser: false,
        formData: '',

    })

    const {
        bodyTemperature,
        heartRate,
        bloodPressure,
        respiratoryRate,
        patientEmail,
        loading,
        error,
    
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

        event.preventDefault()

        setValues({ ...values, error: '', loading: true })

        const nurseId = isAuthenticated().user._id
        const token = isAuthenticated().token
        createSigns(nurseId, token, formData)
            .then(data => {

                if (data.error) {

                    setValues({ ...values, error: data.error })
                } else {

                    setValues({

                        ...values,
                        bodyTemperature: '',
                        heartRate: '',
                        bloodPressure: '',
                        respiratoryRate: '',
                        patientEmail: '',

                        loading: false,
                        redirectUser: true
                    

                    })
                }
            })

    }



    const vitalSignsForm = () => (

        <div className='container col-md-5 mt-5'>
            <h4 className='mb-5 text-center'>Add Body Vital Signs</h4>
            <form onSubmit={clickSubmit}>

                <div className="mb-3">
                    <label className="form-label">Body Temprature</label>
                    <input onChange={handleChange('bodyTemperature')} type="number" className="form-control" value={bodyTemperature} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Heart Rate</label>
                    <input onChange={handleChange('heartRate')} type='number' className="form-control" value={heartRate} required />
                </div>

                <div className="mb-3">
                    <label className="form-label"> Blood Pressure </label>

                    <input onChange={handleChange('bloodPressure')} type="number" className="form-control" value={bloodPressure} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Respiratory Rate</label>
                    <input onChange={handleChange('respiratoryRate')} type="number" className="form-control" value={respiratoryRate} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Patient Email</label>
                    <input onChange={handleChange('patientEmail')} type="email" className="form-control" id="password" value={patientEmail} required />
                </div>
                <button className="btn btn-raised btn-dark">Submit</button>

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

    const returnUserToPage = () => {

        if (redirectUser) {
            return <Redirect to='/displaysigns' />
        }

    }


    const showLoading = () => (

        loading && (<div className='alert alert-success'><h3>Loading....</h3></div>)
    )

    return (

        <div>

            <Layout title='Add Body Vital Signs' description='You can create vital body signs for patients'>


            </Layout>
        

            <div>
                {vitalSignsForm()}
                {displayError()}
                {returnUserToPage()}
                {showLoading()}

            </div>
        </div>
    );
}

export default CreateSigns;