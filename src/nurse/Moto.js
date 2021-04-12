import React, { useState, useEffect } from 'react'
import { isAuthenticated } from '../auth';
import { list } from '../nurse/nurseCore'
import { Link } from 'react-router-dom'
import ReactPlayer from "react-player";
import '../styles.css'
import defaultImage from '../images/better.jpg'

const Moto = () => {

    const [values, setValues] = useState({

        motos: [],


    })

    const { motos } = values;


    const init = () => {

        list().then(data => {

            if (data.error) {
                console.log(data.error)
            }
            else {
                setValues({ motos: data })
                
            }
        })
    }

    useEffect(() => {

        init()

    }, [])


    const displayMotos = () => {

        return (

            <div className='row'>
                {

                    motos.map((moto, index) => {

                        return (

                            <div className="card col-md-3 mr-6 mt-2 homePageCard " key={index} >
                                
                                <div className="card-body"  >
                                <div className="player-wrapper"> <ReactPlayer url={moto.body} className="react-player"
                                        playing={false}
                                        width="100%"
                                        height="100%"
                                        controls={false}
                                         />  <img className="card-img-top" src={defaultImage} alt='card-image cap'/> </div>
                                    <h5 className="card-title mt-3">
                                        {moto.title}
                                    </h5>

                                    <p>{moto.body}</p>

                                   
                                      
                                    <h6 className='text-info mt-3 '>Posted By : {moto.postedBy.firstName} {""} {moto.postedBy.lastName}</h6>
                                    <p className='text-success mt-2 text-sm'>Posted On :  {new Date(moto.created).toDateString()}</p>

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

        <div className='container'>
            <h2 className="mt-5 mb-5 text-info">Daily Motivations</h2>
           
            {displayMotos()}
        </div>
    )

}

export default Moto;
