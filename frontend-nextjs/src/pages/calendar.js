import Head from 'next/head'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import GuestHeader from '@/components/Header/GuestHeader'
import AuthHeader from '@/components/Header/AuthHeader'

export default function MyPage() {
    const { user } = useAuth({ middleware: 'auth' })

    return (
        <>
            <Head>
                <title>StudyLog</title>
            </Head>
            {user && (
                <>
                    <AuthHeader />
                    <main>
                        <div class="c-container">
                            <div class="row">
                                <div class="col-md-4 pr-md-2 py-1">
                                    <div class="c-button">教材を登録する</div>
                                </div>
                                <div class="col-md-4 px-md-2 py-1">
                                    <div class="c-button">学習を記録する</div>
                                </div>
                            </div>
                            <div class="row py-3">
                                <div class="col-md-3 pr-md-2 mb-2">
                                    <div class="c-box">
                                        <div class="c-box__title__wrapper">
                                            <p class="c-box__title">
                                                今日のタスク
                                            </p>
                                        </div>
                                        <div class="c-box__inner">
                                            <div class="mb-2">
                                                <div class="c-card--sm">
                                                    <div class="">
                                                        <div class="mb-1">
                                                            <p class="c-card__title">
                                                                大学への数学
                                                            </p>
                                                            <p class="c-card__subtitle">
                                                                1章{' '}
                                                                <span class="u-text-18">
                                                                    2
                                                                </span>
                                                                番
                                                            </p>
                                                        </div>
                                                        <div class="d-flex justify-content-between">
                                                            <div class="c-star__wrapper">
                                                                <span class="c-star">
                                                                    ★★★★
                                                                </span>
                                                            </div>
                                                            <div class="u-text--white u-text-12 pl-1 align-self-center">
                                                                <i class="fas fa-edit"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="mb-2">
                                                <div class="c-card--sm">
                                                    <div class="">
                                                        <div class="mb-1">
                                                            <p class="c-card__title">
                                                                長いタイトル長いタイトル長いタイト...
                                                            </p>
                                                            <p class="c-card__subtitle">
                                                                1章{' '}
                                                                <span class="u-text-18">
                                                                    2
                                                                </span>
                                                                番
                                                            </p>
                                                        </div>
                                                        <div class="d-flex justify-content-between">
                                                            <div class="c-star__wrapper">
                                                                <span class="c-star">
                                                                    ★★★★
                                                                </span>
                                                            </div>
                                                            <div class="u-text--white u-text-12 pl-1 align-self-center">
                                                                <i class="fas fa-edit"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="mb-2">
                                                <div class="c-card--sm">
                                                    <div class="">
                                                        <div class="mb-1">
                                                            <p class="c-card__title">
                                                                大学への数学
                                                            </p>
                                                            <p class="c-card__subtitle">
                                                                1章{' '}
                                                                <span class="u-text-18">
                                                                    2
                                                                </span>
                                                                番
                                                            </p>
                                                        </div>
                                                        <div class="d-flex justify-content-between">
                                                            <div class="c-star__wrapper">
                                                                <span class="c-star">
                                                                    ★★★★
                                                                </span>
                                                            </div>
                                                            <div class="u-text--white u-text-12 pl-1 align-self-center">
                                                                <i class="fas fa-edit"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="mb-2">
                                                <div class="c-card--sm">
                                                    <div class="">
                                                        <div class="mb-1">
                                                            <p class="c-card__title">
                                                                大学への数学
                                                            </p>
                                                            <p class="c-card__subtitle">
                                                                1章{' '}
                                                                <span class="u-text-18">
                                                                    2
                                                                </span>
                                                                番
                                                            </p>
                                                        </div>
                                                        <div class="d-flex justify-content-between">
                                                            <div class="c-star__wrapper">
                                                                <span class="c-star">
                                                                    ★★★★
                                                                </span>
                                                            </div>
                                                            <div class="u-text--white u-text-12 pl-1 align-self-center">
                                                                <i class="fas fa-edit"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-9 pl-md-2 mb-2">
                                    <div class="c-box mb-3">
                                        <div class="c-box__title__wrapper">
                                            <p class="c-box__title">
                                                カレンダー
                                            </p>
                                        </div>
                                        <div class="c-box__inner"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </>
            )}
        </>
    )
}
