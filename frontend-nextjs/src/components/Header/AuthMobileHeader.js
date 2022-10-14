import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import Loading from '../Loading'

const AuthMobileHeader = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { logout } = useAuth()
    const [status, setStatus] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    return (
        <>
            <div
                className={`l-header__menu__mobile__open ${
                    isOpen ? 'open' : ''
                }`}>
                <div className="">
                    <div className="">
                        <ul className="">
                            <Link href="/mypage">
                                <li className="l-header__menu__mobile__item">
                                    <p className="l-header__menu__mobile__item__link">
                                        ホーム
                                    </p>
                                </li>
                            </Link>
                            <Link href="/workbook">
                                <li className="l-header__menu__mobile__item">
                                    <p className="l-header__menu__mobile__item__link">
                                        本棚
                                    </p>
                                </li>
                            </Link>
                            <Link href="/task">
                                <li className="l-header__menu__mobile__item">
                                    <p className="l-header__menu__mobile__item__link">
                                        タスク
                                    </p>
                                </li>
                            </Link>
                            <Link href="/calendar">
                                <li className="l-header__menu__mobile__item">
                                    <p className="l-header__menu__mobile__item__link">
                                        カレンダー
                                    </p>
                                </li>
                            </Link>
                            <Link href="/user">
                                <li className="l-header__menu__mobile__item">
                                    <p className="l-header__menu__mobile__item__link">
                                        ユーザー情報
                                    </p>
                                </li>
                            </Link>

                            <li
                                className="l-header__menu__mobile__item"
                                onClick={async () => {
                                    if (!isLoading) {
                                        setIsLoading(true)
                                        await logout({
                                            setStatus,
                                        })
                                        await setIsLoading(false)
                                    }
                                }}
                                >
                                <p className="l-header__menu__mobile__item__link">
                                {isLoading ? (
                                                            <Loading color="black" />
                                                        ) : (
                                                            'ログアウト'
                                                        )}
                                </p>
                            </li>
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
export default AuthMobileHeader
