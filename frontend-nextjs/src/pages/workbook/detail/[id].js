import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/auth'
import AuthHeader from '@/components/Header/AuthHeader'
import WorkbookList from '@/components/LeftBox/WorkbookList'
import { useRouter } from 'next/router'
import WorkbookEditModal from '@/components/GlobalModal/WorkbookEditModal'
import WorkbookRegisterModal from '@/components/GlobalModal/WorkbookRegisterModal'
import { useWorkbook } from '@/hooks/workbook'
const workbookDataDefault = {
    id: null,
    name: null,
    has_chapter: false,
    chapter_counts: null,
    subject_name: null,
    subject_id: null,
    chapters: { id: 1, question_counts: 0 },
    image_url: '',
}

const WorkbookDetail = () => {
    const [workbookData, setWorkbookData] = useState({})
    const { getWorkbookDetail, getWorkbookList } = useWorkbook()
    const [workbookList, setWorkbookList] = useState([])

    const { user } = useAuth({ middleware: 'auth' })
    const router = useRouter()
    const [id, setId] = useState(Number(router.query.id))

    const { destroyWorkbook } = useWorkbook()

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
            id: id,
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
            setIsOpenWorkbookRegisterModal({ isOpen: false })
            setIsOpenWorkbookEditModal({
                id: null,
                isOpen: false,
                workbookData: workbookDataDefault,
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
                                <div className="col-md-9 pl-md-2 mb-2">
                                    <div className="c-box mb-3">
                                        <div className="c-box__title__wrapper">
                                            <p className="c-box__title">
                                                教材情報
                                            </p>
                                        </div>
                                        <div className="c-box__inner">
                                            <div className="row">
                                                <div className="col-9 col-md-10">
                                                    <div className="row pt-2 c-text pr-2">
                                                        <p className="col-3">
                                                            教材名
                                                        </p>
                                                        <p className="col-9">
                                                            {workbookData?.name}
                                                        </p>
                                                    </div>
                                                    <div className="row pt-2 c-text">
                                                        <p className="col-3">
                                                            科目
                                                        </p>
                                                        <p className="col-9">
                                                            {
                                                                workbookData?.subject_name
                                                            }
                                                        </p>
                                                    </div>
                                                    <div className="row pt-2 c-text">
                                                        <p className="col-3">
                                                            構成
                                                        </p>
                                                        <p className="col-9">
                                                            {workbookData?.has_chapter
                                                                ? '章立て'
                                                                : '通し'}
                                                        </p>
                                                    </div>
                                                    {workbookData && (
                                                        <div className=" py-1">
                                                            {Array.from(
                                                                Array(
                                                                    workbookData?.chapter_counts,
                                                                ).keys(),
                                                            ).map(number => {
                                                                return (
                                                                    <div
                                                                        className="row pt-2 c-text"
                                                                        key={
                                                                            number
                                                                        }>
                                                                        {workbookData.has_chapter ===
                                                                            1 && (
                                                                            <p className="col-3">
                                                                                {number +
                                                                                    1}

                                                                                章
                                                                            </p>
                                                                        )}
                                                                        {workbookData.has_chapter !==
                                                                            1 && (
                                                                            <p className="col-3">
                                                                                全
                                                                            </p>
                                                                        )}
                                                                        <p className="col-9">
                                                                            {workbookData.chapters &&
                                                                                workbookData
                                                                                    .chapters[
                                                                                    number
                                                                                ]
                                                                                    .question_counts}
                                                                            問
                                                                        </p>
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="col-3 col-md-2">
                                                    <img
                                                        src={
                                                            workbookData.image_url
                                                                ? process.env
                                                                      .NEXT_PUBLIC_STORAGE_URL +
                                                                  '/' +
                                                                  workbookData.image_url
                                                                : '/img/img-dummy.png'
                                                        }
                                                        alt=""
                                                        className="w-100"
                                                    />
                                                </div>
                                            </div>
                                            {workbookData.id && (
                                                <div className="row pt-4">
                                                    <div className="col-md-6 pl-md-1 order-md-2 mb-1">
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
                                                    <div className="col-md-6 pr-md-1 order-md-1 mb-1">
                                                        <button
                                                            className="c-button--wide-white"
                                                            onClick={() => {
                                                                const result = window.confirm(
                                                                    `${workbookData?.name}に関連する全てのデータが削除されます。本当に削除してよろしいですか？`,
                                                                )
                                                                if (result) {
                                                                    destroyWorkbook(
                                                                        id,
                                                                    )
                                                                }
                                                            }}>
                                                            削除する
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <Link href={`/workbook/plan/${id}`}>
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
                                id={isOpenWorkbookEditModal.id}
                                workbookData={
                                    isOpenWorkbookEditModal.workbookData
                                }
                                closeHandler={() => {
                                    if (!Number.isNaN(id)) {
                                        getWorkbookDetail({
                                            id: id,
                                            setWorkbookData,
                                        })
                                    }
                                    getWorkbookList({ setWorkbookList })

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
export default WorkbookDetail
