import AuthHeader from '@/components/Header/AuthHeader'
import { useAuth } from '@/hooks/auth'

const User = () => {
    const { user } = useAuth()
    return (
        <>
            <AuthHeader />
            <main>
                <div class="c-container">
                    <div class="row">
                        <div class="col-md-4 pr-md-2 py-1">
                            <div class="c-button">教材を登録する</div>
                        </div>
                        <div class="col-md-4 px-md-2 py-1">
                            <div class="c-button">学習を記録する</div>
                        </div>
                    </div>
                    <div class="py-3">
                        <div class="mb-2">
                            <div class="c-box">
                                <div class="c-box__title__wrapper">
                                    <p class="c-box__title">ユーザー情報</p>
                                </div>
                                <div class="c-box__inner">
                                    <div class="row c-text align-items-center my-2">
                                        <p class="col-md-3">ユーザー名</p>
                                        <p class="col-md-9">{user?.name}</p>
                                    </div>
                                    <div class="row c-text align-items-center my-2">
                                        <p class="col-md-3">Email</p>
                                        <div class="col-md-9">{user?.email}</div>
                                    </div>
                                    <div class="row c-text align-items-center my-2">
                                        <p class="col-md-3">Googleと連携</p>
                                        <div class="col-md-9">
                                            {user?.google_id ? '済' : '未連携'}
                                        </div>
                                    </div>
                                </div>
                                <div class="c-button--wide-white">編集する</div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
export default User
