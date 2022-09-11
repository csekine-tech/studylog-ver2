import Link from 'next/link'

const WorkbookList = () => {
    return (
        <div className="col-md-3 pr-md-2 mb-2">
            <div className="c-box">
                <div className="c-box__title__wrapper">
                    <p className="c-box__title">登録済みの教材</p>
                </div>
                <div className="c-box__inner">
                    <div className="c-list__wrapper py-2">
                        <p className="c-list__title">数学</p>
                        <ul className="c-list">
                            <Link href="/workbook/detail/1">
                                <li className="c-list__item">
                                    <a href="" className="c-link">
                                        大学への数学1
                                    </a>
                                </li>
                            </Link>
                        </ul>
                    </div>
                    <div className="c-list__wrapper py-2">
                        <p className="c-list__title">数学</p>
                        <ul className="c-list">
                            <li className="c-list__item">
                                <a href="" className="c-link">
                                    大学への数学1
                                </a>
                            </li>
                            <li className="c-list__item">
                                <a href="" className="c-link">
                                    大学への数学1
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default WorkbookList
