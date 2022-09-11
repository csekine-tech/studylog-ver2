import { useState } from 'react'
import Modal from '../Modal'
import dateFormat from '@/functions/date-format'
const workbooks = [
    { id: 1, name: '大学への数学' },
    { id: 2, name: '大学への数学2' },
]
const TaskRegisterModal = ({
    isOpen,
    closeHandler,
    workbookId = null,
    date = '',
}) => {
    const [state, setState] = useState({
        workbookName: '',
        workbookId: '',
        hasChapter: false,
        chapterNumber: '',
        questionNumber: '',
        selectedDate: dateFormat(new Date()),
    })

    const handleInputChange = event => {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name

        setState({ ...state, [name]: value })
    }

    const submitHandler = () => {
        //タスクを個別に登録する
        console.log(state)
    }

    return (
        <Modal
            title="タスクを作成する"
            isOpen={isOpen}
            closeHandler={closeHandler}>
            <form onSubmit={submitHandler}>
                <div className="row c-text align-items-center my-3">
                    <p className="col-md-3">教材名</p>
                    <div className="col-md-9">
                        {/* selectに変更する */}
                        <div className="c-select__wrapper">
                            <select
                                name="workbookName"
                                id="workbookName"
                                value={state.workbookName}
                                onChange={handleInputChange}>
                                <option value="">選択してください</option>
                                {workbooks.map(workbook => {
                                    return (
                                        <option
                                            value={workbook.id}
                                            key={workbook.id}>
                                            {workbook.name}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row  c-text align-items-center my-3">
                    <p className="col-md-3">問題番号</p>
                    <div className="col-md-9">
                        {state.hasChapter && (
                            <div className="c-select__wrapper--sm">
                                {(() => {
                                    let items = []
                                    for (let i = 1; i <= 30; i++) {
                                        items.push(
                                            <option value={i} key={i}>
                                                {i}章
                                            </option>,
                                        )
                                    }
                                    return (
                                        <select
                                            name="chapterNumber"
                                            id="chapterNumber"
                                            value={state.chapterNumber}
                                            onChange={handleInputChange}>
                                            {items}
                                        </select>
                                    )
                                })()}
                            </div>
                        )}
                        <div className="c-select__wrapper--sm">
                            {(() => {
                                let items = []
                                for (let i = 1; i <= 30; i++) {
                                    items.push(
                                        <option value={i} key={i}>
                                            {i}番
                                        </option>,
                                    )
                                }
                                return (
                                    <select
                                        name="questionNumber"
                                        id="questionNumber"
                                        value={state.questionNumber}
                                        onChange={handleInputChange}>
                                        {items}
                                    </select>
                                )
                            })()}
                        </div>
                    </div>
                </div>
                <div className="row c-text align-items-center my-3">
                    <p className="col-md-3">解く予定日</p>
                    <div className="col-md-9">
                        <input
                            type="date"
                            className="c-input"
                            name="selectedDate"
                            value={state.selectedDate}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-6 pl-md-1 order-md-2 mb-1">
                        <button className="c-button--wide" type="submit">
                            登録する
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
export default TaskRegisterModal
