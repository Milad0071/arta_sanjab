import axios from 'axios';

const instance = axios.create({
    // baseURL: 'https://api.sanjabam.ir/api/v1/'
    baseURL: 'http://194.9.56.86/api/v1/'
    // baseURL: 'http://192.168.100.16/api/v1/'
});

export default instance;