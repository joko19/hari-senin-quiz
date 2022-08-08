import axios from 'axios'

const instance = axios.create({ baseURL: "https://the-trivia-api.com/api/"});

export default instance