import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/auth'
import GuestHeader from '@/components/Header/GuestHeader'
import AuthHeader from '@/components/Header/AuthHeader'
import TaskCardMini from '@/components/TaskCard/mini'
import TaskEditModal from '@/components/GlobalModal/TaskEditModal'
import WorkbookRegisterModal from '@/components/GlobalModal/WorkbookRegisterModal'
import TaskRegisterModal from '@/components/GlobalModal/TaskRegisterModal'
import TaskSetRateModal from '@/components/GlobalModal/TasksetRateModal'
import Calendar from '@/components/Calendar'

export default function MyPage() {
    const { user } = useAuth({ middleware: 'auth' })

    const [isOpenTaskEditModal, setIsOpenTaskEditModal] = useState({
        id: null,
        isOpen: false,
    })
    const [isOpenTaskRegisterModal, setIsOpenTaskRegisterModal] = useState({
        isOpen: false,
        date: null,
    })
    const [isOpenTaskSetRateModal, setIsOpenTaskSetRateModal] = useState({
        isOpen: false,
        id: null,
    })
    const [
        isOpenWorkbookregisterModal,
        setIsOpenWorkbookRegisterModal,
    ] = useState({
        isOpen: false,
    })
    const openTaskEditModalHandler = id => {
        setIsOpenTaskEditModal({ id: id, isOpen: true })
    }
    const openTaskRegisterModalHandler = dateStr => {
        setIsOpenTaskRegisterModal({ isOpen: true, date: dateStr })
    }
    const openTaskSetRateModalHandler = task_id => {
        setIsOpenTaskSetRateModal({ isOpen: true, id: task_id })
    }
    const openWorkbookRegisterModalHandler = () => {
        setIsOpenWorkbookRegisterModal({ isOpen: true })
    }
    useEffect(() => {
        return () => {
            setIsOpenTaskEditModal({ id: null, isOpen: false })
            setIsOpenTaskRegisterModal({ isOpen: false, date: null })
            setIsOpenTaskSetRateModal({ isOpen: false, id: null })
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
                                <div className="col-md-3 pr-md-2 mb-2">
                                    <div className="c-box">
                                        <div className="c-box__title__wrapper">
                                            <p className="c-box__title">
                                                今日のタスク
                                            </p>
                                        </div>
                                        <div className="c-box__inner">
                                            <TaskCardMini
                                                color="blue"
                                                title="大学への数学"
                                                id={1}
                                                chapter="1"
                                                number="2"
                                                rate={0}
                                                openModalHandler={() => {
                                                    openTaskEditModalHandler(1)
                                                }}
                                            />
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
                                                openTaskSetRateModalOpenHandler={task_id => {
                                                    openTaskSetRateModalHandler(
                                                        task_id,
                                                    )
                                                }}
                                                openTaskRegisterModalOpenHandler={dateStr => {
                                                    openTaskRegisterModalHandler(
                                                        dateStr,
                                                    )
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
                                    setIsOpenTaskEditModal({
                                        id: null,
                                        isOpen: false,
                                    })
                                }}
                            />
                        )}
                        {isOpenTaskRegisterModal.isOpen && (
                            <TaskRegisterModal
                                isOpen={isOpenTaskRegisterModal.isOpen}
                                closeHandler={() => {
                                    setIsOpenTaskRegisterModal({
                                        isOpen: false,
                                    })
                                }}
                                date={isOpenTaskRegisterModal.date}
                            />
                        )}
                        {isOpenTaskSetRateModal.isOpen && (
                            <TaskSetRateModal
                                isOpen={isOpenTaskSetRateModal.isOpen}
                                closeHandler={() => {
                                    setIsOpenTaskSetRateModal({
                                        isOpen: false,
                                    })
                                }}
                                id={isOpenTaskSetRateModal.id}
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
