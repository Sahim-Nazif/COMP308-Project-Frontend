import React from 'react'
import {isAuthenticated} from '../auth/index'



const Table = ({users}) => {

    const {user:{role}}=isAuthenticated()
  
    return (
        <div className='container '>
           
        <table className="table table-bordered table-stripped mr-3">
            <thead className='table-info' >
                <tr>
                    <th>Number</th>
                    <th >First Name</th>
                    <th >Last Name</th>
                    <th >Email</th>
                    </tr>
            </thead>
            <tbody>
             
                    
                {(users) ? users.map(( user, index) => {
                   
           return (
                <tr key={index}>
                 <td>{index}</td>
                 <td>{user.firstName }</td>
                 <td>{ user.lastName}</td>
                <td>{ user.email }</td>
                          
               
                </tr>
          )
            }) : <tr><td colSpan="5">Loading...</td></tr>}
       
         
            </tbody>
         
        </table>
        
        </div>
    )
}


export default Table