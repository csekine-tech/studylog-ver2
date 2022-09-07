import { useAuth } from '@/hooks/auth'
import { useGoogleAuth } from '@/hooks/googleAuth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const googleCallbackPage = () => {
    const router = useRouter()
    const query = router.query
    const { googleCallback } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    })
    useEffect(() => {
        if (query.state) {
            console.log(query, 'q')
            googleCallback(query)
        }
    }, [query])
    // useEffect(async () => {
    //     await googleCallback(query)
    // }, [])

    return <>認証しています...</>
}

export default googleCallbackPage
