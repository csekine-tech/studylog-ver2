import InputError from '@/components/InputError'
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

    useEffect(() => {
        return () => {
            setName('')
            setEmail('')
            setPassword('')
            setPasswordConfirmation('')
            setErrors([])
            setStatus(null)
        }
    }, [])

    return (
        <>
            <GuestHeader />
            <div className="c-guest-bg">
                {/* <div className="c-container"> */}
                <div className="c-guest__inner">
                    <h3 className="u-text--white u-text-24 mb-3 text-center">
                        パスワード再設定フォーム
                    </h3>
                    <form onSubmit={submitForm}>
                        <div className="mb-2">
                            <p className="c-text u-text--white">Email</p>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="c-input--wide"
                                value={email}
                                onChange={event => setEmail(event.target.value)}
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
                                    setPasswordConfirmation(event.target.value)
                                }
                            />
                            <InputError
                                messages={errors.password_confirmation}
                            />
                        </div>

                        <div className="mb-1">
                            <button className="c-button--wide" type="submit">
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
