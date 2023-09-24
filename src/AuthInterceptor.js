import axios from 'axios';

const AuthInterceptor = axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            sessionStorage.removeItem('loggedIn')
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default AuthInterceptor;