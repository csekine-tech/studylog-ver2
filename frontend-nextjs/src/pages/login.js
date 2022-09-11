import InputError from '@/components/InputError'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import GuestHeader from '@/components/Header/GuestHeader'

const Login = () => {
    const router = useRouter()

    const { login, googleLogin } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/mypage',
    })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [shouldRemember, setShouldRemember] = useState(false)
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    useEffect(() => {
        if (router.query.reset?.length > 0 && errors.length === 0) {
            setStatus(atob(router.query.reset))
        } else {
            setStatus(null)
        }
    })

    const submitForm = async event => {
        event.preventDefault()

        login({
            email,
            password,
            remember: shouldRemember,
            setErrors,
            setStatus,
        })
    }

    return (
        <>
            <GuestHeader />

            <div className="c-guest-bg">
                <div className="c-container">
                    <div className="c-guest__inner">
                        <h3 className="u-text--white u-text-24 mb-3 text-center">
                            ログイン
                        </h3>
                        <p className="c-text text-center u-text--white mb-2">
                            初めてご利用の方は
                            <Link href="/register">
                                <a href="" className="u-underline">
                                    新規会員登録
                                </a>
                            </Link>
                            をしてください
                        </p>
                        <form onSubmit={submitForm}>
                            <div className="mb-2">
                                <p className="c-text u-text--white">Email</p>
                                <input
                                    onChange={event =>
                                        setEmail(event.target.value)
                                    }
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={email}
                                    className="c-input--wide"
                                />
                                <InputError messages={errors.email} />
                            </div>
                            <div className="mb-2">
                                <p className="c-text u-text--white">パスワード</p>
                                <input
                                    onChange={event =>
                                        setPassword(event.target.value)
                                    }
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={password}
                                    className="c-input--wide"
                                />
                                <InputError messages={errors.password} />
                            </div>
                            <div className="d-flex justify-content-center">
                                <label
                                    htmlFor="remember"
                                    className="c-text u-text--white d-flex align-items-center mb-2">
                                    <input
                                        type="checkbox"
                                        id="remember"
                                        name="remember"
                                        className="mr-1"
                                        onChange={event =>
                                            setShouldRemember(
                                                event.target.checked,
                                            )
                                        }
                                    />
                                    ログイン情報を記録する
                                </label>
                            </div>

                            <div className="mb-1">
                                <button className="c-button--wide" type="submit">
                                    ログインする
                                </button>
                            </div>
                            <div className="">
                                <div
                                    className="c-button--wide-ghost mb-3"
                                    onClick={() => {
                                        googleLogin()
                                    }}>
                                    Googleでログインする
                                </div>
                            </div>
                            <p className="c-text text-center u-text--white mb-2">
                                <Link href="/forgot-password">
                                    <a className="u-underline">
                                        パスワードをお忘れですか？
                                    </a>
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
