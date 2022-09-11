import { useEffect, useState } from 'react'
import Modal from '../Modal'
import dateFormat from '@/functions/date-format'
const weekOfDays = ['月', '火', '水', '木', '金', '土', '日']

const TaskBulkAddModal = ({ workbookId, isOpen, closeHandler }) => {
    const [state, setState] = useState({
        startDate: dateFormat(new Date()),
        dayCounts: '',
        offDay: {
            0: false,
            1: false,
            2: false,
            3: false,
            4: false,
            5: false,
            6: false,
        },
        isOverride: false,
    })

    const handleInputChange = event => {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name
        if (name === 'offDay') {
            let i = target.id.slice(-1)
            setState({
                ...state,
                offDay: {
                    ...state.offDay,
                    [i]: value,
                },
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
                    htmlFor={`offDay-${i}`}
                    className="align-items-center d-flex"
                    key={i}>
                    <input
                        type="checkbox"
                        name="offDay"
                        id={`offDay-${i}`}
                        value={state.offDay ? state.offDay.i : false}
                        onChange={handleInputChange}
                        checked={state.offDay ? state.offDay.i : false}
                        className="mr-1"
                    />
                    {day}
                </label>
            </div>
        )
    })

    return (
        <Modal
            title="予定日をまとめて入力する"
            isOpen={isOpen}
            closeHandler={closeHandler}>
            <form>
                <div className="row c-text align-items-center my-3">
                    <p className="col-md-4">いつから</p>
                    <p className="col-md-8">
                        <input
                            type="date"
                            name="startDate"
                            id="startDate"
                            className="c-input"
                            value={state.startDate}
                            onChange={handleInputChange}
                        />
                    </p>
                </div>
                <div className="row c-text align-items-center my-3">
                    <p className="col-md-4">1日に解く問題数</p>
                    <p className="col-md-8">
                        <input
                            type="text"
                            name="dayCounts"
                            id="dayCounts"
                            className="c-input--sm"
                            value={state.dayCounts}
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
                            htmlFor="isOverride"
                            className="align-items-center d-flex">
                            <input
                                type="checkbox"
                                name="isOverride"
                                id="isOverride"
                                className="c-input--sm mr-1"
                                onChange={handleInputChange}
                                checked={state.isOverride}
                            />
                            すでにある予定を上書きする
                        </label>
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
                            onClick={() => {
                                setIsOpenBulkaddModal(false)
                            }}>
                            キャンセルする
                        </button>
                    </div>
                </div>
            </form>
        </Modal>
    )
}
export default TaskBulkAddModal
