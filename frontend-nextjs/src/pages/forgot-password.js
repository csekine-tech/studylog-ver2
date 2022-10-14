import InputError from '@/components/InputError'
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'
import GuestHeader from '@/components/Header/GuestHeader'
import AuthSessionStatus from '@/components/AuthSessionStatus'
import Loading from '@/components/Loading'

const ForgotPassword = () => {
    const { forgotPassword } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/mypage',
    })

    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)
    const [statusMessage, setStatusMessage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const submitForm = async event => {
        setIsLoading(true)
        event.preventDefault()

        await forgotPassword({ email, setErrors, setStatusMessage })
        await setIsLoading(false)
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
                        {/* Session Status */}
                        <AuthSessionStatus
                            className="my-2"
                            status={statusMessage}
                        />
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
                                <button
                                    className="c-button--wide"
                                    type="submit"
                                    disabled={isLoading}>
                                    {isLoading ? (
                                        <Loading />
                                    ) : (
                                        'パスワード再設定リンクを送信する'
                                    )}
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
