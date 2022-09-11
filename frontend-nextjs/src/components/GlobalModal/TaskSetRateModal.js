import { useState } from 'react'
import Modal from '../Modal'
import Stars from '../Stars'
import dateFormat from '@/functions/date-format'

const TaskSetRateModal = ({ id, isOpen, closeHandler }) => {
    const [state, setState] = useState({
        doneAt: dateFormat(new Date()),
        rate: 0,
    })
    const handleInputChange = event => {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name

        setState({ ...state, [name]: value })
    }
    const handleRateChange = e => {
        setState({ ...state, rate: e })
    }
    const handleSubmit = () => {
        console.log(state)
    }
    return (
        <Modal
            title={`出来を評価する id:${id}`}
            subtitle="問題を解いたら、得点を4段階で評価しよう"
            isOpen={isOpen}
            closeHandler={closeHandler}>
            <form onSubmit={handleSubmit}>
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
                    <p className="col-md-3">解いた日</p>
                    {/* デフォルトで今日 */}
                    <div className="col-md-9">
                        <input
                            type="date"
                            name="doneAt"
                            id="doneAt"
                            value={state.doneAt}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="row c-text align-items-center my-3">
                    <p className="col-md-3">評価</p>
                    <div className="col-md-9">
                        <Stars
                            name="star"
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
export default TaskSetRateModal
