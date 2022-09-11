import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/auth'
import AuthHeader from '@/components/Header/AuthHeader'
import WorkbookList from '@/components/LeftBox/WorkbookList'
import { useRouter } from 'next/router'
import WorkbookEditModal from '@/components/GlobalModal/WorkbookEditModal'
import WorkbookRegisterModal from '@/components/GlobalModal/WorkbookRegisterModal'
const workbookDataDefault = {
    id: null,
    name: null,
    hasChapter: false,
    chapterCounts: null,
    subjectName: null,
    chapters: { id: 1, questionCounts: 0 },
}

const WorkbookDetail = () => {
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
    const [isOpenWorkbookEditModal, setIsOpenWorkbookEditModal] = useState({
        id: null,
        isOpen: false,
        workbookData: workbookDataDefault,
    })
    const [
        isOpenWorkbookregisterModal,
        setIsOpenWorkbookRegisterModal,
    ] = useState({
        isOpen: false,
    })
    const openWorkbookEditModalHandler = workbookData => {
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
                                <div className="col-md-9 pl-md-2 mb-2">
                                    <div className="c-box mb-3">
                                        <div className="c-box__title__wrapper">
                                            <p className="c-box__title">教材情報</p>
                                        </div>
                                        <div className="c-box__inner">
                                            <div className="row">
                                                <div className="col-10">
                                                    <div className="row pt-2 c-text">
                                                        <p className="col-3">
                                                            教材名
                                                        </p>
                                                        <p className="col-9">
                                                            {workbookData.name}
                                                        </p>
                                                    </div>
                                                    <div className="row pt-2 c-text">
                                                        <p className="col-3">
                                                            科目
                                                        </p>
                                                        <p className="col-9">
                                                            {
                                                                workbookData.subjectName
                                                            }
                                                        </p>
                                                    </div>
                                                    <div className="row pt-2 c-text">
                                                        <p className="col-3">
                                                            構成
                                                        </p>
                                                        <p className="col-9">
                                                            {workbookData.hasChapter
                                                                ? '章立て'
                                                                : '通し'}
                                                        </p>
                                                    </div>
                                                    {workbookData.hasChapter && (
                                                        <div className="pl-4 py-1">
                                                            {Array.from(
                                                                Array(
                                                                    workbookData.chapterCounts,
                                                                ).keys(),
                                                            ).map(number => {
                                                                return (
                                                                    <div
                                                                        className="row pt-2 c-text"
                                                                        key={
                                                                            number
                                                                        }>
                                                                        <p className="col-2">
                                                                            {number +
                                                                                1}
                                                                            章
                                                                        </p>
                                                                        <p className="col-10">
                                                                            {
                                                                                workbookData
                                                                                    .chapters[
                                                                                    number
                                                                                ]
                                                                                    .questionCounts
                                                                            }
                                                                            問
                                                                        </p>
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="col-2">
                                                    <img
                                                        src="/img/img-dummy.png"
                                                        alt=""
                                                        className="w-100"
                                                    />
                                                </div>
                                            </div>
                                            <div className="row pt-4">
                                                <div className="col-md-6 pr-md-2 mb-1">
                                                    <div
                                                        className="c-button--wide-white"
                                                        onClick={() => {
                                                            openWorkbookEditModalHandler(
                                                                workbookData,
                                                            )
                                                        }}>
                                                        編集する
                                                    </div>
                                                </div>
                                                <div className="col-md-6 pl-md-2 mb-1">
                                                    <div className="c-button--wide-white">
                                                        削除する
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <Link href="/workbook/plan/1">
                                            <button className="c-button--wide">
                                                この教材の予定を管理する
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {isOpenWorkbookEditModal.isOpen && (
                            <WorkbookEditModal
                                isOpen={isOpenWorkbookEditModal.isOpen}
                                id={1}
                                workbookData={
                                    isOpenWorkbookEditModal.workbookData
                                }
                                closeHandler={() => {
                                    setIsOpenWorkbookEditModal({
                                        id: null,
                                        isOpen: false,
                                        workbookData: workbookDataDefault,
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
export default WorkbookDetail
