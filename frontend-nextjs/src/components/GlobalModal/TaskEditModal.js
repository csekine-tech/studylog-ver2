import { useEffect, useState, useContext } from 'react'
import Modal from '../Modal'
import { useTask } from '@/hooks/task'
import Loading from '../Loading'
import { ToastContext } from '@/hooks/toast'

const TaskEditModal = ({ isOpen, closeHandler, task = {} }) => {
    const { updatePlanDate } = useTask()
    const [state, setState] = useState({ id: task.id, date: task.planned_at })
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState(null)
    const [errors, setErrors] = useState([])
    const toastCtx = useContext(ToastContext)

    const handleInputChange = event => {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name

        setState({ ...state, [name]: value })
    }
    const submitHandler = async e => {
        setErrors([])
        await setLoading(true)
        e.preventDefault()
        //タスクの予定日を変更する
        await updatePlanDate(state, { setStatus, setErrors })
    }

    useEffect(() => {
        if (errors.length > 0) {
            setLoading(false)
        } else if (status) {
            setLoading(false)
            closeHandler()
            if (status === 200) {
                toastCtx.addToast(<p>タスクを編集しました!</p>)
            } else {
                toastCtx.addToast(<p>タスクの編集に失敗しました</p>)
            }
        }
    }, [status, errors])

    useEffect(() => {
        return () => {
            setLoading(false)
            setState({ id: task.id, date: task.planned_at })
            setStatus(null)
            setErrors([])
        }
    }, [])



    return (
        <Modal
            title="タスクの予定日を編集する"
            isOpen={isOpen}
            closeHandler={() => {
                loading ? '' : closeHandler()
            }}>
            <form onSubmit={submitHandler}>
                {errors?.map((error, index) => {
                    return (
                        <p key={index} className="c-text u-text--red">
                            {error}
                        </p>
                    )
                })}
                <div className="row c-text align-items-center my-3">
                    <p className="col-md-3">教材名</p>
                    <p className="col-md-9">{task.workbook_name}</p>
                </div>
                <div className="row c-text align-items-center my-3">
                    <p className="col-md-3">科目</p>
                    <p className="col-md-9">
                        {task.question.chapter.workbook.subject.name}
                    </p>
                </div>
                <div className="row  c-text align-items-center my-3">
                    <p className="col-md-3">問題番号</p>
                    <div className="col-md-9">
                        {task.question.chapter.workbook.has_chapter
                            ? task.question.chapter.number +
                              '章 ' +
                              task.question.number +
                              '番'
                            : task.question.number + '番'}
                    </div>
                </div>
                <div className="row c-text align-items-center my-3">
                    <p className="col-md-3">解く予定日</p>
                    <div className="col-md-9">
                        <input
                            type="date"
                            name="date"
                            id="date"
                            value={state.date}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-md-6 pl-md-1 order-md-2 mb-1">
                        <button
                            className="c-button--wide"
                            type="submit"
                            disabled={loading}>
                            {loading ? <Loading /> : '編集を完了する'}
                        </button>
                    </div>
                    <div className="col-md-6 pr-md-1 order-md-1 mb-1">
                        <button
                            className="c-button--wide"
                            onClick={closeHandler}
                            disabled={loading}>
                            キャンセルする
                        </button>
                    </div>
                </div>
            </form>
        </Modal>
    )
}
export default TaskEditModal
