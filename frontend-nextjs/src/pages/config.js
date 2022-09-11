import AuthHeader from '@/components/Header/AuthHeader'

const NotFoundPage = () => {
    return (
        <>
            <AuthHeader />
            <main>
                <div className="c-container">
                    <div className="py-3">
                        <div className="mb-2">
                            <div className="c-box">
                                <div className="c-box__title__wrapper">
                                    <p className="c-box__title">設定</p>
                                </div>
                                <div className="c-box__inner">
                                    <div className="c-button--wide-white">
                                        編集する
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default NotFoundPage
