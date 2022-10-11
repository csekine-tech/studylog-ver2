import Axios from 'axios'

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        // 'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
})

export default axios
