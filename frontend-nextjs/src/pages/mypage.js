import Head from 'next/head'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import GuestHeader from '@/components/Header/GuestHeader'
import AuthHeader from '@/components/Header/AuthHeader'
import WorkbookList from '@/components/LeftBox/WorkbookList'
import TaskCard from '@/components/TaskCard/default'
import TaskEditModal from '@/components/GlobalModal/TaskEditModal'
import WorkbookRegisterModal from '@/components/GlobalModal/WorkbookRegisterModal'

export default function MyPage() {
    const { user } = useAuth({ middleware: 'auth' })

    const [isOpenTaskEditModal, setIsOpenTaskEditModal] = useState({
        id: null,
        isOpen: false,
    })
    const [
        isOpenWorkbookregisterModal,
        setIsOpenWorkbookRegisterModal,
    ] = useState({
        id: null,
        isOpen: false,
    })
    const openTaskEditModalHandler = id => {
        setIsOpenTaskEditModal({ id: id, isOpen: true })
    }
    const openWorkbookRegisterModalHandler = () => {
        setIsOpenWorkbookRegisterModal({ isOpen: true })
    }
    useEffect(() => {
        return () => {
            setIsOpenTaskEditModal({ id: null, isOpen: false })
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
                                <WorkbookList />
                                <div className="col-md-9 pl-md-2">
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
                                            <div className="row">
                                                <TaskCard
                                                    color="blue"
                                                    title="大学への数学"
                                                    id={1}
                                                    chapter={1}
                                                    number={2}
                                                    rate={0}
                                                    openModalHandler={() => {
                                                        openTaskEditModalHandler(
                                                            1,
                                                        )
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="c-box">
                                        <div className="c-box__title__wrapper">
                                            <p className="c-box__title">
                                                学習の成果
                                            </p>
                                            <p className="c-box__subtitle">
                                                全ての問題をマスターしよう
                                            </p>
                                        </div>
                                        <div className="c-box__inner">
                                            <div className="d-flex justify-content-around align-items-center c-text">
                                                <div className="text-center u-text-bold">
                                                    <p className="u-text-16">
                                                        残り
                                                    </p>
                                                    <p className="u-text-36">104</p>
                                                    <p className="u-text-16">問</p>
                                                </div>
                                                <div className="text-center u-text-bold">
                                                    <p className="u-text-16">
                                                        完了
                                                    </p>
                                                    <p className="u-text-36">205</p>
                                                    <p className="u-text-16">問</p>
                                                </div>
                                                <div className="text-center u-text-bold">
                                                    <p className="u-text-16">
                                                        今週
                                                    </p>
                                                    <p className="u-text-36">30</p>
                                                    <p className="u-text-16">問</p>
                                                </div>
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
