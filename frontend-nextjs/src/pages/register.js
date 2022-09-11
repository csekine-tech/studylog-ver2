// import ApplicationLogo from '@/components/ApplicationLogo'
import AuthCard from '@/components/AuthCard'
import Button from '@/components/Button'
import GuestLayout from '@/components/Layouts/GuestLayout'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'
import GuestHeader from '@/components/Header/GuestHeader'

const Register = () => {
    const { register, googleLogin } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/mypage',
    })

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState([])

    const submitForm = event => {
        event.preventDefault()

        register({
            name,
            email,
            password,
            password_confirmation: passwordConfirmation,
            setErrors,
        })
    }

    return (
        <>
            <GuestHeader />
            <div className="c-guest-bg">
                {/* <div className="c-container"> */}
                    <div className="c-guest__inner">
                        <h3 className="u-text--white u-text-24 mb-3 text-center">
                            新規会員登録
                        </h3>
                        <p className="c-text text-center u-text--white mb-3">
                            すでにご登録済みの方は
                            <Link href="/login">
                                <a href="" className="u-underline">
                                    ログイン
                                </a>
                            </Link>
                            してください
                        </p>
                        <form onSubmit={submitForm}>
                            <div className="mb-2">
                                <p className="c-text u-text--white">ユーザー名</p>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="c-input--wide"
                                    value={name}
                                    onChange={event =>
                                        setName(event.target.value)
                                    }
                                />
                                <InputError messages={errors.name} />
                            </div>
                            <div className="mb-2">
                                <p className="c-text u-text--white">Email</p>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="c-input--wide"
                                    value={email}
                                    onChange={event =>
                                        setEmail(event.target.value)
                                    }
                                />
                                <InputError messages={errors.email} />
                            </div>
                            <div className="mb-2">
                                <p className="c-text u-text--white">パスワード</p>
                                <input
                                    type="password"
                                    name="pasword"
                                    id="password"
                                    className="c-input--wide"
                                    value={password}
                                    onChange={event =>
                                        setPassword(event.target.value)
                                    }
                                />
                                <InputError messages={errors.password} />
                            </div>
                            <div className="mb-2">
                                <p className="c-text u-text--white">
                                    パスワード（確認用）
                                </p>
                                <input
                                    type="password"
                                    name="passwordConfirmation"
                                    id="passwordConfirmation"
                                    className="c-input--wide"
                                    value={passwordConfirmation}
                                    onChange={event =>
                                        setPasswordConfirmation(
                                            event.target.value,
                                        )
                                    }
                                />
                                <InputError
                                    messages={errors.password_confirmation}
                                />
                            </div>

                            <div className="mb-1">
                                <button className="c-button--wide" type="submit">
                                    新規会員登録する
                                </button>
                            </div>
                            <div className="">
                                <div
                                    className="c-button--wide-ghost"
                                    onClick={() => {
                                        googleLogin()
                                    }}>
                                    Googleでログインする
                                </div>
                            </div>
                        </form>
                    </div>
                {/* </div> */}
            </div>
        </>
    )
}

export default Register
