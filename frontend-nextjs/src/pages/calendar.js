import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/auth'
import AuthHeader from '@/components/Header/AuthHeader'
import TaskCardMini from '@/components/TaskCard/mini'
import TaskEditModal from '@/components/GlobalModal/TaskEditModal'
import WorkbookRegisterModal from '@/components/GlobalModal/WorkbookRegisterModal'
import TaskRegisterModal from '@/components/GlobalModal/TaskRegisterModal'
import TaskSetRateModal from '@/components/GlobalModal/TaskSetRateModal'
import Calendar from '@/components/Calendar'
import { useTask } from '@/hooks/task'
import { useWorkbook } from '@/hooks/workbook'

export default function MyPage() {
    const { user } = useAuth({ middleware: 'auth' })

    const { getTaskList, getTodaysTaskList } = useTask()

    const [todaysTaskList, setTodaysTaskList] = useState([])
    const { getWorkbookList } = useWorkbook()
    const [workbookList, setWorkbookList] = useState([])
    const [taskList, setTaskList] = useState([])

    const [isOpenTaskEditModal, setIsOpenTaskEditModal] = useState({
        id: null,
        isOpen: false,
    })
    const [isOpenTaskRegisterModal, setIsOpenTaskRegisterModal] = useState({
        isOpen: false,
        date: '',
    })
    const [isOpenTaskSetRateModal, setIsOpenTaskSetRateModal] = useState({
        isOpen: false,
        task: {},
    })
    const [
        isOpenWorkbookregisterModal,
        setIsOpenWorkbookRegisterModal,
    ] = useState({
        isOpen: false,
    })
    const openTaskEditModalHandler = task => {
        setIsOpenTaskEditModal({ task: task, isOpen: true })
    }
    const openTaskRegisterModalHandler = dateStr => {
        setIsOpenTaskRegisterModal({ isOpen: true, date: dateStr })
    }
    const openTaskSetRateModalHandler = task => {
        setIsOpenTaskSetRateModal({ isOpen: true, task: task })
    }

    useEffect(() => {
        getTodaysTaskList({ setTodaysTaskList })
        getTaskList({ setTaskList })
        getWorkbookList({ setWorkbookList })

        return () => {
            setTodaysTaskList([])
            setTaskList([])
            setWorkbookList([])
            setIsOpenTaskEditModal({ task: {}, isOpen: false })
            setIsOpenTaskRegisterModal({ isOpen: false, date: '' })
            setIsOpenTaskSetRateModal({ isOpen: false, task: {} })
            setIsOpenWorkbookRegisterModal({ isOpen: false })
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
                            <div className="row py-3">
                                <div className="col-md-3 pr-md-2 mb-2 d-none d-md-block">
                                    <div className="c-box">
                                        <div className="c-box__title__wrapper">
                                            <p className="c-box__title">
                                                今日のタスク
                                            </p>
                                        </div>
                                        <div className="c-box__inner">
                                            {todaysTaskList?.map(task => {
                                                return (
                                                    <TaskCardMini
                                                        key={task.id}
                                                        color={
                                                            task.question
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
                                                            task.question
                                                                .chapter.number
                                                        }
                                                        number={
                                                            task.question.number
                                                        }
                                                        rate={0}
                                                        has_chapter={
                                                            task.question
                                                                .chapter
                                                                .workbook
                                                                .has_chapter
                                                        }
                                                        openModalHandler={() => {
                                                            openTaskEditModalHandler(
                                                                task,
                                                            )
                                                        }}
                                                        reload={() => {
                                                            getTaskList({
                                                                setTaskList,
                                                            })
                                                            getTodaysTaskList({
                                                                setTodaysTaskList,
                                                            })
                                                        }}
                                                        workbook_id={
                                                            task.question
                                                                .chapter
                                                                .workbook.id
                                                        }
                                                    />
                                                )
                                            })}
                                            {todaysTaskList.length === 0 && (
                                                <p className="c-text">
                                                    今日のタスクはありません。
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-9 pl-md-2 mb-2">
                                    <div className="c-box mb-3">
                                        <div className="c-box__title__wrapper">
                                            <p className="c-box__title">
                                                カレンダー
                                            </p>
                                        </div>
                                        <div className="c-box__inner">
                                            <Calendar
                                                openTaskSetRateModalOpenHandler={task => {
                                                    openTaskSetRateModalHandler(
                                                        task,
                                                    )
                                                }}
                                                openTaskRegisterModalOpenHandler={dateStr => {
                                                    if (
                                                        workbookList.length > 0
                                                    ) {
                                                        openTaskRegisterModalHandler(
                                                            dateStr,
                                                        )
                                                    }
                                                }}
                                                taskList={taskList}
                                                getTaskList={() => {
                                                    getTaskList({ setTaskList })
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {isOpenTaskEditModal.isOpen && (
                            <TaskEditModal
                                id={isOpenTaskEditModal.id}
                                isOpen={isOpenTaskEditModal.isOpen}
                                closeHandler={() => {
                                    getTodaysTaskList({ setTodaysTaskList })
                                    getTaskList({ setTaskList })
                                    setIsOpenTaskEditModal({
                                        task: {},
                                        isOpen: false,
                                    })
                                }}
                                task={isOpenTaskEditModal.task}
                            />
                        )}
                        {isOpenTaskRegisterModal.isOpen && (
                            <TaskRegisterModal
                                isOpen={isOpenTaskRegisterModal.isOpen}
                                closeHandler={() => {
                                    getTaskList({ setTaskList })
                                    getTodaysTaskList({ setTodaysTaskList })
                                    setIsOpenTaskRegisterModal({
                                        isOpen: false,
                                    })
                                }}
                                date={isOpenTaskRegisterModal.date}
                                workbookList={workbookList}
                            />
                        )}
                        {isOpenTaskSetRateModal.isOpen && (
                            <TaskSetRateModal
                                isOpen={isOpenTaskSetRateModal.isOpen}
                                closeHandler={() => {
                                    getTaskList({ setTaskList })
                                    getTodaysTaskList({ setTodaysTaskList })
                                    setIsOpenTaskSetRateModal({
                                        isOpen: false,
                                    })
                                }}
                                task={isOpenTaskSetRateModal.task}
                            />
                        )}
                        {isOpenWorkbookregisterModal.isOpen && (
                            <WorkbookRegisterModal
                                isOpen={isOpenWorkbookregisterModal.isOpen}
                                closeHandler={() => {
                                    getWorkbookList({ setWorkbookList })
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
