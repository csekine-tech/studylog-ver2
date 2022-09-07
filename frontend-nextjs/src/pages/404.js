import GuestHeader from '@/components/Header/GuestHeader'
const NotFoundPage = () => {
    return (
        <>
            <GuestHeader />
            <main>
                <div class="c-container">
                    <div class="py-3">
                        <div class="mb-2">
                            <div class="c-box">
                                <div class="c-box__title__wrapper">
                                    <p class="c-box__title">404</p>
                                </div>
                                <div class="c-box__inner">
                                    <p class="c-text">
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
