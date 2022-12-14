import GuestHeader from '@/components/Header/GuestHeader'
const NotFoundPage = () => {
    return (
        <>
            <GuestHeader />
            <main>
                <div className="c-container">
                    <div className="py-3">
                        <div className="mb-2">
                            <div className="c-box">
                                <div className="c-box__title__wrapper">
                                    <p className="c-box__title">404</p>
                                </div>
                                <div className="c-box__inner">
                                    <p className="c-text">
                                        ページが見つかりません。
                                    </p>
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
