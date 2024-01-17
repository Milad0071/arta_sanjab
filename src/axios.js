import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://194.9.56.86/api/v1/'
    // baseURL: 'http://192.168.100.16:8000/api/v1/'
});

export default instance;