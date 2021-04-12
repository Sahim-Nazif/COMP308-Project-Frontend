import React from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth';




const NurseDashboard = () => {


    const { user: { _id, firstName, lastName, email, role } } = isAuthenticated()
    const nurseLinks = () => {


        return (

            <div className='card' style={{ marginLeft: '80px' }}>
                <h4 className='card-header'>Nurse Links</h4>
                <ul className='list-group'>
                    <li className="list-group-item">

                        <Link className='nav-link' to='/addsings'>Create Body Signs</Link>

                    </li>
                    <li className="list-group-item">

                        <Link className='nav-link' to='/displayalerts'>Display Alerts</Link>

                    </li>
                    <li className="list-group-item">

                        <Link className='nav-link' to='/allusers'>Display Patients</Link>

                    </li>
                    <li className="list-group-item">

                        <Link className='nav-link' to='/displaysigns'>Display Body Signs</Link>

                    </li>
                </ul>
            </div>


        )
    }

    const nurseInfo = () => {


        return (



            <div className='card' style={{ width: '50rem' }}>
                <h4 className='card-header'>Nurse Information</h4>
                <ul className='list-group'>
                    <li className="list-group-item"> {firstName}</li>
                    <li className="list-group-item"> {lastName}</li>
                    <li className="list-group-item"> {email}</li>
                    <li className="list-group-item">Role : {role === 1 ? 'Nurse' : 'You are a Registered Patient'}</li>


                </ul>
            </div>

        )
    }
    return (
        <>
            <div className='jumbotron'>
                <div className='container'>
                    <h2 className='display-5'>Welcome {firstName} {""} {lastName}</h2>

                    <p className='lead'>You have privilages to create vital signs, see alerts and display all users</p>
                </div>

            </div>
            <div className='row'>


                <div className='col-3'> {nurseLinks()}</div>
                <div className='col-9'> {nurseInfo()}</div>



            </div>
        </>
    );
}

export default NurseDashboard;