import { useEffect, useState } from 'react'
import Link from 'next/link'
import subjectList from '@/store/subjectList'
import { useWorkbook } from '@/hooks/workbook'
import { useRouter } from 'next/router'

const WorkbookList = ({ workbookList, getWorkbookList, id,className }) => {
    const [list, setList] = useState([])
    const router = useRouter()
    const path = router.pathname
    const splitPath = path.split('/')
    const [pageTitle, setPageTitle] = useState('')

    useEffect(() => {
        if (splitPath.length > 2) {
            setPageTitle(splitPath[2])
        }
    })
    const workbookListGroupBySubject = () => {
        let arr = []
        subjectList.forEach(subject => {
            let workbooks = []
            workbookList?.forEach(workbook => {
                if (workbook.subject_id === subject.id) {
                    workbooks.push(workbook)
                }
            })
            arr.push({
                subject_name: subject.name,
                subject_id: subject.id,
                workbooks: workbooks,
            })
        })
        setList(arr)
        return
    }
    useEffect(() => {
        getWorkbookList()
    }, [])
    useEffect(() => {
        workbookListGroupBySubject()
    }, [workbookList])

    useEffect(() => {
        return () => {
            setList([])
            setPageTitle('')
        }
    }, [])

    return (
        <div className={`col-md-3 pr-md-2 mb-2 ${className}`}>
            <div className="c-box" id={id}>
                <div className="c-box__title__wrapper">
                    <p className="c-box__title">登録済みの教材</p>
                </div>
                <div className="c-box__inner">
                    {list?.map(group => {
                        if (group.workbooks.length > 0) {
                            return (
                                <div
                                    className="c-list__wrapper py-2"
                                    key={group.subject_id}>
                                    <p className="c-list__title">
                                        {group.subject_name}
                                    </p>
                                    <ul className="c-list">
                                        {group.workbooks.map(workbook => {
                                            return (
                                                <Link
                                                    href={
                                                        pageTitle === 'plan'
                                                            ? `/workbook/plan/${workbook.id}`
                                                            : `/workbook/detail/${workbook.id}`
                                                    }
                                                    key={workbook.id}>
                                                    <li className="c-list__item">
                                                        <a
                                                            href=""
                                                            className="c-link">
                                                            {workbook.is_finished===0 ? workbook.name:workbook.name+'(完了済み)'}
                                                        </a>
                                                    </li>
                                                </Link>
                                            )
                                        })}
                                    </ul>
                                </div>
                            )
                        } else {
                            return
                        }
                    })}
                    {workbookList.length === 0 && (
                        <p className="c-text">教材は登録されていません。</p>
                    )}
                </div>
            </div>
        </div>
    )
}
export default WorkbookList
