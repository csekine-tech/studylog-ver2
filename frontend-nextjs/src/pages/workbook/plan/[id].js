import Head from 'next/head'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import AuthHeader from '@/components/Header/AuthHeader'
import WorkbookList from '@/components/LeftBox/WorkbookList'
import PlanRow from '@/components/Plan/Row'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import WorkbookEditModal from '@/components/GlobalModal/WorkbookEditModal'
import WorkbookRegisterModal from '@/components/GlobalModal/WorkbookRegisterModal'
import TaskBulkAddModal from '@/components/GlobalModal/TaskBulkAddModal'
import { useWorkbook } from '@/hooks/workbook'

const workbookDataDefault = {
    id: null,
    name: null,
    has_chapter: false,
    chapter_counts: null,
    subject_name: null,
    chapters: { number: 1, question_counts: 0 },
}
const WorkbookPlan = () => {
    const { user } = useAuth({ middleware: 'auth' })
    const router = useRouter()
    const [id, setId] = useState(Number(router.query.id))

    const { getWorkbookDetail, getWorkbookList } = useWorkbook()
    const [workbookData, setWorkbookData] = useState(workbookDataDefault)
    const [workbookList, setWorkbookList] = useState([])

    const [isOpenBulkaddModal, setIsOpenBulkaddModal] = useState({
        workbook_id: null,
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
    const getWorkbookListHandler = () => {
        getWorkbookList({ setWorkbookList })
    }
    useEffect(() => {
        return () => {
            setId(Number(router.query.id))
            setWorkbookData(workbookDataDefault)
            setWorkbookList([])
            setIsOpenWorkbookRegisterModal({ isOpen: false })
            setIsOpenWorkbookEditModal({
                id: null,
                isOpen: false,
                workbookData: workbookDataDefault,
            })
            setIsOpenBulkaddModal({
                workbook_id: null,
                isOpen: false,
            })
        }
    }, [])
    useEffect(() => {
        setId(Number(router.query.id))
    }, [router])
    useEffect(() => {
        if (!Number.isNaN(id)) {
            getWorkbookDetail({ id: id, setWorkbookData })
        }
    }, [id])

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
                                <WorkbookList
                                    workbookList={workbookList}
                                    getWorkbookList={getWorkbookListHandler}
                                    className="d-none d-md-block"
                                />
                                <div className="col-md-9 pl-md-2">
                                    <div className="c-box mb-3">
                                        <div className="c-box__title__wrapper">
                                            <p className="c-box__title">
                                                予定表
                                            </p>
                                            {/* <p className="c-box__subtitle">
                                                問題を解いたら、得点を4段階で評価しよう
                                            </p> */}
                                        </div>
                                        <div className="c-box__inner">
                                            <div className="row">
                                                <div className="col-3 col-md-2">
                                                    <img
                                                        src="/img/img-dummy.png"
                                                        alt=""
                                                        className="w-100"
                                                    />
                                                </div>
                                                <div className="col-9 col-md-7 px-2 py-1">
                                                    <Link
                                                        href={`/workbook/detail/${id}`}>
                                                        <p className="c-link u-text-18">
                                                            {workbookData?.name}
                                                        </p>
                                                    </Link>
                                                    <div className="row c-text u-text-14 pt-2">
                                                        <p className="col-4 col-md-2">
                                                            全
                                                        </p>
                                                        <p className="col-8 col-md-10">
                                                            {
                                                                workbookData?.question_counts
                                                            }
                                                            問
                                                        </p>
                                                    </div>
                                                    <div className="row c-text u-text-14 pt-1">
                                                        <p className="col-4 col-md-2">
                                                            完了
                                                        </p>
                                                        <p className="col-8 col-md-10">
                                                            {
                                                                workbookData?.finished_question_counts
                                                            }
                                                            問
                                                        </p>
                                                    </div>
                                                    <div className="row c-text u-text-14 pt-1">
                                                        <p className="col-4 col-md-2">
                                                            未完了
                                                        </p>
                                                        <p className="col-8 col-md-10">
                                                            {workbookData?.question_counts
                                                                ? workbookData.question_counts -
                                                                  workbookData.finished_question_counts
                                                                : ''}
                                                            問
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            {workbookData.id && (
                                                <p
                                                    className="c-text c-link"
                                                    onClick={() => {
                                                        openWorkbookEditModalHandler()
                                                    }}>
                                                    この教材の情報を編集する
                                                </p>
                                            )}
                                            {workbookData.id && (
                                                <div className="py-2">
                                                    <button
                                                        className="c-button--wide-white"
                                                        onClick={() => {
                                                            setIsOpenBulkaddModal(
                                                                {
                                                                    workbook_id: 1,
                                                                    isOpen: true,
                                                                },
                                                            )
                                                        }}>
                                                        予定日をまとめて入力する
                                                    </button>
                                                </div>
                                            )}
                                            <div
                                                style={{
                                                    width: '100%',
                                                    overflowX: 'scroll',
                                                }}>
                                                <table
                                                    className="c-table my-3"
                                                    style={{
                                                        minWidth: '450px',
                                                        // overflowX: 'scroll',
                                                    }}>
                                                    <tbody>
                                                        <tr>
                                                            {workbookData?.has_chapter ===
                                                                1 && (
                                                                <th>章</th>
                                                            )}
                                                            <th>問題番号</th>
                                                            <th>
                                                                次に解く予定日
                                                            </th>
                                                            <th>解いた回数</th>
                                                            <th>最後の評価</th>
                                                        </tr>
                                                        {workbookData.chapters
                                                            .length > 0 &&
                                                            workbookData.chapters.map(
                                                                chapter => {
                                                                    return chapter.questions.map(
                                                                        (
                                                                            question,
                                                                            index,
                                                                        ) => {
                                                                            console.log(question);
                                                                            return (
                                                                                <PlanRow
                                                                                    is_finished={
                                                                                        question.is_finished ===
                                                                                        1
                                                                                            ? true
                                                                                            : false
                                                                                    }
                                                                                    number={
                                                                                        question.number
                                                                                    }
                                                                                    planned_at={
                                                                                        question.next_plan_date
                                                                                            ? question.next_plan_date
                                                                                            : ''
                                                                                    }
                                                                                    rate={
                                                                                        question.last_rate
                                                                                            ? question.last_rate
                                                                                            : 0
                                                                                    }
                                                                                    counts={
                                                                                        question.counts
                                                                                    }
                                                                                    edit={
                                                                                        false
                                                                                    }
                                                                                    isDone={
                                                                                        question.counts >
                                                                                        0
                                                                                            ? true
                                                                                            : false
                                                                                    }
                                                                                    has_chapter={
                                                                                        workbookData.has_chapter ===
                                                                                        1
                                                                                            ? true
                                                                                            : false
                                                                                    }
                                                                                    chapter_number={
                                                                                        workbookData.has_chapter ===
                                                                                            1 &&
                                                                                        question.number ===
                                                                                            1
                                                                                            ? chapter.number
                                                                                            : ''
                                                                                    }
                                                                                    qId={
                                                                                        question.id
                                                                                    }
                                                                                    taskId={
                                                                                        question
                                                                                            .tasks
                                                                                            .length >
                                                                                        0
                                                                                            ? question
                                                                                                  .tasks[0]
                                                                                                  .id
                                                                                            : ''
                                                                                    }
                                                                                    key={
                                                                                        index
                                                                                    }
                                                                                    getTasks={() => {
                                                                                        getWorkbookDetail(
                                                                                            {
                                                                                                id: id,
                                                                                                setWorkbookData,
                                                                                            },
                                                                                        )
                                                                                    }}
                                                                                />
                                                                            )
                                                                        },
                                                                    )
                                                                },
                                                            )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {isOpenBulkaddModal && (
                            <TaskBulkAddModal
                                isOpen={isOpenBulkaddModal.isOpen}
                                workbook_id={id}
                                closeHandler={() => {
                                    getWorkbookDetail({
                                        id: id,
                                        setWorkbookData,
                                    })
                                    setIsOpenBulkaddModal({
                                        workbook_id: null,
                                        isOpen: false,
                                    })
                                }}
                            />
                        )}

                        {isOpenWorkbookEditModal.isOpen && (
                            <WorkbookEditModal
                                isOpen={isOpenWorkbookEditModal.isOpen}
                                id={id}
                                workbookData={workbookData}
                                closeHandler={() => {
                                    getWorkbookListHandler()
                                    getWorkbookDetail({
                                        id: id,
                                        setWorkbookData,
                                    })
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
                                    getWorkbookListHandler()
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
