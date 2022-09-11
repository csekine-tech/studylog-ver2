import Image from 'next/image'
import Link from 'next/link'
const GuestHeader = () => {
    return (
        <header className="l-header sticky-top">
            <div className="l-header__bg">
                <div className="l-header--top">
                    <Link href="/">
                        <h1 className="l-header__logo">
                            <a className="logo" href="index.html">
                                <img src="/img/logo.svg" alt="" />
                            </a>
                        </h1>
                    </Link>
                    <div className="l-header__menu__wrapper">
                        <ul className="l-header__menu">
                            <li className="l-header__menu__item">
                                <Link href="/register">
                                    <a
                                        href=""
                                        className="l-header__menu__item__link">
                                        新規会員登録
                                    </a>
                                </Link>
                            </li>
                            <li className="l-header__menu__item">
                                <Link href="/login">
                                    <a
                                        href=""
                                        className="l-header__menu__item__link">
                                        ログイン
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}
export default GuestHeader
