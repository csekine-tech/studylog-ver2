import { useState } from 'react'
import Modal from '../Modal'
const TaskEditModal = ({ id, isOpen, closeHandler, date = '' }) => {
    const [state, setState] = useState({ date: date })
    const handleInputChange = event => {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name

        setState({ ...state, [name]: value })
    }
    const submitHandler = () => {
        //タスクの予定日を変更する
    }
    return (
        <Modal
            title="タスクの予定日を編集する"
            isOpen={isOpen}
            closeHandler={closeHandler}>
            <form onSubmit={submitHandler}>
                <div className="row c-text align-items-center my-3">
                    <p className="col-md-3">教材名</p>
                    <p className="col-md-9">大学への数学</p>
                </div>
                <div className="row c-text align-items-center my-3">
                    <p className="col-md-3">科目</p>
                    <p className="col-md-9">数学</p>
                </div>
                <div className="row  c-text align-items-center my-3">
                    <p className="col-md-3">問題番号</p>
                    <div className="col-md-9">1章　2番</div>
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
                        <button className="c-button--wide" type="submit">
                            編集を完了する
                        </button>
                    </div>
                    <div className="col-md-6 pr-md-1 order-md-1 mb-1">
                        <button
                            className="c-button--wide"
                            onClick={closeHandler}>
                            キャンセルする
                        </button>
                    </div>
                </div>
            </form>
        </Modal>
    )
}
export default TaskEditModal
