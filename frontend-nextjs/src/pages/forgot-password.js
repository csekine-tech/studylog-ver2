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
import { useState } from 'react'
import GuestHeader from '@/components/Header/GuestHeader'

const ForgotPassword = () => {
    const { forgotPassword } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/mypage',
    })

    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    const submitForm = event => {
        event.preventDefault()

        forgotPassword({ email, setErrors, setStatus })
    }

    return (
        <>
            <GuestHeader />
            <div className="c-guest-bg">
                <div className="c-container">
                    <div className="c-guest__inner">
                        <h3 className="u-text--white u-text-24 mb-3 text-center">
                            パスワード再設定
                        </h3>
                        <p className="c-text u-text--white mb-2">
                            パスワードの再設定用リンクをご登録のメールアドレスに送信します。ご登録のメールアドレスを記入してください。
                        </p>
                        <form onSubmit={submitForm}>
                            <div className="mb-3">
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
                            <div className="mb-1">
                                <button className="c-button--wide" type="submit">
                                    パスワード再設定リンクを送信する
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword
