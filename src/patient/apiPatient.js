
export const createAlert= (userId, token, alerts) => {

    return fetch(`${process.env.REACT_APP_API_URL}/alert/create/${userId}`,{
        method: 'POST',
        headers: {

            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
         body: alerts
         }).then(response => {
       
            return response.json()
        }).catch(err => {
            console.log(err)
        })

}


//get user by Id
export const userById=(userId, token)=>{

    return fetch(`${process.env.REACT_APP_API_URL}/${userId}`,{
        method: 'GET',
        headers: {

            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    
         }).then(response => {
       
            return response.json()
        }).catch(err => {
            console.log(err)
        })
}

//update user profile
export const update_user_profile=(userId, token, user)=>{

    return fetch(`${process.env.REACT_APP_API_URL}/update/${userId}`,{
        method: 'PUT',
        headers: {

            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify(user)
    
         }).then(response => {
       
            return response.json()
        }).catch(err => {
            console.log(err)
        })
}

export const verify_token_forUpdate=(user, next)=>{

    if (typeof window !=='undefined'){
        if (localStorage.getItem('jwt')) {
            let auth=JSON.parse(localStorage.getItem('jwt'))
            auth.user=user
            localStorage.setItem('jwt', JSON.stringify(auth))
            next()
        }
    }
}

