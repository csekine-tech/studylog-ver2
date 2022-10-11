import AuthHeader from '@/components/Header/AuthHeader'

const Nortification = () => {
    return (
        <>
            <AuthHeader />
            <main>
                <div className="c-container">
                    <div className="py-3">
                        <div className="mb-2">
                            <div className="c-box">
                                <div className="c-box__title__wrapper">
                                    <p className="c-box__title">通知</p>
                                </div>
                                <div className="c-box__inner">
                                    <p className="c-text">通知</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Nortification
