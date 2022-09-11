import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/auth'
import AuthHeader from '@/components/Header/AuthHeader'
import WorkbookInfoListItem from '@/components/WorkbookInfo/ListItem'
import TaskRegisterModal from '@/components/GlobalModal/TaskRegisterModal'
import WorkbookRegisterModal from '@/components/GlobalModal/WorkbookRegisterModal'

export default function MyPage() {
    const { user } = useAuth({ middleware: 'auth' })

    const [isOpenTaskRegisterModal, setIsOpenTaskRegisterModal] = useState({
        workbookId: null,
        isOpen: false,
    })
    const [
        isOpenWorkbookregisterModal,
        setIsOpenWorkbookRegisterModal,
    ] = useState({
        isOpen: false,
    })
    const openTaskRegisterModalHandler = workbookId => {
        setIsOpenTaskRegisterModal({ isOpen: true, workbookId: workbookId })
    }
    const openWorkbookRegisterModalHandler = () => {
        setIsOpenWorkbookRegisterModal({ id: 1, isOpen: true })
    }
    useEffect(() => {
        return () => {
            setIsOpenWorkbookRegisterModal({ isOpen: false })
            setIsOpenTaskRegisterModal({ workbookId: null, isOpen: false })
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
                                <div className="col-md-8 pr-md-2 mb-2">
                                    <div className="c-box">
                                        <div className="c-box__title__wrapper">
                                            <p className="c-box__title">
                                                登録済みの教材
                                            </p>
                                        </div>
                                        <div className="c-box__inner">
                                            <WorkbookInfoListItem
                                                id={1}
                                                title="大学への数学"
                                                allCounts={115}
                                                finishedCounts={30}
                                                openModalHandler={() => {
                                                    openTaskRegisterModalHandler(
                                                        1,
                                                    )
                                                }}
                                            />
                                            <WorkbookInfoListItem
                                                id={2}
                                                title="大学への数学"
                                                allCounts={115}
                                                finishedCounts={30}
                                            />
                                            <WorkbookInfoListItem
                                                id={3}
                                                title="大学への数学"
                                                allCounts={115}
                                                finishedCounts={30}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 pl-md-2 mb-2">
                                    <div className="c-box mb-3">
                                        <div className="c-box__title__wrapper">
                                            <p className="c-box__title">
                                                教材の管理
                                            </p>
                                        </div>
                                        <div className="c-box__inner">
                                            <div className="d-flex justify-content-around align-items-center c-text">
                                                <div className="text-center u-text-bold">
                                                    <p className="u-text-16">
                                                        未完了
                                                    </p>
                                                    <p className="u-text-36">
                                                        104
                                                    </p>
                                                    <p className="u-text-16">
                                                        冊
                                                    </p>
                                                </div>
                                                <div className="text-center u-text-bold">
                                                    <p className="u-text-16">
                                                        完了
                                                    </p>
                                                    <p className="u-text-36">
                                                        205
                                                    </p>
                                                    <p className="u-text-16">
                                                        冊
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {isOpenTaskRegisterModal.isOpen && (
                            <TaskRegisterModal
                                isOpen={isOpenTaskRegisterModal.isOpen}
                                workbookId={isOpenTaskRegisterModal.workbookId}
                                closeHandler={() => {
                                    setIsOpenTaskRegisterModal({
                                        workbookId: null,
                                        isOpen: false,
                                    })
                                }}
                            />
                        )}
                        {isOpenWorkbookregisterModal.isOpen && (
                            <WorkbookRegisterModal
                                isOpen={isOpenWorkbookregisterModal.isOpen}
                                id={1}
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
