import Link from 'next/link'
const WorkbookInfoListItem = ({
    id,
    title,
    allCounts,
    finishedCounts,
    imgUrl = '/img/img-dummy.png',
    openModalHandler,
}) => {
    return (
        <div className="c-line--b py-3">
            <div className="row px-2">
                <div className="col-3 col-md-2 pl-2">
                    <img src={imgUrl} alt={title} className="w-100" />
                </div>
                <div className="col-md-7 px-2 py-1">
                    <Link href={`/workbook/detail/${id}`}>
                        <p className="c-link u-text-18">{title}</p>
                    </Link>
                    <div className="row c-text u-text-14 pt-2">
                        <p className="col-2">全</p>
                        <p className="col-10">{allCounts}問</p>
                    </div>
                    <div className="row c-text u-text-14 pt-1">
                        <p className="col-2">完了</p>
                        <p className="col-10">{finishedCounts}問</p>
                    </div>
                    <div className="row c-text u-text-14 pt-1">
                        <p className="col-2">未完了</p>
                        <p className="col-10">{allCounts - finishedCounts}問</p>
                    </div>
                </div>
                <div className="col-md-3">
                    <div>
                        <div
                            className="c-button--white mb-2"
                            onClick={openModalHandler}>
                            学習を記録する
                        </div>
                        <Link href={`/workbook/plan/${id}`}>
                            <div className="c-button--white">予定を管理する</div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default WorkbookInfoListItem
