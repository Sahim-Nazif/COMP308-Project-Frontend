import React from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/index';




const UserDashboard = () => {


    const { user: {_id, firstName, lastName, email, role } } = isAuthenticated()
    const userLinks = () => {


        return (

            <div className='card' style={{ marginLeft: '80px' }}>
                <h4 className='card-header'>{firstName}'s {" "} Links</h4>
                <ul className='list-group'>
                    <li className="list-group-item">

                        <Link className='nav-link' to='/addsings'>Add  Body Signs</Link>

                    </li>
                    <li className="list-group-item">

                        <Link className='nav-link' to='/createalert'>Send Alert</Link>

                    </li>
                    <li className="list-group-item">

                        <Link className='nav-link' to={`/update/${_id}`}>Update Profile</Link>

                    </li>


                </ul>
            </div>


        )
    }

    const userInfo = () => {


        return (

            <div className='card' style={{ width: '50rem' }}>
                <h4 className='card-header'>{firstName}'s Information</h4>
                <ul className='list-group'>
                    <li className="list-group-item"> {firstName}</li>
                    <li className="list-group-item"> {lastName}</li>
                    <li className="list-group-item"> {email}</li>
                    <li className="list-group-item">Role : {role === 0 ? 'Patient' : 'Are you a Nurse?'}
                    </li>
                </ul>
            </div>

        )
    }
    return (
        <>
            <div className='jumbotron'>
                <div className='container'>
                    <h2 className='display-5'>Welcome {firstName} {""} {lastName}</h2>

                    <p className='lead'>Update profile & use the links to send body signs & special alerts to the nurse </p>
                </div>

            </div>
            <div className='row'>
                <div className='col-3'> {userLinks()}</div>
                <div className='col-9'> {userInfo()}</div>
            </div>
        </>
    );
}
export default UserDashboard