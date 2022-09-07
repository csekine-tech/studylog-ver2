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
            <div class="c-guest-bg">
                {/* <div class="c-container"> */}
                    <div class="c-guest__inner">
                        <h3 class="u-text--white u-text-24 mb-3 text-center">
                            新規会員登録
                        </h3>
                        <p class="c-text text-center u-text--white mb-3">
                            すでにご登録済みの方は
                            <Link href="/login">
                                <a href="" class="u-underline">
                                    ログイン
                                </a>
                            </Link>
                            してください
                        </p>
                        <form onSubmit={submitForm}>
                            <div class="mb-2">
                                <p class="c-text u-text--white">ユーザー名</p>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    class="c-input--wide"
                                    value={name}
                                    onChange={event =>
                                        setName(event.target.value)
                                    }
                                />
                                <InputError messages={errors.name} />
                            </div>
                            <div class="mb-2">
                                <p class="c-text u-text--white">Email</p>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    class="c-input--wide"
                                    value={email}
                                    onChange={event =>
                                        setEmail(event.target.value)
                                    }
                                />
                                <InputError messages={errors.email} />
                            </div>
                            <div class="mb-2">
                                <p class="c-text u-text--white">パスワード</p>
                                <input
                                    type="password"
                                    name="pasword"
                                    id="password"
                                    class="c-input--wide"
                                    value={password}
                                    onChange={event =>
                                        setPassword(event.target.value)
                                    }
                                />
                                <InputError messages={errors.password} />
                            </div>
                            <div class="mb-2">
                                <p class="c-text u-text--white">
                                    パスワード（確認用）
                                </p>
                                <input
                                    type="password"
                                    name="passwordConfirmation"
                                    id="passwordConfirmation"
                                    class="c-input--wide"
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

                            <div class="mb-1">
                                <button class="c-button--wide" type="submit">
                                    新規会員登録する
                                </button>
                            </div>
                            <div class="">
                                <div
                                    class="c-button--wide-ghost"
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

            <GuestLayout>
                <AuthCard
                    logo={
                        <Link href="/">
                            <a>
                                {/* <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" /> */}
                            </a>
                        </Link>
                    }>
                    <form onSubmit={submitForm}>
                        {/* Name */}
                        <div>
                            <Label htmlFor="name">Name</Label>

                            <Input
                                id="name"
                                type="text"
                                value={name}
                                onChange={event => setName(event.target.value)}
                                required
                                autoFocus
                            />

                            <InputError
                                messages={errors.name}
                                className="mt-2"
                            />
                        </div>

                        {/* Email Address */}
                        <div className="mt-4">
                            <Label htmlFor="email">Email</Label>

                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                                required
                            />

                            <InputError
                                messages={errors.email}
                                className="mt-2"
                            />
                        </div>

                        {/* Password */}
                        <div className="mt-4">
                            <Label htmlFor="password">Password</Label>

                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={event =>
                                    setPassword(event.target.value)
                                }
                                required
                                autoComplete="new-password"
                            />

                            <InputError
                                messages={errors.password}
                                className="mt-2"
                            />
                        </div>

                        {/* Confirm Password */}
                        <div className="mt-4">
                            <Label htmlFor="passwordConfirmation">
                                Confirm Password
                            </Label>

                            <Input
                                id="passwordConfirmation"
                                type="password"
                                value={passwordConfirmation}
                                onChange={event =>
                                    setPasswordConfirmation(event.target.value)
                                }
                                required
                            />

                            <InputError
                                messages={errors.password_confirmation}
                                className="mt-2"
                            />
                        </div>

                        <div className="flex items-center justify-end mt-4">
                            <Link href="/login">
                                <a className="underline text-sm text-gray-600 hover:text-gray-900">
                                    Already registered?
                                </a>
                            </Link>

                            <Button className="ml-4">Register</Button>
                        </div>
                    </form>
                </AuthCard>
            </GuestLayout>
        </>
    )
}

export default Register
