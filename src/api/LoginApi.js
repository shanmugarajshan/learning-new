import axios from "axios"

const headers =  {
    headers: {
        "Content-Type": 'application/json',
    }
}

const loginData = (responseData) => {
    return axios.post('https://uat.enproject.in/users/authenticate',responseData, headers)
    .then(responseData => {
        return responseData.data
    })
} 

export {loginData}