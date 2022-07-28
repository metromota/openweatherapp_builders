import axios from 'axios'

let Api = axios.create({
    baseURL:`https://api.openweathermap.org`,
    timeout: 4000
})

export { Api }