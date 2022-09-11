const AuthMobileHeader = () => {
    return (
        <>
            <div className="l-header__menu__mobile__open">
                <div className="">
                    <div className="">
                        <ul className="">
                            <li
                                className="l-header__menu__mobile__item">
                                <a
                                    href="index.html"
                                    className="l-header__menu__mobile__item__link">
                                    ホーム
                                </a>
                            </li>
                            <li
                                className="l-header__menu__mobile__item">
                                <a
                                    href="workbook.html"
                                    className="l-header__menu__mobile__item__link">
                                    本棚
                                </a>
                            </li>
                            <li
                                className="l-header__menu__mobile__item">
                                <a
                                    href="task.html"
                                    className="l-header__menu__mobile__item__link">
                                    タスク
                                </a>
                            </li>
                            <li
                                className="l-header__menu__mobile__item">
                                <a
                                    href="calendar.html"
                                    className="l-header__menu__mobile__item__link">
                                    カレンダー
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="l-header__menu__mobile__bg">
                <div className="l-header__menu__mobile">
                    <div className="l-header__menu__mobile__icon">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AuthMobileHeader
