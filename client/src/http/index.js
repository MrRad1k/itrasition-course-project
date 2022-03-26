import axios from 'axios'

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    mode: 'cors',
    headers: {
        "Access-Control-Allow-Origin": "*"
    }
})

export {
    $host
}