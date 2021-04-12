import React, { useState, useEffect } from 'react'
import { isAuthenticated } from '../auth/index'
import { getAllUsers } from '../nurse/apiNurse'
import Table from '../nurse/Table'
import Layout from '../core/Layout'


const DisplayUsers = () => {

    const [values, setValues] = useState({

        user: []
    })

    const { users } = values;

    const init = () => {
        const nurseId = isAuthenticated().user._id
        const token = isAuthenticated().token
        getAllUsers(nurseId, token).then(data => {

            if (data.error) {
                setValues(data.error)
            }
            else {
                setValues({ users: data })
            }
        })
    }

    useEffect(() => {

        init()

    }, [])

    return (

        <>        
       <Layout title=' Patients' description='List of registered patients'>
      </Layout>

            <div className='col-12'>
                {<Table users={users} />}

            </div>
        </>
    );
}

export default DisplayUsers;