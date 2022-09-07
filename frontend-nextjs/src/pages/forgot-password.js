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
    const { forgotPassword } = useAuth({ middleware: 'guest' })

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
            <div class="c-guest-bg">
                <div class="c-container">
                    <div class="c-guest__inner">
                        <h3 class="u-text--white u-text-24 mb-3 text-center">
                            パスワード再設定
                        </h3>
                        <p class="c-text u-text--white mb-2">
                            パスワードの再設定用リンクをご登録のメールアドレスに送信します。ご登録のメールアドレスを記入してください。
                        </p>
                        <form onSubmit={submitForm}>
                            <div class="mb-3">
                                <p class="c-text u-text--white">Email</p>
                                <input
                                    onChange={event =>
                                        setEmail(event.target.value)
                                    }
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={email}
                                    class="c-input--wide"
                                />
                                <InputError messages={errors.email} />
                            </div>
                            <div class="mb-1">
                                <button class="c-button--wide" type="submit">
                                    パスワード再設定リンクを送信する
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
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
                    <div className="mb-4 text-sm text-gray-600">
                        Forgot your password? No problem. Just let us know your
                        email address and we will email you a password reset
                        link that will allow you to choose a new one.
                    </div>

                    {/* Session Status */}
                    <AuthSessionStatus className="mb-4" status={status} />

                    <form onSubmit={submitForm}>
                        {/* Email Address */}
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                value={email}
                                className="block mt-1 w-full"
                                onChange={event => setEmail(event.target.value)}
                                required
                                autoFocus
                            />

                            <InputError
                                messages={errors.email}
                                className="mt-2"
                            />
                        </div>

                        <div className="flex items-center justify-end mt-4">
                            <Button>Email Password Reset Link</Button>
                        </div>
                    </form>
                </AuthCard>
            </GuestLayout>
        </>
    )
}

export default ForgotPassword
