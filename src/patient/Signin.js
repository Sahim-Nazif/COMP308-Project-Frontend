import React, { useState } from 'react'
import {Redirect } from 'react-router-dom'
import { signin, authenticate } from '../auth/index'
import Layout from '../core/Layout'




const Signin = () => {

    const [values, setValues] = useState({

        email: '',
        password: '',
        error: '',
        loading: '',
        redirectUser: false

    });


    const { email, password, error, loading, redirectUser } = values;

    const handleChange = name => event => {

        setValues({ ...values, erro: false, [name]: event.target.value })
    }


    const clickSubmit = event => {


        event.preventDefault()
        setValues({ ...values, error: false, loading: true })
        signin({ email, password })
            .then(data => {

                if (data.error) {

                    setValues({ ...values, error: data.error, loading: false })
                }
                else {


                    authenticate(data, () => {

                        setValues({ ...values, redirectUser: true })
                    })
                }
            })
    }

    const SigninForm = () => (


        <div className='container col-md-5 mt-5'>
      
            <form onSubmit={clickSubmit}>

                <div className="form-group">
                    <label className="text-muted">
                        Email address
                    </label>
                    <input onChange={handleChange('email')} type="email" className="form-control" value={email} required />
                </div>

                <div className="form-group">
                    <label className='text-muted'>Password</label>
                    <input onChange={handleChange('password')} type="password" className="form-control" value={password} required />
                </div>

                <button className="btn btn-dark">Sign In</button>

            </form>

        </div>


    )


    const displayError = () => (

        <div className='container col-md-4 mt-5'>
            <div className='alert alert-danger alert-dismissable' style={{ display: error ? '' : 'none' }}>
                {error}
            </div>
        </div>


    )

    const showLoading = () =>

        loading && (

            <div lassName='container col-md-4'>
                <div className='alert alert-info'>
                    <h3>Loading....</h3>
                </div>

            </div>
        )

    const returnUserToPage = () => {

        if (redirectUser) {
            return <Redirect to='/' />
        } else {

            return <Redirect to='/signin' />
        }

    }
    return (

        
            <Layout title='Welcome to Sign in' description='Sign in to get started'>
            {displayError()}
               {SigninForm()}
               
                {showLoading()}
                {returnUserToPage()}
            </Layout>

        
    );
}

export default Signin;