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
                                <div class="col-md-8 pr-md-2 mb-2">
                                    <div class="c-box">
                                        <div class="c-box__title__wrapper">
                                            <p class="c-box__title">
                                                登録済みの教材
                                            </p>
                                        </div>
                                        <div class="c-box__inner">
                                            <div class="c-line--b py-3">
                                                <div class="row px-2">
                                                    <div class="col-3 col-md-2 pl-2">
                                                        <img
                                                            src="/img/img-dummy.png"
                                                            alt=""
                                                            class="w-100"
                                                        />
                                                    </div>
                                                    <div class="col-md-7 px-2 py-1">
                                                        <p class="c-link u-text-18">
                                                            大学への数学
                                                        </p>
                                                        <div class="row c-text u-text-14 pt-2">
                                                            <p class="col-2">
                                                                全
                                                            </p>
                                                            <p class="col-10">
                                                                350問
                                                            </p>
                                                        </div>
                                                        <div class="row c-text u-text-14 pt-1">
                                                            <p class="col-2">
                                                                完了
                                                            </p>
                                                            <p class="col-10">
                                                                230問
                                                            </p>
                                                        </div>
                                                        <div class="row c-text u-text-14 pt-1">
                                                            <p class="col-2">
                                                                未完了
                                                            </p>
                                                            <p class="col-10">
                                                                120問
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div>
                                                            <div class="c-button--white mb-2">
                                                                学習を記録する
                                                            </div>
                                                            <div class="c-button--white">
                                                                予定を管理する
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="c-line--b py-3">
                                                <div class="row px-2">
                                                    <div class="col-3 col-md-2 pl-2">
                                                        <img
                                                            src="/img/img-dummy.png"
                                                            alt=""
                                                            class="w-100"
                                                        />
                                                    </div>
                                                    <div class="col-md-7 px-2 py-1">
                                                        <p class="c-link u-text-18">
                                                            長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル
                                                        </p>
                                                        <div class="row c-text u-text-14 pt-2">
                                                            <p class="col-2">
                                                                全
                                                            </p>
                                                            <p class="col-10">
                                                                350問
                                                            </p>
                                                        </div>
                                                        <div class="row c-text u-text-14 pt-1">
                                                            <p class="col-2">
                                                                完了
                                                            </p>
                                                            <p class="col-10">
                                                                230問
                                                            </p>
                                                        </div>
                                                        <div class="row c-text u-text-14 pt-1">
                                                            <p class="col-2">
                                                                未完了
                                                            </p>
                                                            <p class="col-10">
                                                                120問
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <div>
                                                            <div class="c-button--white mb-2">
                                                                学習を記録する
                                                            </div>
                                                            <div class="c-button--white">
                                                                予定を管理する
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4 pl-md-2 mb-2">
                                    <div class="c-box mb-3">
                                        <div class="c-box__title__wrapper">
                                            <p class="c-box__title">
                                                教材の管理
                                            </p>
                                        </div>
                                        <div class="c-box__inner">
                                            <div class="d-flex justify-content-around align-items-center c-text">
                                                <div class="text-center u-text-bold">
                                                    <p class="u-text-16">
                                                        未完了
                                                    </p>
                                                    <p class="u-text-36">104</p>
                                                    <p class="u-text-16">冊</p>
                                                </div>
                                                <div class="text-center u-text-bold">
                                                    <p class="u-text-16">
                                                        完了
                                                    </p>
                                                    <p class="u-text-36">205</p>
                                                    <p class="u-text-16">冊</p>
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
