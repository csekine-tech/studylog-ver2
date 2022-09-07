import Image from 'next/image'
import Link from 'next/link'
const GuestHeader = () => {
    return (
        <header class="l-header sticky-top">
            <div class="l-header__bg">
                <div class="l-header--top">
                    <Link href="/">
                        <h1 class="l-header__logo">
                            <a class="logo" href="index.html">
                                <img src="/img/logo.svg" alt="" />
                            </a>
                        </h1>
                    </Link>
                    <div class="l-header__menu__wrapper">
                        <ul class="l-header__menu">
                            <li class="l-header__menu__item">
                                <Link href="/register">
                                    <a
                                        href=""
                                        class="l-header__menu__item__link">
                                        新規会員登録
                                    </a>
                                </Link>
                            </li>
                            <li class="l-header__menu__item">
                                <Link href="/login">
                                    <a
                                        href=""
                                        class="l-header__menu__item__link">
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
