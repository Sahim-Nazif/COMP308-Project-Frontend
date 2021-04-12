import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {signup} from '../auth/index'
import Layout from '../core/Layout'



const Signup = () => {

    const [values, setValues]=useState({

        firstName:'',
        lastName:'',
        email:'',
        password:'',
        error:'',
        success:false
    })

    const {firstName, lastName, email, password, error, success}=values;

    const handleChange=name=> event=>{

        setValues({...values, error:false, [name]:event.target.value})
    }


    const clickSubmit=(event)=>{

        event.preventDefault()

        setValues({...values, error:false})

        signup({firstName, lastName, email, password})
                .then(data=>{
                    if(data.error) {
                        setValues({...values, error:data.error, success:false})
                    }
                    else {

                        setValues({
                            ...values,
                            firstName:'',
                            lastName:'',
                            email:'',
                            password:'',
                            error:'',
                            success:true
        
                        })
                    }
                })
    }


const SignupForm=()=> (

    <div className='container col-md-5 mt-5'>
    
        <form>
           
            <div className="mb-3">
                <label  className="form-label">Frist Name</label>
                <input onChange={handleChange('firstName')} type="text" className="form-control" id="fname" value={firstName}/>
            </div>

            <div className="mb-3">
                <label  className="form-label">Last Name</label>
                <input onChange={handleChange('lastName')}type="text" className="form-control" id="lName" value={lastName}/>
            </div>

            <div className="mb-3">
                <label for="email" className="form-label">
                    Email address
                </label>
                <input  onChange={handleChange('email')} type="email" className="form-control" id="email" value={email}/>
            </div>

            <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">Password</label>
                <input onChange={handleChange('password')}type="password" className="form-control" id="password"  value={password}/>
            </div>
        
            <button onClick={ clickSubmit} className="btn btn-raised btn-dark">Sign Up</button>

        </form>

    </div>

    )

    const displayError=()=>(
        
        <div className='container col-md-4'>
            <div className='alert alert-danger alert-dismissable text-center' style={{display:error ? '' :'none'}}>
                {error}
            </div>
        </div>
        
        
        )

        const displaySuccess=()=>(
        
            <div className='container col-md-4'>
                <div className='alert alert-success alert-dismissable' style={{display:success ? '' :'none'}}>
                    New account is created. Please <Link to='/signin'>Signin</Link>
                </div>
            </div>
            
            
            )

    return (
    
        <Layout title='Sign up' description='Not Registered Yet? Sign up to Get Started !'>
    
            {displayError()}
            {displaySuccess()}
            {SignupForm()}
        </Layout>

   
    );
}

export default Signup;