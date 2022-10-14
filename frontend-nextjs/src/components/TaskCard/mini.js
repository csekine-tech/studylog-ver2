import { useState, useEffect, useContext } from 'react'
import Stars from '../Stars'
import { useTask } from '@/hooks/task'
import dateFormat from '@/functions/date-format'
import dateFormatText from '@/functions/date-format-text'
import { ToastContext } from '@/hooks/toast'
import Link from 'next/link'

const TaskCardMini = ({
    color = 'gray',
    rate,
    id,
    title,
    chapter = null,
    number,
    openModalHandler,
    date = null,
    has_chapter,
    reload,
    workbook_id,
}) => {
    const { setRate } = useTask()
    const [status, setStatus] = useState(null)
    const [errors, setErrors] = useState([])
    const toastCtx = useContext(ToastContext)
    const [returnData, setReturnData] = useState({})
    const [loading, setLoading] = useState(false)
    const [starRating, setStarRating] = useState(rate)

    const onChange = e => {
        setStarRating(e)

        setErrors([])
        setRate(
            { id: id, rate: e, done_at: dateFormat(new Date()) },
            { setStatus, setErrors, setReturnData },
        )
    }

    useEffect(async () => {
        if (status === 200 && returnData !== {}) {
            await setLoading(false)
            reload()
            if (returnData.rate !== 4) {
                toastCtx.addToast(
                    <p>
                        次回のタスクを
                        <span className="u-text-bold u-text-18">
                            {dateFormatText(returnData['nextDate'])}
                        </span>
                        に設定しました
                    </p>,
                )
            } else {
                await setLoading(false)

                toastCtx.addToast(<p>満点評価です！お疲れ様でした！</p>)
            }
        } else if (status === null) {
        } else {
            toastCtx.addToast('タスクの登録に失敗しました')
        }
        return () => {
            setReturnData({})
        }
    }, [returnData])

    const formatTitleLength = title => {
        const limitLength = 15
        const titleLen = title.length
        if (titleLen > limitLength) {
            return title.slice(0, limitLength) + '...'
        }
        return title
    }

    useEffect(() => {
        return () => {
            setStatus(null)
            setErrors([])
            setLoading(false)
            setStarRating(rate)
            setReturnData({})
        }
    }, [])

    return (
        <div className="mb-2">
            <div className={`c-card--sm u-bg--${color}`}>
                <div className="">
                    <Link href={`/workbook/plan/${workbook_id}`}>
                        <div className="mb-1 c-card__link">
                            <p className="c-card__title">
                                {formatTitleLength(title)}
                            </p>
                            {has_chapter === 1 && (
                                <p className="c-card__subtitle">
                                    {chapter && chapter + '章 '}
                                    <span className="u-text-18">{number}</span>
                                    番
                                </p>
                            )}
                            {has_chapter === 0 && (
                                <p className="c-card__subtitle">
                                    <span className="u-text-18">{number}</span>
                                    番
                                </p>
                            )}
                        </div>
                    </Link>
                    <div className="d-flex justify-content-between">
                        <div className="c-star__wrapper">
                            <Stars
                                rate={starRating}
                                edit={true}
                                color2={'#F4CA42'}
                                color1={'#696969'}
                                onChange={onChange}
                                initialRate={4}
                            />
                        </div>
                        <div
                            className="u-text--white u-text-12 pl-1 align-self-center"
                            onClick={openModalHandler}>
                            <i className="fas fa-edit"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TaskCardMini
