import React, {useState, useEffect} from 'react'
import {userById, update_user_profile,  verify_token_forUpdate} from './apiPatient'
import {Redirect } from 'react-router-dom'
import {isAuthenticated} from '../auth/index'
import Layout from '../core/Layout'

const UpdateProfile = ({match}) => {

    const [values, setValues]=useState({

        firstName:'',
        lastName:'',
        email:'',
        error:'',
        success:false

    })


    const {firstName, lastName, email,error, success}=values;

    const {token}= isAuthenticated()

    const init=userId=>{

        userById(userId, token).then(data =>{
            if (data.error) {

                setValues({...values,error:true})
            }else{
                setValues({...values,
                            firstName:data.firstName,
                            lastName:data.lastName,
                            email:data.email})
            }
        })
    }


    useEffect(()=>{
        init(match.params.userId)
    },[])

    const handleChange=name=>e=>{
        setValues({...values, error:false, [name]:e.target.value})
    }

    const clickSubmit=event=>{

        event.preventDefault()
        update_user_profile(match.params.userId, token, {firstName, lastName,email})
                            .then(data=>{
                                if (data.error) {
                                    console.log(error)
                                } else{
                                    
                                    verify_token_forUpdate(data, ()=>{

                                        setValues({...values,firstName:data.firstName,
                                                    lastName:data.lastName,
                                                    email:data.email,
                                                     success:true})
                                    })
                                }
                            })

    }

    const redirectUser=(success)=>{

        if(success){
            return <Redirect to='/user/dashboard'/>
        }
    }
    const UpdateForm=(firstName, lastName, email)=> (

        <div className='container col-md-5 mt-5'>
        
            <form onSubmit={clickSubmit}>
               
                <div className="mb-3">
                    <label className="form-label">Frist Name</label>
                    <input onChange={handleChange('firstName')} type="text" className="form-control" value={firstName}/>
                </div>
    
                <div className="mb-3">
                    <label  className="form-label">Last Name</label>
                    <input onChange={handleChange('lastName')}type="text" className="form-control" value={lastName}/>
                </div>
    
                <div className="mb-3">
                    <label for="email" className="form-label">
                        Email address
                    </label>
                    <input  onChange={handleChange('email')} type="email" className="form-control"  value={email} />
                </div>
    
                <button  className="btn btn-raised btn-dark">Update</button>
    
            </form>
    
        </div>
    
        )

    return ( 
        
        <Layout title='Update Profile' description='You can update your profile information'>
    
        {UpdateForm(firstName, lastName, email)}
        {redirectUser(success)}
    </Layout>

     );
}
 
export default UpdateProfile;