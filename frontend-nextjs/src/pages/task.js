import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/auth'
import AuthHeader from '@/components/Header/AuthHeader'
import TaskCard from '@/components/TaskCard/defaultThree'
import TaskEditModal from '@/components/GlobalModal/TaskEditModal'
import TaskRegisterModal from '@/components/GlobalModal/TaskRegisterModal'
import WorkbookRegisterModal from '@/components/GlobalModal/WorkbookRegisterModal'
import { useTask } from '@/hooks/task'
import { useWorkbook } from '@/hooks/workbook'
import dateFormatText from '@/functions/date-format-text'

export default function MyPage() {
    const { user } = useAuth({ middleware: 'auth' })

    const { getTaskList } = useTask()
    const [taskList, setTaskList] = useState([])
    const { getWorkbookList } = useWorkbook()
    const [workbookList, setWorkbookList] = useState([])
    const [isOpenTaskEditModal, setIsOpenTaskEditModal] = useState({
        task: {},
        isOpen: false,
    })
    const [isOpenTaskRegisterModal, setIsOpenTaskRegisterModal] = useState({
        workbook_id: null,
        isOpen: false,
        workbookData: {},
    })
    const [
        isOpenWorkbookregisterModal,
        setIsOpenWorkbookRegisterModal,
    ] = useState({
        isOpen: false,
    })
    const openTaskEditModalHandler = task => {
        setIsOpenTaskEditModal({
            task: task,
            isOpen: true,
        })
    }
    const openTaskRegisterModalHandler = () => {
        setIsOpenTaskRegisterModal({
            isOpen: true,
        })
    }

    const getWorkbookListHandler = () => {
        getWorkbookList({ setWorkbookList })
    }
    useEffect(() => {
        getTaskList({ setTaskList })
        getWorkbookList({ setWorkbookList })
        return () => {
            setTaskList([])
            setWorkbookList([])
            setIsOpenTaskEditModal({ task: {}, isOpen: false })
            setIsOpenTaskRegisterModal({
                workbook_id: null,
                isOpen: false,
                workbookData: {},
            })
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
                            <div className="row">
                                {workbookList.length > 0 && (
                                    <div className="col-md-4 py-1">
                                        <button
                                            className="c-button w-100"
                                            onClick={() => {
                                                openTaskRegisterModalHandler()
                                            }}>
                                            個別にタスクを作成する
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="row py-3">
                                {/* <WorkbookList
                                    workbookList={workbookList}
                                    getWorkbookList={getWorkbookListHandler}
                                /> */}
                                <div className="col-md-12 mb-2">
                                    <div className="c-box mb-3">
                                        <div className="c-box__title__wrapper">
                                            <p className="c-box__title">
                                                タスク一覧
                                            </p>
                                            <p className="c-box__subtitle">
                                                問題を解いたら、得点を4段階で評価しよう
                                            </p>
                                        </div>
                                        <div className="c-box__inner">
                                            {Object.keys(taskList).map(
                                                index => {
                                                    let taskrow =
                                                        taskList[index]
                                                    let donecount = 0
                                                    let inner = taskrow.map(
                                                        task => {
                                                            if (!task.done_at) {
                                                                donecount++
                                                                return (
                                                                    <TaskCard
                                                                        key={
                                                                            task.id
                                                                        }
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
                                                                        id={
                                                                            task.id
                                                                        }
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
                                                                            getTaskList(
                                                                                {
                                                                                    setTaskList,
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
                                                                    />
                                                                )
                                                            }
                                                        },
                                                    )
                                                    if (donecount > 0) {
                                                        return (
                                                            <div key={index}>
                                                                <p className="c-title">
                                                                    {dateFormatText(
                                                                        index,
                                                                    )}
                                                                </p>
                                                                <div className="row">
                                                                    {inner}
                                                                </div>
                                                            </div>
                                                        )
                                                    } else {
                                                        return
                                                    }
                                                },
                                            )}
                                            {taskList.length === 0 && (
                                                <p className="c-text">
                                                    タスクは登録されていません
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {isOpenTaskEditModal.isOpen && (
                            <TaskEditModal
                                isOpen={isOpenTaskEditModal.isOpen}
                                closeHandler={() => {
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
                                    setIsOpenTaskRegisterModal({
                                        workbook_id: null,
                                        isOpen: false,
                                        workbookData: {},
                                    })
                                }}
                                workbookList={workbookList}
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
