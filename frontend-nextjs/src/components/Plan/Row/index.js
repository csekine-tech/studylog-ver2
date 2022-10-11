import Stars from '@/components/Stars'
import { useState, useEffect, useContext } from 'react'
import { useTask } from '@/hooks/task'
import dateFormat from '@/functions/date-format'
import { ToastContext } from '@/hooks/toast'

const PlanRow = ({
    number,
    is_finished,
    rate = 0,
    counts,
    planned_at = '',
    edit = true,
    isDone = false,
    has_chapter = false,
    chapter_number = '',
    taskId,
    qId,
    getTasks,
}) => {
    const { updatePlanDate } = useTask()
    const [date, setDate] = useState(planned_at)
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)
    const toastCtx = useContext(ToastContext)

    const onChange = e => {
        setErrors([])
        setDate(e.target.value)
        if (e.target.value && qId !== '') {
            if (taskId === '') {
                let request = {
                    date: dateFormat(e.target.value),
                    is_new: true,
                    question_id: qId,
                }
                updatePlanDate(request, { setStatus, setErrors })
                request = {}
            } else {
                let request = {
                    id: taskId,
                    date: dateFormat(e.target.value),
                    question_id: qId,
                }
                updatePlanDate(request, { setStatus, setErrors })
                request = {}
            }
        }
    }

    useEffect(() => {
        if (status) {
            getTasks()
            if (status === 200) {
                toastCtx.addToast(<p>予定日を編集しました！</p>)
            } else {
                toastCtx.addToast(<p>予定日の編集に失敗しました</p>)
            }
            setStatus(null)
        }
    }, [status])
    useEffect(() => {
        setDate(planned_at)
    }, [planned_at])

    // useEffect(() => {
    //     return () => {
    //         setStatus(null)
    //         setErrors([])
    //         setDate(planned_at)
    //     }
    // }, [])

    return (
        <tr>
            {has_chapter && <td>{chapter_number}</td>}
            <td className={is_finished ? 'is_finished' : ''}>{number}</td>
            <td>
                {is_finished ? (
                    '完了済み'
                ) : (
                    <input
                        type="date"
                        name="date"
                        id="date"
                        value={date}
                        onChange={onChange}
                    />
                )}
            </td>
            <td>{counts}</td>
            <td>
                {isDone ? (
                    <Stars
                        rate={rate}
                        edit={edit}
                        color2={'#F4CA42'}
                        color1={'#696969'}
                        // onChange={onChange}
                        initialRate={4}
                    />
                ) : (
                    '未実施'
                )}
            </td>
        </tr>
    )
}
export default PlanRow
