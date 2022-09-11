import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/auth'
import GuestHeader from '@/components/Header/GuestHeader'
import AuthHeader from '@/components/Header/AuthHeader'
import WorkbookList from '@/components/LeftBox/WorkbookList'
import TaskCard from '@/components/TaskCard/default'
import TaskEditModal from '@/components/GlobalModal/TaskEditModal'
import TaskRegisterModal from '@/components/GlobalModal/TaskRegisterModal'
import WorkbookRegisterModal from '@/components/GlobalModal/WorkbookRegisterModal'

export default function MyPage() {
    const { user } = useAuth({ middleware: 'auth' })
    const [isOpenTaskEditModal, setIsOpenTaskEditModal] = useState({
        id: null,
        isOpen: false,
        date: null,
    })
    const [isOpenTaskRegisterModal, setIsOpenTaskRegisterModal] = useState({
        isOpen: false,
    })
    const [
        isOpenWorkbookregisterModal,
        setIsOpenWorkbookRegisterModal,
    ] = useState({
        isOpen: false,
    })
    const openTaskEditModalHandler = ({ id, date }) => {
        setIsOpenTaskEditModal({ id: id, isOpen: true, date: date })
    }
    const openTaskRegisterModalHandler = () => {
        setIsOpenTaskRegisterModal({ isOpen: true })
    }
    const openWorkbookRegisterModalHandler = () => {
        setIsOpenWorkbookRegisterModal({ isOpen: true })
    }
    useEffect(() => {
        return () => {
            setIsOpenTaskEditModal({ id: null, isOpen: false, date: null })
            setIsOpenTaskRegisterModal({ isOpen: false })
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
                                <div className="col-md-4 px-md-2 py-1">
                                    <button
                                        className="c-button w-100"
                                        onClick={() => {
                                            openTaskRegisterModalHandler()
                                        }}>
                                        個別に学習を記録する
                                    </button>
                                </div>
                            </div>
                            <div className="row py-3">
                                <WorkbookList />
                                <div className="col-md-9 pl-md-2 mb-2">
                                    <div className="c-box mb-3">
                                        <div className="c-box__title__wrapper">
                                            <p className="c-box__title">
                                                今日のタスク
                                            </p>
                                            <p className="c-box__subtitle">
                                                問題を解いたら、得点を4段階で評価しよう
                                            </p>
                                        </div>
                                        <div className="c-box__inner">
                                            <p className="c-title">昨日</p>
                                            <div className="row">
                                                <TaskCard
                                                    color="blue"
                                                    title="大学への数学"
                                                    id={1}
                                                    chapter={1}
                                                    number={2}
                                                    rate={0}
                                                    date="2022-09-01"
                                                    openModalHandler={() => {
                                                        openTaskEditModalHandler(
                                                            {
                                                                id: 1,
                                                                date:
                                                                    '2022-09-01',
                                                            },
                                                        )
                                                    }}
                                                />
                                            </div>
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
                                        date: null,
                                    })
                                }}
                                date={isOpenTaskEditModal.date}
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
