import { useState } from 'react'
import Link from 'next/link'

const GuestMobileHeader = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <div
                className={`l-header__menu__mobile__open ${
                    isOpen ? 'open' : ''
                }`}>
                <div className="">
                    <div className="">
                        <ul className="">
                            <Link href="/">
                                <li className="l-header__menu__mobile__item">
                                    <p className="l-header__menu__mobile__item__link">
                                        ホーム
                                    </p>
                                </li>
                            </Link>
                            <Link href="/login">
                                <li className="l-header__menu__mobile__item">
                                    <p className="l-header__menu__mobile__item__link">
                                        ログイン
                                    </p>
                                </li>
                            </Link>
                            <Link href="/register">
                                <li className="l-header__menu__mobile__item">
                                    <p className="l-header__menu__mobile__item__link">
                                        新規会員登録
                                    </p>
                                </li>
                            </Link>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="l-header__menu__mobile__bg">
                <div className="l-header__menu__mobile">
                    <div
                        className={`l-header__menu__mobile__icon ${
                            isOpen ? 'active' : ''
                        }`}
                        onClick={() => {
                            setIsOpen(!isOpen)
                        }}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </>
    )
}
export default GuestMobileHeader
