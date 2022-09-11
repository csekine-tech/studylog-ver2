import { useState, useEffect } from 'react'
import Modal from '../Modal'

const WorkbookEditModal = ({ id, isOpen, closeHandler, workbookData }) => {
    const [workbookName, setWorkbookName] = useState(workbookData.name)
    const [subjectName, setSubjectName] = useState(workbookData.subjectName)
    const [hasChapter, sethasChapter] = useState(workbookData.hasChapter)
    const [chapterCounts, setChapterCounts] = useState(
        workbookData.chapterCounts,
    )
    const [chapters, setChapters] = useState(workbookData.chapters)

    const [state, setState] = useState({
        workbookName: workbookData.name,
        subjectName: workbookData.subjectName,
        hasChapter: workbookData.hasChapter,
        chapterCounts: workbookData.chapterCounts,
        chapters: workbookData.chapters,
    })

    const handleInputChange = event => {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name
        //問題数を変更したとき
        if (name.match(/questionCounts/)) {
            //章立ての時
            if (state.hasChapter) {
                console.log('a')
                let i = name.split('-')[1]
                let chaps = []
                state.chapters.map(chap => {
                    if (chap.number == i) {
                        chaps.push({
                            number: Number(i),
                            questionCounts: Number(event.target.value),
                        })
                    } else {
                        chaps.push(chap)
                    }
                })
                setState({
                    ...state,
                    chapters: chaps,
                })
            } else {
                console.log('tooshi')

                setState({
                    ...state,
                    chapters: [
                        {
                            number: 1,
                            questionCounts: Number(event.target.value),
                        },
                    ],
                })
            }
        } else {
            setState({ ...state, [name]: value })
        }
        console.log(state)
    }
    const selectChangeHandler = e => {
        e.preventDefault()
        setState({
            ...state,
            hasChapter: e.target.value === 'true',
            chapterCounts: 1,
        })
        if (e.target.value === 'true') {
            setState({
                ...state,
                hasChapter: e.target.value === 'true',
                chapterCounts: 1,
            })
        } else {
            setState({
                ...state,
                hasChapter: e.target.value === 'true',
                chapterCounts: 1,
            })
        }
    }

    const chapterCountsChangeHandler = e => {
        let arr = []
        const prevChapterCounts = state.chapterCounts
        const newChapterCounts = Number(e.target.value)
        if (prevChapterCounts < newChapterCounts) {
            Array.from(Array(newChapterCounts).keys()).map(number => {
                if (number + 1 <= prevChapterCounts) {
                    arr.push(state.chapters[number])
                } else {
                    arr.push({ number: number + 1, questionCounts: 0 })
                }
            })
        } else {
            Array.from(Array(prevChapterCounts).keys()).map(number => {
                if (number + 1 <= newChapterCounts) {
                    arr.push(state.chapters[number])
                }
            })
        }
        setState({
            ...state,
            chapterCounts: Number(e.target.value),
            chapters: arr,
        })
    }
    const inputQuestionCountsJsx = state.hasChapter
        ? Array.from(Array(state.chapterCounts).keys()).map((number, index) => {
              return (
                  <div
                      className="row c-text align-items-center my-2"
                      key={index}>
                      <p className="col-3">{number + 1}章</p>
                      <p className="col-9">
                          <input
                              type="text"
                              name={`questionCounts-${number + 1}`}
                              className="c-input--sm"
                              onChange={handleInputChange}
                              value={
                                  state.chapters.find(
                                      chap => chap.number === number + 1,
                                  ).questionCounts
                              }
                          />
                          <span className="ml-1">問</span>
                      </p>
                  </div>
              )
          })
        : null
    const submitHandler = () => {}

    return (
        <Modal
            title="教材情報を編集する"
            isOpen={isOpen}
            closeHandler={closeHandler}>
            <form onSubmit={submitHandler}>
                <div className="row">
                    <div className="col-md-9">
                        <div className="row c-text align-items-center my-2">
                            <p className="col-md-3">教材名</p>
                            <p className="col-md-9">
                                <input
                                    name="workbookName"
                                    id="workbookName"
                                    type="text"
                                    className="c-input"
                                    value={state.workbookName}
                                    onChange={handleInputChange}
                                />
                            </p>
                        </div>
                        <div className="row c-text align-items-center my-2">
                            <p className="col-md-3">科目</p>
                            <div className="col-md-9">
                                <div className="c-select__wrapper">
                                    <select
                                        name="subjectName"
                                        id="subjectName"
                                        onChange={handleInputChange}
                                        value={state.subjectName}>
                                        <option value="">
                                            選択してください
                                        </option>
                                        <option value="数学">数学</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row  c-text align-items-center my-2">
                            <p className="col-md-3">構成</p>
                            <div className="col-d-9">
                                <div className="c-select__wrapper">
                                    <select
                                        name="hasChapter"
                                        id="hasChapter"
                                        onChange={selectChangeHandler}
                                        value={state.hasChapter}>
                                        <option value={true}>章立て</option>
                                        <option value={false}>通し</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        {!state.hasChapter && (
                            <>
                                <div className="row c-text align-items-center my-2">
                                    <p className="col-3">問題数</p>
                                    <p className="col-9">
                                        <input
                                            type="text"
                                            name="questionCounts"
                                            className="c-input--sm"
                                            value={
                                                state.chapters.find(
                                                    chap => chap.number === 1,
                                                ).questionCounts
                                            }
                                            onChange={handleInputChange}
                                        />
                                        <span className="ml-1">問</span>
                                    </p>
                                </div>
                            </>
                        )}
                        {state.hasChapter && (
                            <>
                                <div className="row  c-text align-items-center my-2">
                                    <p className="col-md-3">章の数</p>
                                    <div className="col-md-9">
                                        <div className="c-select__wrapper">
                                            {(() => {
                                                let items = []
                                                for (let i = 1; i <= 30; i++) {
                                                    items.push(
                                                        <option
                                                            value={i}
                                                            key={i}>
                                                            {i}章
                                                        </option>,
                                                    )
                                                }
                                                return (
                                                    <select
                                                        name="chapterCounts"
                                                        id="chapterCounts"
                                                        onChange={
                                                            chapterCountsChangeHandler
                                                        }
                                                        value={
                                                            state.chapterCounts
                                                        }>
                                                        {items}
                                                    </select>
                                                )
                                            })()}
                                        </div>
                                    </div>
                                </div>
                                <div className="pl-md-4 py-md-1">
                                    {inputQuestionCountsJsx}
                                </div>
                            </>
                        )}
                    </div>
                    <div className="col-md-3">
                        <img
                            src="/img/img-dummy.png"
                            alt=""
                            className="w-100"
                        />
                        <div className="my-1">
                            <input type="file" className="" />
                        </div>
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
export default WorkbookEditModal
