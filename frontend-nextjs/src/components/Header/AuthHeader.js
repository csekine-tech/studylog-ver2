import Link from 'next/link'
import { useState } from 'react'
import { useAuth } from '@/hooks/auth'
const AuthHeader = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const { logout } = useAuth()

    return (
        <header class="l-header sticky-top">
            <div class="l-header__bg">
                <div class="l-header--top">
                    <Link href="/mypage">
                        <h1 class="l-header__logo">
                            <a class="logo" href="index.html">
                                <img src="/img/logo.svg" alt="" />
                            </a>
                        </h1>
                    </Link>
                    <div class="l-header__menu__wrapper">
                        <ul class="l-header__menu">
                            <Link href="/config">
                                <li class="l-header__menu__item">
                                    <a
                                        href=""
                                        class="l-header__menu__item__link">
                                        <i class="fas fa-cog"></i>
                                    </a>
                                </li>
                            </Link>
                            <Link href="/nortification">
                                <li class="l-header__menu__item">
                                    <a
                                        href=""
                                        class="l-header__menu__item__link">
                                        <i class="fas fa-bell"></i>
                                    </a>
                                </li>
                            </Link>
                            <li
                                class="l-header__menu__item"
                                onMouseEnter={() => {
                                    setIsPopupOpen(true)
                                }}
                                onMouseLeave={() => {
                                    setIsPopupOpen(false)
                                }}>
                                <div href="" class="l-header__menu__item__link">
                                    <i class="fas fa-user-circle"></i>
                                </div>
                                {isPopupOpen && (
                                    <>
                                        <div class="l-header__menu__item__popup__wrapper">
                                            <ul class="l-header__menu__item__popup">
                                                <Link href="/user">
                                                    <li class="l-header__menu__item__popup__item">
                                                        <a
                                                            href=""
                                                            class="l-header__menu__item__popup__item__link">
                                                            ユーザー情報
                                                        </a>
                                                    </li>
                                                </Link>

                                                <li
                                                    class="l-header__menu__item__popup__item"
                                                    onClick={logout}>
                                                    <div
                                                        href=""
                                                        class="l-header__menu__item__popup__item__link">
                                                        ログアウト
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="l-header--sub">
                    <div class="l-header--sub__menu__wrapper">
                        <ul class="l-header--sub__menu">
                            <Link href="/mypage">
                                <li class="l-header--sub__menu__item">
                                    <a class="l-header--sub__menu__item__link">
                                        ホーム
                                    </a>
                                </li>
                            </Link>
                            <Link href="/workbook">
                                <li class="l-header--sub__menu__item">
                                    <a class="l-header--sub__menu__item__link">
                                        本棚
                                    </a>
                                </li>
                            </Link>
                            <Link href="/task">
                                <li class="l-header--sub__menu__item">
                                    <a class="l-header--sub__menu__item__link">
                                        タスク
                                    </a>
                                </li>
                            </Link>
                            <Link href="/calendar">
                                <li class="l-header--sub__menu__item">
                                    <a class="l-header--sub__menu__item__link">
                                        カレンダー
                                    </a>
                                </li>
                            </Link>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}
export default AuthHeader
