import Link from 'next/link'
const WorkbookInfoListItem = ({
    id,
    title,
    subject_name,
    allCounts,
    finishedCounts,
    imgUrl = '/img/img-dummy.png',
    openModalHandler,
}) => {
    return (
        <div className="c-line--b py-3">
            <div className="row px-md-2">
                <div className="col-3 col-md-2 pl-2">
                    <img src={imgUrl} alt={title} className="w-100" />
                </div>
                <div className="col-9 col-md-6 px-2">
                    <p className="c-text u-text-14">{subject_name}</p>
                    <Link href={`/workbook/detail/${id}`}>
                        <p className="c-link u-text-18">{title}</p>
                    </Link>
                    <div className="row c-text u-text-14 pt-2">
                        <p className="col-4 col-md-2">全</p>
                        <p className="col-8 col-md-10">{allCounts}問</p>
                    </div>
                    <div className="row c-text u-text-14 pt-1">
                        <p className="col-4 col-md-2">完了</p>
                        <p className="col-8 col-md-10">{finishedCounts}問</p>
                    </div>
                    <div className="row c-text u-text-14 pt-1">
                        <p className="col-4 col-md-2">未完了</p>
                        <p className="col-8 colmd-10">{allCounts - finishedCounts}問</p>
                    </div>
                </div>
                <div className="col-md-4 px-2 pt-2 pt-md-0">
                    <div>
                        <div
                            className="c-button--white mb-2"
                            onClick={openModalHandler}>
                            タスクを作成する
                        </div>
                        <Link href={`/workbook/plan/${id}`}>
                            <div className="c-button--white">予定表</div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default WorkbookInfoListItem
