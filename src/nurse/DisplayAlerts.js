import React, { useState, useEffect } from 'react'
import { isAuthenticated } from '../auth/index'
import { Link } from 'react-router-dom'
import { listAlerts,deleteAlert } from '../nurse/apiNurse'
import Layout from '../core/Layout'


const DisplayAlerts = () => {

    
    const [values, setValues] = useState({

        alerts: [],
        

    })

    const { alerts } = values;
    const init = () => {
        const nurseId = isAuthenticated().user._id
        const token = isAuthenticated().token
        listAlerts(nurseId, token).then(data => {

            if (data.error) {
                console.log(data.error)
            }
            else {
                setValues({alerts: data })
               
            }
        })
    }

    const removeAlert=alertId=>{
        window.location.reload()
        const nurseId = isAuthenticated().user._id
        const token = isAuthenticated().token
        deleteAlert(alertId,nurseId,token )
                    .then(data =>{

                        if (data.error){
                            console.log(data.error)
                        }
                        else{
                            console.log('alert deleted')
                        }
                    })

    }


    useEffect(() => {

        init()

    }, [])


   
    const displayAlerts = () => {

        return (
            
            <div className='row'>
                {

                    alerts.map((alert, index) => {

                        return (

                            <div className="card col-md-3 mr-6 mt-2 bodySignsCard " key={index} >

                                <div className="card-body"  >

                                    <h5 className="card-title mt-3 text-danger">
                                        {alert.sendBy.firstName} {alert.sendBy.lastName}
                                    </h5>
                                    <hr />
                                    <p>Title: {alert.title}</p>
                                    <p>Description :{alert.body}</p>    
                                    <p>Alert SentBy: {alert.sendBy.firstName}</p> 
                                    <p >Sent Date: {new Date(alert.created).toDateString()}</p>                             
                                    <button onClick={()=>removeAlert(alert._id)} className='btn btn-success btn-sm'>Resolve</button>

                                </div>
                            </div>
                        )

                    }
                    )}

            </div>

        )
          
    }

    return (
        <>

            <Layout  title='Alerts' description='Following Alerts were received from patients'>

            </Layout>

            <div className='container'>
                <h5 className="mt-5 mb-5">You have ({alerts.length}) unresolved alerts</h5>
                {displayAlerts()}
            </div>
        </>

    );
}
export default DisplayAlerts;