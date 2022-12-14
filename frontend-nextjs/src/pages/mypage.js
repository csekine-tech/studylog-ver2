import Head from 'next/head'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import AuthHeader from '@/components/Header/AuthHeader'
import WorkbookList from '@/components/LeftBox/WorkbookList'
import TaskCard from '@/components/TaskCard/default'
import TaskEditModal from '@/components/GlobalModal/TaskEditModal'
import WorkbookRegisterModal from '@/components/GlobalModal/WorkbookRegisterModal'
import { useTask } from '@/hooks/task'
import { useResult } from '@/hooks/result'
import { useWorkbook } from '@/hooks/workbook'

export default function MyPage() {
    const { user } = useAuth({ middleware: 'auth' })
    const { getTodaysTaskList } = useTask()
    const { getResult } = useResult()
    const [todaysTaskList, setTodaysTaskList] = useState([])
    const [result, setResult] = useState({})
    const [workbookList, setWorkbookList] = useState([])
    const { getWorkbookList } = useWorkbook()

    const [isOpenTaskEditModal, setIsOpenTaskEditModal] = useState({
        task: {},
        isOpen: false,
    })
    const [
        isOpenWorkbookregisterModal,
        setIsOpenWorkbookRegisterModal,
    ] = useState({
        id: null,
        isOpen: false,
    })
    const openTaskEditModalHandler = task => {
        setIsOpenTaskEditModal({ isOpen: true, task: task })
    }
    const openWorkbookRegisterModalHandler = () => {
        setIsOpenWorkbookRegisterModal({ isOpen: true })
    }
    const getWorkbookListHandler = () => {
        getWorkbookList({ setWorkbookList })
    }
    const rateUpdateHandler = () => {
        getWorkbookList({ setWorkbookList })
        getTodaysTaskList({ setTodaysTaskList })
        getResult({ setResult })
    }
    useEffect(() => {
        getTodaysTaskList({ setTodaysTaskList })
        getResult({ setResult })
        return () => {
            setIsOpenTaskEditModal({ task: {}, isOpen: false })
            setIsOpenWorkbookRegisterModal({ isOpen: false })
            setTodaysTaskList([])
            setWorkbookList([])
            setResult({})
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
                                        ?????????????????????
                                    </div>
                                </div>
                                {/* <Link href="/task">
                                    <div className="col-md-4 px-md-2 py-1">
                                        <div className="c-button">
                                            ?????????????????????
                                        </div>
                                    </div>
                                </Link> */}
                            </div>
                            <div className="row py-3">
                                <WorkbookList
                                    workbookList={workbookList}
                                    getWorkbookList={getWorkbookListHandler}
                                    id="tutorial2-1"
                                />
                                <div className="col-md-9 pl-md-2">
                                    <div className="c-box mb-3">
                                        <div className="c-box__title__wrapper">
                                            <p className="c-box__title">
                                                ??????????????????
                                            </p>
                                            <p className="c-box__subtitle">
                                                ?????????????????????????????????4????????????????????????
                                            </p>
                                        </div>
                                        <div className="c-box__inner">
                                            <div className="row">
                                                {todaysTaskList?.map(task => {
                                                    if (!task.done_at) {
                                                        return (
                                                            <TaskCard
                                                                key={task.id}
                                                                color={
                                                                    task
                                                                        .question
                                                                        .chapter
                                                                        .workbook
                                                                        .subject
                                                                        .color_name
                                                                }
                                                                title={
                                                                    task.workbook_name
                                                                }
                                                                id={task.id}
                                                                chapter={
                                                                    task
                                                                        .question
                                                                        .chapter
                                                                        .number
                                                                }
                                                                number={
                                                                    task
                                                                        .question
                                                                        .number
                                                                }
                                                                has_chapter={
                                                                    task
                                                                        .question
                                                                        .chapter
                                                                        .workbook
                                                                        .has_chapter
                                                                }
                                                                rate={0}
                                                                date={
                                                                    task.planned_at
                                                                }
                                                                openModalHandler={() => {
                                                                    openTaskEditModalHandler(
                                                                        task,
                                                                    )
                                                                }}
                                                                reload={() => {
                                                                    getTodaysTaskList(
                                                                        {
                                                                            setTodaysTaskList,
                                                                        },
                                                                    )
                                                                }}
                                                                workbook_id={
                                                                    task
                                                                        .question
                                                                        .chapter
                                                                        .workbook
                                                                        .id
                                                                }
                                                                rateUpdateHandler={
                                                                    rateUpdateHandler
                                                                }
                                                            />
                                                        )
                                                    }
                                                })}
                                                {todaysTaskList?.length ===
                                                    0 && (
                                                    <p className="c-text">
                                                        ???????????????????????????????????????
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="c-box" id="tutorial2-2">
                                        <div className="c-box__title__wrapper">
                                            <p className="c-box__title">
                                                ???????????????
                                            </p>
                                            <p className="c-box__subtitle">
                                                ???????????????????????????????????????
                                            </p>
                                        </div>
                                        <div className="c-box__inner">
                                            <div className="d-flex justify-content-around align-items-center c-text">
                                                <div className="text-center u-text-bold">
                                                    <p className="u-text-16">
                                                        ??????
                                                    </p>
                                                    <p className="u-text-36">
                                                        {result.question_counts
                                                            ? result.question_counts -
                                                              result.finished_question_counts
                                                            : '-'}
                                                    </p>
                                                    <p className="u-text-16">
                                                        ???
                                                    </p>
                                                </div>
                                                <div className="text-center u-text-bold">
                                                    <p className="u-text-16">
                                                        ??????
                                                    </p>
                                                    <p className="u-text-36">
                                                        {result.finished_question_counts
                                                            ? result.finished_question_counts
                                                            : '-'}
                                                    </p>
                                                    <p className="u-text-16">
                                                        ???
                                                    </p>
                                                </div>
                                                {/* <div className="text-center u-text-bold">
                                                    <p className="u-text-16">
                                                        ??????
                                                    </p>
                                                    <p className="u-text-36">
                                                        30
                                                    </p>
                                                    <p className="u-text-16">
                                                        ???
                                                    </p>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {isOpenTaskEditModal.isOpen && (
                            <TaskEditModal
                                isOpen={isOpenTaskEditModal.isOpen}
                                closeHandler={() => {
                                    getTodaysTaskList({ setTodaysTaskList })
                                    setIsOpenTaskEditModal({
                                        task: {},
                                        isOpen: false,
                                    })
                                }}
                                task={isOpenTaskEditModal.task}
                            />
                        )}
                        {isOpenWorkbookregisterModal.isOpen && (
                            <WorkbookRegisterModal
                                isOpen={isOpenWorkbookregisterModal.isOpen}
                                closeHandler={() => {
                                    getTodaysTaskList({
                                        setTodaysTaskList,
                                    })
                                    getWorkbookListHandler()
                                    getResult({ setResult })
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
