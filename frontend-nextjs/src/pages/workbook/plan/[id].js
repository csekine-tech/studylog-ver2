import Head from 'next/head'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import AuthHeader from '@/components/Header/AuthHeader'
import WorkbookList from '@/components/LeftBox/WorkbookList'
import PlanRow from '@/components/Plan/Row'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Modal from '@/components/Modal'
import WorkbookEditModal from '@/components/GlobalModal/WorkbookEditModal'
import WorkbookRegisterModal from '@/components/GlobalModal/WorkbookRegisterModal'
import TaskBulkAddModal from '@/components/GlobalModal/TaskBulkAddModal'
const workbookDataDefault = {
    id: null,
    name: null,
    hasChapter: false,
    chapterCounts: null,
    subjectName: null,
    chapters: { id: 1, questionCounts: 0 },
}
const WorkbookPlan = () => {
    const workbookData = {
        id: 1,
        name: '大学への数学',
        hasChapter: true,
        chapterCounts: 3,
        subjectName: '数学',
        chapters: [
            { number: 1, questionCounts: 10 },
            { number: 2, questionCounts: 10 },
            { number: 3, questionCounts: 10 },
        ],
    }

    const { user } = useAuth({ middleware: 'auth' })
    const router = useRouter()
    const id = Number(router.query.id)
    const [isOpenBulkaddModal, setIsOpenBulkaddModal] = useState({
        workbookId: null,
        isOpen: false,
    })

    const [isOpenWorkbookEditModal, setIsOpenWorkbookEditModal] = useState({
        id: null,
        isOpen: false,
        workbookData: workbookDataDefault,
    })
    const [
        isOpenWorkbookregisterModal,
        setIsOpenWorkbookRegisterModal,
    ] = useState({
        id: null,
        isOpen: false,
    })
    const openWorkbookEditModalHandler = () => {
        setIsOpenWorkbookEditModal({
            id: 1,
            isOpen: true,
            workbookData: workbookData,
        })
    }
    const openWorkbookRegisterModalHandler = () => {
        setIsOpenWorkbookRegisterModal({ isOpen: true })
    }
    useEffect(() => {
        return () => {
            setIsOpenWorkbookRegisterModal({ isOpen: false })
            setIsOpenWorkbookEditModal({
                id: null,
                isOpen: false,
                workbookData: workbookDataDefault,
            })
            setIsOpenBulkaddModal({
                workbookId: null,
                isOpen: false,
            })
        }
    }, [])

    return (
        <>
            <Head>
                <title>StudyLog</title>
            </Head>
            {user && (
                <>
                    <AuthHeader />
                    <main>
                        <div className="c-container">
                            <div className="row">
                                <div className="col-md-4 pr-md-2 py-1">
                                    <div
                                        className="c-button"
                                        onClick={() => {
                                            openWorkbookRegisterModalHandler()
                                        }}>
                                        教材を登録する
                                    </div>
                                </div>
                                <Link href="/task">
                                    <div className="col-md-4 px-md-2 py-1">
                                        <div className="c-button">
                                            学習を記録する
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="row py-3">
                                <WorkbookList />
                                <div className="col-md-9 pl-2">
                                    <div className="c-box mb-3">
                                        <div className="c-box__title__wrapper">
                                            <p className="c-box__title">
                                                予定管理
                                            </p>
                                            {/* <p className="c-box__subtitle">
                                                問題を解いたら、得点を4段階で評価しよう
                                            </p> */}
                                        </div>
                                        <div className="c-box__inner">
                                            <div className="row">
                                                <div className="col-2">
                                                    <img
                                                        src="/img/img-dummy.png"
                                                        alt=""
                                                        className="w-100"
                                                    />
                                                </div>
                                                <div className="col-7 px-2 py-1">
                                                    <Link
                                                        href={`/workbook/detail/${id}`}>
                                                        <p className="c-link u-text-18">
                                                            大学への数学
                                                        </p>
                                                    </Link>
                                                    <div className="row c-text u-text-14 pt-2">
                                                        <p className="col-2">
                                                            全
                                                        </p>
                                                        <p className="col-10">
                                                            350問
                                                        </p>
                                                    </div>
                                                    <div className="row c-text u-text-14 pt-1">
                                                        <p className="col-2">
                                                            完了
                                                        </p>
                                                        <p className="col-10">
                                                            230問
                                                        </p>
                                                    </div>
                                                    <div className="row c-text u-text-14 pt-1">
                                                        <p className="col-2">
                                                            未完了
                                                        </p>
                                                        <p className="col-10">
                                                            120問
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <p
                                                className="c-link"
                                                onClick={() => {
                                                    openWorkbookEditModalHandler()
                                                }}>
                                                この教材の情報を編集する
                                            </p>
                                            <div className="py-2">
                                                <button
                                                    className="c-button--wide-white"
                                                    onClick={() => {
                                                        setIsOpenBulkaddModal({
                                                            workbookId: 1,
                                                            isOpen: true,
                                                        })
                                                    }}>
                                                    予定日をまとめて入力する
                                                </button>
                                            </div>
                                            <table className="c-table my-3">
                                                <tbody>
                                                    <tr>
                                                        <th>問題番号</th>
                                                        <th>次に解く予定日</th>
                                                        <th>解いた回数</th>
                                                        <th>最後の評価</th>
                                                    </tr>
                                                    <PlanRow
                                                        isFinished={true}
                                                        number={1}
                                                        rate={1}
                                                        counts={3}
                                                    />
                                                    <PlanRow
                                                        isFinished={false}
                                                        number={2}
                                                        rate={2}
                                                        counts={2}
                                                    />

                                                    <tr>
                                                        <td>3</td>
                                                        <td>
                                                            <input
                                                                type="date"
                                                                name=""
                                                                id=""
                                                            />
                                                        </td>
                                                        <td>3</td>
                                                        <td>
                                                            <div className="c-star">
                                                                <span className="selected">
                                                                    ★★★★
                                                                </span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {isOpenBulkaddModal && (
                            <TaskBulkAddModal
                                isOpen={isOpenBulkaddModal.isOpen}
                                workbookId={isOpenBulkaddModal.workbookId}
                                closeHandler={() => {
                                    setIsOpenBulkaddModal({
                                        workbookId: null,
                                        isOpen: false,
                                    })
                                }}
                            />
                        )}

                        {isOpenWorkbookEditModal.isOpen && (
                            <WorkbookEditModal
                                isOpen={isOpenWorkbookEditModal.isOpen}
                                id={1}
                                workbookData={workbookData}
                                closeHandler={() => {
                                    setIsOpenWorkbookEditModal({
                                        id: null,
                                        isOpen: false,
                                    })
                                }}
                            />
                        )}
                        {isOpenWorkbookregisterModal.isOpen && (
                            <WorkbookRegisterModal
                                isOpen={isOpenWorkbookregisterModal.isOpen}
                                closeHandler={() => {
                                    setIsOpenWorkbookRegisterModal({
                                        isOpen: false,
                                    })
                                }}
                            />
                        )}
                    </main>
                </>
            )}
        </>
    )
}
export default WorkbookPlan
