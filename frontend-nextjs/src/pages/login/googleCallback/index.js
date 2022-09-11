import { useAuth } from '@/hooks/auth'
import { useGoogleAuth } from '@/hooks/googleAuth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Head from 'next/head'
import GuestHeader from '@/components/Header/GuestHeader'

const googleCallbackPage = () => {
    const router = useRouter()
    const query = router.query
    const { googleCallback } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/mypage',
    })
    useEffect(() => {
        if (query.state) {
            googleCallback(query)
        }
    }, [query])


    return (
        <>
            <Head>
                <title>StudyLog</title>
            </Head>
            <>
                <GuestHeader />
                <div className="c-guest-bg">
                    <div className="c-container">
                    <div className="py-3">
                        <div className="mb-2">
                            <div className="c-box">
                                <div className="c-box__title__wrapper">
                                    <p className="c-box__title">認証中</p>
                                </div>
                                <div className="c-box__inner">
                                    <p className="c-text">
                                        認証しています...
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </>
        </>
    )
}

export default googleCallbackPage
