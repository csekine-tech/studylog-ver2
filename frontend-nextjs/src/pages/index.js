import Head from 'next/head'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import GuestHeader from '@/components/Header/GuestHeader'
import AuthHeader from '@/components/Header/AuthHeader'

export default function Home() {

    return (
        <>
            <Head>
                <title>StudyLog</title>
            </Head>
            <>
                <GuestHeader />
                <div class="c-guest-bg">
                    <div class="c-container">
                        <div class="c-guest-hero">
                            <img src="img/top-text.svg" alt="" />
                        </div>
                    </div>
                </div>
            </>
        </>
    )
}
