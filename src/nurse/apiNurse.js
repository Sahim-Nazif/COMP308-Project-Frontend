
export const createSigns = (userId, token, signs) => {

    return fetch(`${process.env.REACT_APP_API_URL}/patient/patientinfo/${userId}`, {

        method: 'POST',
        headers: {

            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },

        body: signs
    }).
        then(response => {

            return response.json()
        }).catch(err => {
            console.log(err)
        })



}


export const list=(userId, token)=>{


    return fetch(`${process.env.REACT_APP_API_URL}/patient/allinfo/${userId}`, {

        method:'GET',
            headers: {

                Authorization: `Bearer ${token}`
            }
        

    }) .then(response=>{

         return response.json()
     }).catch(err=>console.log(err))
}


export const getAllUsers=(userId, token)=>{


    return fetch(`${process.env.REACT_APP_API_URL}/allusers/${userId}`, {

        method:'GET',
            headers: {

                Authorization: `Bearer ${token}`
            }
        

    }) .then(response=>{

         return response.json()
     }).catch(err=>console.log(err))
}

//get all alerts

export const listAlerts=(userId, token)=>{


    return fetch(`${process.env.REACT_APP_API_URL}/alert/allalerts/${userId}`, {

        method:'GET',
            headers: {

                Authorization: `Bearer ${token}`
            }
        

    }) .then(response=>{

         return response.json()
     }).catch(err=>console.log(err))
}


// Alert resolved deleted fetch API method


export const deleteAlert=(alertId, userId, token)=>{
    
    return fetch(`${process.env.REACT_APP_API_URL}/alert/delete/${alertId}/${userId}`, {

        method:'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            },
        

    }) .then(response=>{

         return response.json()
     }).catch(err=>console.log(err))

}