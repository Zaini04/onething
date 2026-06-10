import axios from "axios"

export const baseURL = import.meta.env.VITE_BASE_URL
const Axios = axios.create({
    baseURL: `${baseURL}/api`,
    withCredentials: true
})

Axios.interceptors.request.use(
    (config)=>{
        if(!navigator.onLine){
            return Promise.reject( new Error('No internet connection'))
        }
        return config
    },
    (error) =>Promise.reject(error)
)

// Axios.interceptors.response.use(
//   (res) => res,
//   (error) => {
//     const status = error.response?.status;
//     const message = error.response?.data?.message;

//     if (status === 401 && message === "TOKEN_EXPIRED") {
//       window.location.href = "/login";
//     }

//     return Promise.reject(error);
//   }
// );

export default Axios