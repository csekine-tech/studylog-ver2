// import ApplicationLogo from '@/components/ApplicationLogo'
import AuthCard from '@/components/AuthCard'
import AuthSessionStatus from '@/components/AuthSessionStatus'
import Button from '@/components/Button'
import GuestLayout from '@/components/Layouts/GuestLayout'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import GuestHeader from '@/components/Header/GuestHeader'

const PasswordReset = () => {
    const router = useRouter()

    const { resetPassword } = useAuth({ middleware: 'guest' })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    const submitForm = event => {
        event.preventDefault()

        resetPassword({
            email,
            password,
            password_confirmation: passwordConfirmation,
            setErrors,
            setStatus,
        })
    }

    useEffect(() => {
        setEmail(router.query.email || '')
    }, [router.query.email])

    return (
        <>
            <GuestHeader />
            <div class="c-guest-bg">
                {/* <div class="c-container"> */}
                <div class="c-guest__inner">
                    <h3 class="u-text--white u-text-24 mb-3 text-center">
                        パスワード再設定フォーム
                    </h3>
                    <form onSubmit={submitForm}>
                        <div class="mb-2">
                            <p class="c-text u-text--white">Email</p>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                class="c-input--wide"
                                value={email}
                                onChange={event => setEmail(event.target.value)}
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
                                    setPasswordConfirmation(event.target.value)
                                }
                            />
                            <InputError
                                messages={errors.password_confirmation}
                            />
                        </div>

                        <div class="mb-1">
                            <button class="c-button--wide" type="submit">
                                パスワードを再設定する
                            </button>
                        </div>
                    </form>
                </div>
                {/* </div> */}
            </div>
        </>
    )
}

export default PasswordReset
