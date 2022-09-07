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
                                                登録済みの教材
                                            </p>
                                        </div>
                                        <div class="c-box__inner">
                                            <div class="c-list__wrapper py-2">
                                                <p class="c-list__title">
                                                    数学
                                                </p>
                                                <ul class="c-list">
                                                    <li class="c-list__item">
                                                        <a
                                                            href=""
                                                            class="c-link">
                                                            大学への数学1
                                                        </a>
                                                    </li>
                                                    <li class="c-list__item">
                                                        <a
                                                            href=""
                                                            class="c-link">
                                                            大学への数学1
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div class="c-list__wrapper py-2">
                                                <p class="c-list__title">
                                                    数学
                                                </p>
                                                <ul class="c-list">
                                                    <li class="c-list__item">
                                                        <a
                                                            href=""
                                                            class="c-link">
                                                            大学への数学1
                                                        </a>
                                                    </li>
                                                    <li class="c-list__item">
                                                        <a
                                                            href=""
                                                            class="c-link">
                                                            大学への数学1
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-9 pl-md-2 mb-2">
                                    <div class="c-box mb-3">
                                        <div class="c-box__title__wrapper">
                                            <p class="c-box__title">
                                                今日のタスク
                                            </p>
                                            <p class="c-box__subtitle">
                                                問題を解いたら、得点を4段階で評価しよう
                                            </p>
                                        </div>
                                        <div class="c-box__inner">
                                            <p class="c-title">昨日</p>
                                            <div class="row">
                                                <div class="col-md-6 p-1">
                                                    <div class="c-card">
                                                        <div class="d-flex justify-content-between align-items-center">
                                                            <div>
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
                                                            <div class="c-star__wrapper">
                                                                <span class="c-star">
                                                                    <span class="selected">
                                                                        ★★
                                                                    </span>
                                                                    ★★
                                                                </span>
                                                            </div>
                                                            <div class="u-text--white u-text-12 align-self-start pl-1">
                                                                <i class="fas fa-edit"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-6 p-1">
                                                    <div class="c-card">
                                                        <div class="d-flex justify-content-between align-items-center">
                                                            <div>
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
                                                            <div class="c-star__wrapper">
                                                                <span class="c-star">
                                                                    <span class="selected">
                                                                        ★★
                                                                    </span>
                                                                    ★★
                                                                </span>
                                                            </div>
                                                            <div class="u-text--white u-text-12 align-self-start pl-1">
                                                                <i class="fas fa-edit"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-6 p-1">
                                                    <div class="c-card">
                                                        <div class="d-flex justify-content-between align-items-center">
                                                            <div>
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
                                                            <div class="c-star__wrapper">
                                                                <span class="c-star">
                                                                    <span class="selected">
                                                                        ★★
                                                                    </span>
                                                                    ★★
                                                                </span>
                                                            </div>
                                                            <div class="u-text--white u-text-12 align-self-start pl-1">
                                                                <i class="fas fa-edit"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <p class="c-title">今日</p>
                                            <div class="row">
                                                <div class="col-md-6 p-1">
                                                    <div class="c-card">
                                                        <div class="d-flex justify-content-between align-items-center">
                                                            <div>
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
                                                            <div class="c-star__wrapper">
                                                                <span class="c-star">
                                                                    <span class="selected">
                                                                        ★★
                                                                    </span>
                                                                    ★★
                                                                </span>
                                                            </div>
                                                            <div class="u-text--white u-text-12 align-self-start pl-1">
                                                                <i class="fas fa-edit"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-6 p-1">
                                                    <div class="c-card">
                                                        <div class="d-flex justify-content-between align-items-center">
                                                            <div>
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
                                                            <div class="c-star__wrapper">
                                                                <span class="c-star">
                                                                    <span class="selected">
                                                                        ★★
                                                                    </span>
                                                                    ★★
                                                                </span>
                                                            </div>
                                                            <div class="u-text--white u-text-12 align-self-start pl-1">
                                                                <i class="fas fa-edit"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-6 p-1">
                                                    <div class="c-card">
                                                        <div class="d-flex justify-content-between align-items-center">
                                                            <div>
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
                                                            <div class="c-star__wrapper">
                                                                <span class="c-star">
                                                                    <span class="selected">
                                                                        ★★
                                                                    </span>
                                                                    ★★
                                                                </span>
                                                            </div>
                                                            <div class="u-text--white u-text-12 align-self-start pl-1">
                                                                <i class="fas fa-edit"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
