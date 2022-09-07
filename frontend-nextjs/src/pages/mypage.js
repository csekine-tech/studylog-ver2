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
                                <div class="col-md-3 pr-md-2 mb-3">
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
                                                            長いタイトル長いタイトル長いタイトル...
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
                                <div class="col-md-9 pl-md-2">
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
                                            <div class="row">
                                                <div class="col-md-6 p-1">
                                                    <div class="c-card u-bg--blue">
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
                                                    <div class="c-card u-bg--blue">
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
                                                    <div class="c-card u-bg--blue">
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
                                                    <div class="c-card u-bg--blue">
                                                        <div class="d-flex justify-content-between align-items-center">
                                                            <div>
                                                                <p class="c-card__title">
                                                                    大学への数学大学への数学大学へ
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
                                                    <div class="c-card u-bg--green">
                                                        <div class="d-flex justify-content-between align-items-center">
                                                            <div>
                                                                <p class="c-card__title">
                                                                    エッセンス
                                                                </p>
                                                                <p class="c-card__subtitle">
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
                                                    <div class="c-card u-bg--red">
                                                        <div class="d-flex justify-content-between align-items-center">
                                                            <div>
                                                                <p class="c-card__title">
                                                                    エッセンス
                                                                </p>
                                                                <p class="c-card__subtitle">
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
                                                    <div class="c-card u-bg--pink">
                                                        <div class="d-flex justify-content-between align-items-center">
                                                            <div>
                                                                <p class="c-card__title">
                                                                    エッセンス
                                                                </p>
                                                                <p class="c-card__subtitle">
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
                                                    <div class="c-card u-bg--purple">
                                                        <div class="d-flex justify-content-between align-items-center">
                                                            <div>
                                                                <p class="c-card__title">
                                                                    エッセンス
                                                                </p>
                                                                <p class="c-card__subtitle">
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
                                                    <div class="c-card u-bg--d-purple">
                                                        <div class="d-flex justify-content-between align-items-center">
                                                            <div>
                                                                <p class="c-card__title">
                                                                    エッセンス
                                                                </p>
                                                                <p class="c-card__subtitle">
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
                                                    <div class="c-card u-bg--indigo">
                                                        <div class="d-flex justify-content-between align-items-center">
                                                            <div>
                                                                <p class="c-card__title">
                                                                    エッセンス
                                                                </p>
                                                                <p class="c-card__subtitle">
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
                                                    <div class="c-card u-bg--l-blue">
                                                        <div class="d-flex justify-content-between align-items-center">
                                                            <div>
                                                                <p class="c-card__title">
                                                                    エッセンス
                                                                </p>
                                                                <p class="c-card__subtitle">
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
                                                    <div class="c-card u-bg--cyan">
                                                        <div class="d-flex justify-content-between align-items-center">
                                                            <div>
                                                                <p class="c-card__title">
                                                                    エッセンス
                                                                </p>
                                                                <p class="c-card__subtitle">
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
                                                    <div class="c-card u-bg--teal">
                                                        <div class="d-flex justify-content-between align-items-center">
                                                            <div>
                                                                <p class="c-card__title">
                                                                    エッセンス
                                                                </p>
                                                                <p class="c-card__subtitle">
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
                                                    <div class="c-card u-bg--l-green">
                                                        <div class="d-flex justify-content-between align-items-center">
                                                            <div>
                                                                <p class="c-card__title">
                                                                    エッセンス
                                                                </p>
                                                                <p class="c-card__subtitle">
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
                                                    <div class="c-card u-bg--lime">
                                                        <div class="d-flex justify-content-between align-items-center">
                                                            <div>
                                                                <p class="c-card__title">
                                                                    エッセンス
                                                                </p>
                                                                <p class="c-card__subtitle">
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
                                                    <div class="c-card u-bg--yellow">
                                                        <div class="d-flex justify-content-between align-items-center">
                                                            <div>
                                                                <p class="c-card__title">
                                                                    エッセンス
                                                                </p>
                                                                <p class="c-card__subtitle">
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
                                                    <div class="c-card u-bg--amber">
                                                        <div class="d-flex justify-content-between align-items-center">
                                                            <div>
                                                                <p class="c-card__title">
                                                                    エッセンス
                                                                </p>
                                                                <p class="c-card__subtitle">
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
                                                    <div class="c-card u-bg--orange">
                                                        <div class="d-flex justify-content-between align-items-center">
                                                            <div>
                                                                <p class="c-card__title">
                                                                    エッセンス
                                                                </p>
                                                                <p class="c-card__subtitle">
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
                                                    <div class="c-card u-bg--d-orange">
                                                        <div class="d-flex justify-content-between align-items-center">
                                                            <div>
                                                                <p class="c-card__title">
                                                                    エッセンス
                                                                </p>
                                                                <p class="c-card__subtitle">
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
                                                    <div class="c-card u-bg--brown">
                                                        <div class="d-flex justify-content-between align-items-center">
                                                            <div>
                                                                <p class="c-card__title">
                                                                    エッセンス
                                                                </p>
                                                                <p class="c-card__subtitle">
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
                                                                    エッセンス
                                                                </p>
                                                                <p class="c-card__subtitle">
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
                                                    <div class="c-card u-bg--bluegray">
                                                        <div class="d-flex justify-content-between align-items-center">
                                                            <div>
                                                                <p class="c-card__title">
                                                                    長いタイトル長いタイトル長いタイトル...
                                                                </p>
                                                                <p class="c-card__subtitle">
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
                                                    <div class="c-card u-bg--bluegray">
                                                        <div class="d-flex justify-content-between align-items-center">
                                                            <div>
                                                                <p class="c-card__title">
                                                                    長いタイトル長いタイトル長いタイトル...
                                                                </p>
                                                                <p class="c-card__subtitle">
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

                                    <div class="c-box">
                                        <div class="c-box__title__wrapper">
                                            <p class="c-box__title">
                                                学習の成果
                                            </p>
                                            <p class="c-box__subtitle">
                                                全ての問題をマスターしよう
                                            </p>
                                        </div>
                                        <div class="c-box__inner">
                                            <div class="d-flex justify-content-around align-items-center c-text">
                                                <div class="text-center u-text-bold">
                                                    <p class="u-text-16">
                                                        残り
                                                    </p>
                                                    <p class="u-text-36">104</p>
                                                    <p class="u-text-16">問</p>
                                                </div>
                                                <div class="text-center u-text-bold">
                                                    <p class="u-text-16">
                                                        完了
                                                    </p>
                                                    <p class="u-text-36">205</p>
                                                    <p class="u-text-16">問</p>
                                                </div>
                                                <div class="text-center u-text-bold">
                                                    <p class="u-text-16">
                                                        今週
                                                    </p>
                                                    <p class="u-text-36">30</p>
                                                    <p class="u-text-16">問</p>
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
