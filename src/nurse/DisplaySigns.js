import React, { useState, useEffect } from 'react'
import { isAuthenticated } from '../auth/index'
import { Link } from 'react-router-dom'
import { list } from '../nurse/apiNurse'
import Layout from '../core/Layout'


const DisplaySigns = () => {

    const [values, setValues] = useState({

        signs: [],
        

    })

 
    const { signs } = values;
    const init = () => {
        const nurseId = isAuthenticated().user._id
        const token = isAuthenticated().token
        list(nurseId, token).then(data => {

            if (data.error) {
                console.log(data.error)
            }
            else {
                setValues({ signs: data })
            }
        })
    }

    useEffect(() => {

        init()

    }, [])



    const displaySigns = () => {

        return (

            <div className='row'>
                {

                    signs.map((sign, index) => {

                        return (

                            <div className="card col-md-3 mr-6 mt-2 bodySignsCard " key={index} >

                                <div className="card-body"  >

                                    <h5 className="card-title mt-3 text-primary">
                                        Body Sign
                                    </h5>
                                    <hr />
                                    <p>Body Temprature: {sign.bodyTemperature}</p>
                                    <p>Heart Rate :{sign.heartRate}</p>

                                    <p>Blood Pressure: {sign.bloodPressure}</p>

                                    <p> Respiratory Rate : {sign.respiratoryRate}</p>
                                    <p> Email: {sign.patientEmail}</p>
                                    <p className='text-danger'>Visit Date : {new Date(sign.created).toDateString()}</p>
                                    <hr />

                                    <h6 className='text-success'>Submitted By: {sign.infoPostedBy.firstName} </h6>

                                
                                    
                                    <Link to='/' className='btn btn-info btn-sm'>Read more</Link>

                                </div>
                            </div>
                        )

                    }
                    )}

            </div>

        );

    }


    return (

        <>

            <Layout title='All Body Signs' description='These body signs belongs to registered patients'>

            </Layout>

            <div className='container'>
                <h2 className="mt-5 mb-5 text-info">Registered Patients' Body Signs</h2>
                {displaySigns()}
            </div>
        </>

    );
}

export default DisplaySigns;