import AuthHeader from '@/components/Header/AuthHeader'
import { useAuth } from '@/hooks/auth'
import Modal from '@/components/Modal'
import { useEffect, useState } from 'react'
import Loading from '@/components/Loading'

const User = () => {
    const { user, update, remove } = useAuth({ middleware: 'auth' })
    const [isOpenUserEditModal, setIsOpenUserEditModal] = useState(false)

    const [name, setName] = useState(user?.name)
    const [email, setEmail] = useState(user?.email)
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setName(user?.name)
        setEmail(user?.email)
    }, [user])

    const submitForm = async event => {
        setLoading(true)
        event.preventDefault()
        await update({
            name,
            email,
            password,
            password_confirmation: passwordConfirmation,
            setStatus,
            setErrors,
        })
    }
    useEffect(() => {
        if (errors.length > 0) {
        } else if (status) {
            setIsOpenUserEditModal(false)
        }
        setLoading(false)
    }, [status, errors])

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
            <AuthHeader />
            <main>
                <div className="c-container">
                    <div className="py-3">
                        <div className="mb-2">
                            <div className="c-box">
                                <div className="c-box__title__wrapper">
                                    <p className="c-box__title">ユーザー情報</p>
                                </div>
                                <div className="c-box__inner">
                                    <div className="row c-text align-items-center my-2">
                                        <p className="col-md-3">ユーザー名</p>
                                        <p className="col-md-9">{name}</p>
                                    </div>
                                    <div className="row c-text align-items-center my-2">
                                        <p className="col-md-3">Email</p>
                                        <div className="col-md-9">{email}</div>
                                    </div>
                                    <div className="row c-text align-items-center my-2">
                                        <p className="col-md-3">Googleと連携</p>
                                        <div className="col-md-9">
                                            {user?.google_id ? '済' : '未連携'}
                                        </div>
                                    </div>
                                </div>
                                {user && (
                                    <div className="row mt-3">
                                        <div className="col-md-6 pl-md-1 order-md-2 mb-1">
                                            <button
                                                className="c-button--wide-white"
                                                onClick={() => {
                                                    setIsOpenUserEditModal(true)
                                                }}>
                                                編集する
                                            </button>
                                        </div>
                                        <div className="col-md-6 pr-md-1 order-md-1 mb-1">
                                            <button
                                                className="c-button--wide-white"
                                                onClick={() => {
                                                    const result = window.confirm(
                                                        `${name}さんの全てのデータが削除されます。本当に削除してよろしいですか？`,
                                                    )
                                                    if (result) {
                                                        remove()
                                                    }
                                                }}>
                                                ユーザー情報を抹消する
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <Modal
                    title="ユーザー情報"
                    isOpen={isOpenUserEditModal}
                    closeHandler={() => {
                        loading ? '' : setIsOpenUserEditModal(false)
                    }}>
                    <form onSubmit={submitForm}>
                        <div className="row c-text align-items-center my-2">
                            <p className="col-md-3">ユーザー名</p>
                            <div className="col-md-9">
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
                                <p className="c-text u-text--red">
                                    {errors?.name}
                                </p>
                            </div>
                        </div>

                        <div className="row c-text align-items-center my-2">
                            <p className="col-md-3">Email</p>
                            <div className="col-md-9">
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
                                <p className="c-text u-text--red">
                                    {errors?.email}
                                </p>
                            </div>
                        </div>
                        <div className="row c-text align-items-center my-2">
                            <p className="col-md-3">パスワード</p>
                            <div className="col-md-9">
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
                                <p className="c-text u-text--red">
                                    {errors?.password}
                                </p>
                            </div>
                        </div>
                        <div className="row c-text align-items-center my-2">
                            <p className="col-md-3">パスワード（確認用）</p>
                            <div className="col-md-9">
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
                                <p className="c-text u-text--red">
                                    {errors?.password_confirmation}
                                </p>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-6 pl-md-1 order-md-2 mb-1">
                                <button
                                    className="c-button--wide"
                                    type="submit">
                                    {loading ? <Loading /> : '編集を完了する'}
                                </button>
                            </div>
                            <div className="col-md-6 pr-md-1 order-md-1 mb-1">
                                <button
                                    className="c-button--wide"
                                    onClick={() => {
                                        setIsOpenUserEditModal(false)
                                    }}>
                                    キャンセルする
                                </button>
                            </div>
                        </div>
                    </form>
                </Modal>
            </main>
        </>
    )
}
export default User
