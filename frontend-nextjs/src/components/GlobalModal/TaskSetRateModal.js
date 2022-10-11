import { useEffect, useState, useContext } from 'react'
import Modal from '../Modal'
import Stars from '../Stars'
import dateFormat from '@/functions/date-format'
import { useTask } from '@/hooks/task'
import Loading from '../Loading'
import dateFormatText from '@/functions/date-format-text'
import { ToastContext } from '@/hooks/toast'

const TaskSetRateModal = ({ isOpen, closeHandler, task = {} }) => {
    const [state, setState] = useState({
        id: task.id,
        done_at: dateFormat(new Date()),
        rate: 0,
    })
    const { setRate } = useTask()
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState(null)
    const [errors, setErrors] = useState([])
    const toastCtx = useContext(ToastContext)
    const [returnData, setReturnData] = useState({})

    const handleInputChange = event => {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name
        if (name === 'done_at') {
            setState({ ...state, [name]: dateFormat(value) })
        } else if (name === 'rate') {
            if (!isNaN(value)) {
                setState({ ...state, [name]: Number(value) })
            }
        } else {
            setState({ ...state, [name]: value })
        }
    }
    const handleRateChange = e => {
        setState({ ...state, rate: e })
    }
    const handleSubmit = async e => {
        setLoading(true)
        e.preventDefault()
        await setRate(state, { setStatus, setErrors, setReturnData })
    }
    useEffect(() => {
        if (errors.length > 0) {
            setLoading(false)
        } else if (status) {
            setLoading(false)
        }
    }, [status, errors])

    useEffect(async () => {
        if (status === 200 && returnData !== {}) {
            await setLoading(false)
            closeHandler()
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
                closeHandler()

                toastCtx.addToast(<p>満点評価です！お疲れ様でした！</p>)
            }
        } else if (status === null) {
            await setLoading(false)
        } else {
            toastCtx.addToast('タスクの登録に失敗しました')
            await setLoading(false)
        }
        await setLoading(false)
    }, [returnData])

    useEffect(() => {
        return () => {
            setLoading(false)
            setState({
                id: task.id,
                done_at: dateFormat(new Date()),
                rate: 0,
            })
            setStatus(null)
            setErrors([])
            setReturnData({})
        }
    }, [])

    return (
        <Modal
            title={'出来を評価する'}
            subtitle="問題を解いたら、得点を4段階で評価しよう"
            isOpen={isOpen}
            closeHandler={() => {
                loading ? '' : closeHandler()
            }}>
            <form onSubmit={handleSubmit}>
                {errors.map((error, index) => {
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
                    <p className="col-md-3">解いた日</p>
                    {/* デフォルトで今日 */}
                    <div className="col-md-9">
                        <input
                            type="date"
                            name="done_at"
                            id="done_at"
                            value={state.done_at}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="row c-text align-items-center my-3">
                    <p className="col-md-3">評価</p>
                    <div className="col-md-9">
                        <Stars
                            name="rate"
                            rate={state.rate}
                            edit={true}
                            color2={'#F4CA42'}
                            color1={'#696969'}
                            initialRate={4}
                            onChange={handleRateChange}
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
export default TaskSetRateModal
