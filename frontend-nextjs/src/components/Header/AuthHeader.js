import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/auth'
import { useRouter } from 'next/router'
import AuthMobileHeader from './AuthMobileHeader'
import Loading from '../Loading'

const AuthHeader = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const { logout } = useAuth()
    const route = useRouter().route
    const [status, setStatus] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        return () => {
            setIsPopupOpen(false)
            setIsLoading(false)
            setStatus(null)
        }
    }, [])

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
                            {/* <Link href="/config">
                                <li className="l-header__menu__item">
                                    <a
                                        href=""
                                        className="l-header__menu__item__link">
                                        <i className="fas fa-cog"></i>
                                    </a>
                                </li>
                            </Link> */}
                            {/* <Link href="/nortification">
                                <li className="l-header__menu__item">
                                    <a
                                        href=""
                                        className="l-header__menu__item__link">
                                        <i className="fas fa-bell"></i>
                                    </a>
                                </li>
                            </Link> */}
                            <li
                                className="l-header__menu__item"
                                onMouseEnter={() => {
                                    setIsPopupOpen(true)
                                }}
                                onMouseLeave={() => {
                                    setIsPopupOpen(false)
                                }}>
                                <div
                                    href=""
                                    className="l-header__menu__item__link">
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
                                                            ??????????????????
                                                        </a>
                                                    </li>
                                                </Link>

                                                <li
                                                    className="l-header__menu__item__popup__item"
                                                    onClick={async () => {
                                                        if (!isLoading) {
                                                            setIsLoading(true)
                                                            await logout()
                                                            await setIsLoading(
                                                                false,
                                                            )
                                                        }
                                                    }}>
                                                    <div
                                                        href=""
                                                        className="l-header__menu__item__popup__item__link">
                                                        {isLoading ? (
                                                            <Loading color="black" />
                                                        ) : (
                                                            '???????????????'
                                                        )}
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </>
                                )}
                            </li>
                        </ul>
                    </div>
                    <AuthMobileHeader />
                </div>
                <div className="l-header--sub">
                    <div className="l-header--sub__menu__wrapper">
                        <ul className="l-header--sub__menu">
                            <Link href="/mypage">
                                <li
                                    className={`l-header--sub__menu__item ${
                                        route === '/mypage' ? 'current' : ''
                                    }`}>
                                    <a className="l-header--sub__menu__item__link">
                                        ?????????
                                    </a>
                                </li>
                            </Link>
                            <Link href="/workbook">
                                <li
                                    className={`l-header--sub__menu__item ${
                                        route.indexOf('/workbook') !== -1
                                            ? 'current'
                                            : ''
                                    }`}>
                                    <a className="l-header--sub__menu__item__link">
                                        ??????
                                    </a>
                                </li>
                            </Link>
                            <Link href="/task">
                                <li
                                    className={`l-header--sub__menu__item ${
                                        route === '/task' ? 'current' : ''
                                    }`}>
                                    <a className="l-header--sub__menu__item__link">
                                        ?????????
                                    </a>
                                </li>
                            </Link>
                            <Link href="/calendar">
                                <li
                                    className={`l-header--sub__menu__item ${
                                        route === '/calendar' ? 'current' : ''
                                    }`}>
                                    <a className="l-header--sub__menu__item__link">
                                        ???????????????
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
