import Link from 'next/link'
import { useState } from 'react'
import { useAuth } from '@/hooks/auth'
const AuthHeader = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const { logout } = useAuth()

    return (
        <header className="l-header sticky-top">
            <div className="l-header__bg">
                <div className="l-header--top">
                    <Link href="/mypage">
                        <h1 className="l-header__logo">
                            <a className="logo" href="index.html">
                                <img src="/img/logo.svg" alt="" />
                            </a>
                        </h1>
                    </Link>
                    <div className="l-header__menu__wrapper">
                        <ul className="l-header__menu">
                            <Link href="/config">
                                <li className="l-header__menu__item">
                                    <a
                                        href=""
                                        className="l-header__menu__item__link">
                                        <i className="fas fa-cog"></i>
                                    </a>
                                </li>
                            </Link>
                            <Link href="/nortification">
                                <li className="l-header__menu__item">
                                    <a
                                        href=""
                                        className="l-header__menu__item__link">
                                        <i className="fas fa-bell"></i>
                                    </a>
                                </li>
                            </Link>
                            <li
                                className="l-header__menu__item"
                                onMouseEnter={() => {
                                    setIsPopupOpen(true)
                                }}
                                onMouseLeave={() => {
                                    setIsPopupOpen(false)
                                }}>
                                <div href="" className="l-header__menu__item__link">
                                    <i className="fas fa-user-circle"></i>
                                </div>
                                {isPopupOpen && (
                                    <>
                                        <div className="l-header__menu__item__popup__wrapper">
                                            <ul className="l-header__menu__item__popup">
                                                <Link href="/user">
                                                    <li className="l-header__menu__item__popup__item">
                                                        <a
                                                            href=""
                                                            className="l-header__menu__item__popup__item__link">
                                                            ユーザー情報
                                                        </a>
                                                    </li>
                                                </Link>

                                                <li
                                                    className="l-header__menu__item__popup__item"
                                                    onClick={logout}>
                                                    <div
                                                        href=""
                                                        className="l-header__menu__item__popup__item__link">
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
                <div className="l-header--sub">
                    <div className="l-header--sub__menu__wrapper">
                        <ul className="l-header--sub__menu">
                            <Link href="/mypage">
                                <li className="l-header--sub__menu__item">
                                    <a className="l-header--sub__menu__item__link">
                                        ホーム
                                    </a>
                                </li>
                            </Link>
                            <Link href="/workbook">
                                <li className="l-header--sub__menu__item">
                                    <a className="l-header--sub__menu__item__link">
                                        本棚
                                    </a>
                                </li>
                            </Link>
                            <Link href="/task">
                                <li className="l-header--sub__menu__item">
                                    <a className="l-header--sub__menu__item__link">
                                        タスク
                                    </a>
                                </li>
                            </Link>
                            <Link href="/calendar">
                                <li className="l-header--sub__menu__item">
                                    <a className="l-header--sub__menu__item__link">
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
