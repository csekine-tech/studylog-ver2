import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/auth'
import AuthHeader from '@/components/Header/AuthHeader'
import WorkbookInfoListItem from '@/components/WorkbookInfo/ListItem'
import TaskRegisterModal from '@/components/GlobalModal/TaskRegisterModal'
import WorkbookRegisterModal from '@/components/GlobalModal/WorkbookRegisterModal'
import { useWorkbook } from '@/hooks/workbook'
import { useResult } from '@/hooks/result'

export default function MyPage() {
    const { user } = useAuth({ middleware: 'auth' })
    const [workbookList, setWorkbookList] = useState([])
    const { getWorkbookList } = useWorkbook()
    const [result, setResult] = useState()
    const { getResult } = useResult()
    const [filteringMode, setFilteringMode] = useState(1)

    const [isOpenTaskRegisterModal, setIsOpenTaskRegisterModal] = useState({
        workbook_id: '',
        isOpen: false,
    })
    const [
        isOpenWorkbookregisterModal,
        setIsOpenWorkbookRegisterModal,
    ] = useState({
        isOpen: false,
    })
    const openTaskRegisterModalHandler = workbook_id => {
        let wData = {}
        Object.keys(workbookList).map(index => {
            if (workbookList[index].id === workbook_id) {
                wData = workbookList[index]
            }
        })
        setIsOpenTaskRegisterModal({
            isOpen: true,
            workbook_id: workbook_id,
            workbookData: wData,
        })
    }
    const openWorkbookRegisterModalHandler = () => {
        setIsOpenWorkbookRegisterModal({ isOpen: true })
    }
    const filter = () => {}

    useEffect(() => {
        getWorkbookList({ setWorkbookList })
        getResult({ setResult })
        return () => {
            setWorkbookList([])
            setResult()
            setFilteringMode(1)
            setIsOpenTaskRegisterModal({ workbook_id: '', isOpen: false })
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
                                {/* <Link href="/task">
                                    <div className="col-md-4 px-md-2 py-1">
                                        <div className="c-button">
                                            学習を記録する
                                        </div>
                                    </div>
                                </Link> */}
                            </div>
                            <div className="row py-3">
                                <div className="col-md-8 pr-md-2 mb-2">
                                    <div className="c-box">
                                        <div className="c-box__title__wrapper">
                                            <p className="c-box__title">
                                                登録済みの教材
                                            </p>
                                            <p className="c-box__subtitle link">
                                                <span
                                                    onClick={() => {
                                                        setFilteringMode(1)
                                                    }}
                                                    className={
                                                        filteringMode == 1
                                                            ? 'u-text--black'
                                                            : ''
                                                    }>
                                                    全て表示　
                                                </span>
                                                <span
                                                    onClick={() => {
                                                        setFilteringMode(2)
                                                    }}
                                                    className={
                                                        filteringMode == 2
                                                            ? 'u-text--black'
                                                            : ''
                                                    }>
                                                    未完了のみ表示　
                                                </span>
                                                <span
                                                    onClick={() => {
                                                        setFilteringMode(3)
                                                    }}
                                                    className={
                                                        filteringMode == 3
                                                            ? 'u-text--black'
                                                            : ''
                                                    }>
                                                    完了済みのみ表示
                                                </span>
                                            </p>
                                        </div>
                                        <div className="c-box__inner">
                                            {workbookList?.map(workbook => {
                                                if (
                                                    filteringMode === 1 ||
                                                    (filteringMode == 2 &&
                                                        workbook.is_finished ==
                                                            0) ||
                                                    (filteringMode == 3 &&
                                                        workbook.is_finished ==
                                                            1)
                                                ) {
                                                    return (
                                                        <WorkbookInfoListItem
                                                            id={workbook.id}
                                                            key={workbook.id}
                                                            title={
                                                                workbook.name
                                                            }
                                                            subject_name={
                                                                workbook.subject_name
                                                            }
                                                            allCounts={
                                                                workbook.question_counts
                                                            }
                                                            finishedCounts={
                                                                workbook.finished_question_counts
                                                            }
                                                            openModalHandler={() => {
                                                                openTaskRegisterModalHandler(
                                                                    workbook.id,
                                                                )
                                                            }}
                                                            imgUrl={
                                                                workbook.image_url
                                                                    ? process
                                                                          .env
                                                                          .NEXT_PUBLIC_STORAGE_URL +
                                                                      '/' +
                                                                      workbook.image_url
                                                                    : '/img/img-dummy.png'
                                                            }
                                                        />
                                                    )
                                                }
                                            })}
                                            {workbookList?.length === 0 && (
                                                <p className="c-text">
                                                    教材は登録されていません。
                                                </p>
                                            )}
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
                                                        {result
                                                            ? result.workbook_counts -
                                                              result.finished_workbook_counts
                                                            : 0}
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
                                                        {result
                                                            ? result.finished_workbook_counts
                                                            : 0}
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
                                workbook_id={
                                    isOpenTaskRegisterModal.workbook_id
                                }
                                closeHandler={() => {
                                    setIsOpenTaskRegisterModal({
                                        workbook_id: null,
                                        isOpen: false,
                                        workbookData: {},
                                    })
                                }}
                                workbookData={
                                    isOpenTaskRegisterModal.workbookData
                                }
                                workbookList={workbookList}
                            />
                        )}
                        {isOpenWorkbookregisterModal.isOpen && (
                            <WorkbookRegisterModal
                                isOpen={isOpenWorkbookregisterModal.isOpen}
                                closeHandler={() => {
                                    getWorkbookList({ setWorkbookList })
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
