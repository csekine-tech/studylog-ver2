import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export const useGoogleAuth = () => {
    const router = useRouter()

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const googleLogin = async () => {
        await csrf()
        axios
            .get(`/api/login/google`)
            .then(
                response =>
                    // console.log(response)
                    //Socialiteから得たリダイレクトURLに遷移する
                    (window.location.href = response.data),
            )
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const googleCallback = async query => {
        await csrf()
        axios
            .get('/api/login/google/callback', { params: query })
            .then(response => console.log(response.data))
            // .then((window.location.pathname = '/dashboard'))
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    return {
        googleLogin,
        googleCallback,
    }
}
