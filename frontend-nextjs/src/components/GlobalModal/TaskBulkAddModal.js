import { useEffect, useState, useContext } from 'react'
import Modal from '../Modal'
import dateFormat from '@/functions/date-format'
const weekOfDays = ['日', '月', '火', '水', '木', '金', '土']
import { useTask } from '@/hooks/task'
import Loading from '../Loading'
import { ToastContext } from '@/hooks/toast'

const TaskBulkAddModal = ({ workbook_id, isOpen, closeHandler }) => {
    const [state, setState] = useState({
        start_date: dateFormat(new Date()),
        day_counts: '',
        off_day: [false, false, false, false, false, false, false],
        is_override: false,
        id: workbook_id,
    })
    const [status, setStatus] = useState(null)
    const [errors, setErrors] = useState([])
    const toastCtx = useContext(ToastContext)

    const { bulkAdd } = useTask()
    const [loading, setLoading] = useState(false)

    const handleInputChange = event => {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name
        if (name === 'off_day') {
            let i = target.id.slice(-1)
            let tmpoff_day = []
            tmpoff_day = state.off_day
            if (value === true) {
                tmpoff_day[i] = true
            } else {
                tmpoff_day[i] = false
            }
            setState({
                ...state,
                off_day: tmpoff_day,
            })
        } else {
            setState({ ...state, [name]: value })
        }
    }

    const r = weekOfDays.map((day, index) => {
        let i = index
        return (
            <div className="pr-2 mb-1" key={index}>
                <label
                    htmlFor={`off_day-${i}`}
                    className="align-items-center d-flex"
                    key={i}>
                    <input
                        type="checkbox"
                        name="off_day"
                        id={`off_day-${i}`}
                        value={state.off_day ? state.off_day.i : false}
                        onChange={handleInputChange}
                        checked={state.off_day ? state.off_day.i : false}
                        className="mr-1"
                    />
                    {day}
                </label>
            </div>
        )
    })

    const submitHandler = async e => {
        setErrors([])
        await setLoading(true)
        e.preventDefault()
        await bulkAdd(state, { setStatus, setErrors })
    }

    useEffect(() => {
        if (errors.length > 0) {
            setLoading(false)
        } else if (status) {
            setLoading(false)
            closeHandler()
            if (status === 200) {
                toastCtx.addToast(<p>タスクを一括登録しました！</p>)
            } else {
                toastCtx.addToast(<p>タスクの一括登録に失敗しました</p>)
            }
        }
    }, [status, errors])

    useEffect(() => {
        return () => {
            setLoading(false)
            setState({
                start_date: dateFormat(new Date()),
                day_counts: '',
                off_day: [false, false, false, false, false, false, false],
                is_override: false,
                id: workbook_id,
            })
            setStatus(null)
            setErrors([])
        }
    }, [])

    return (
        <Modal
            title="予定日をまとめて入力する"
            isOpen={isOpen}
            closeHandler={() => {
                loading ? '' : closeHandler()
            }}>
            <form onSubmit={submitHandler}>
                {errors.map((error, index) => {
                    return (
                        <p key={index} className="c-text u-text--red">
                            {error}
                        </p>
                    )
                })}
                <div className="row c-text align-items-center my-3">
                    <p className="col-md-4">いつから</p>
                    <p className="col-md-8">
                        <input
                            type="date"
                            name="start_date"
                            id="start_date"
                            className="c-input"
                            value={state.start_date}
                            onChange={handleInputChange}
                        />
                    </p>
                </div>
                <div className="row c-text align-items-center my-3">
                    <p className="col-md-4">1日に解く問題数</p>
                    <p className="col-md-8">
                        <input
                            type="text"
                            name="day_counts"
                            id="day_counts"
                            className="c-input--sm"
                            value={state.day_counts}
                            onChange={handleInputChange}
                        />
                    </p>
                </div>
                <div className="row  c-text align-items-center my-3">
                    <p className="col-md-4">お休みする曜日</p>
                    <div className="col-md-8 d-md-flex">{r}</div>
                </div>
                <div className="row c-text my-3">
                    <div>
                        <label
                            htmlFor="is_override"
                            className="align-items-center d-flex">
                            <input
                                type="checkbox"
                                name="is_override"
                                id="is_override"
                                className="c-input--sm mr-1"
                                onChange={handleInputChange}
                                checked={state.is_override}
                            />
                            すでにある予定を上書きする
                        </label>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-6 pl-md-1 order-md-2 mb-1">
                        <button
                            className="c-button--wide"
                            type="submit"
                            disabled={loading}>
                            {loading ? <Loading /> : '登録する'}
                        </button>
                    </div>
                    <div className="col-md-6 pr-md-1 order-md-1 mb-1">
                        <button
                            className="c-button--wide"
                            onClick={() => {
                                closeHandler()
                            }}
                            disabled={loading}>
                            キャンセルする
                        </button>
                    </div>
                </div>
            </form>
        </Modal>
    )
}
export default TaskBulkAddModal
