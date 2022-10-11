import { useEffect, useState, useContext } from 'react'
import Modal from '../Modal'
import dateFormat from '@/functions/date-format'
import { useTask } from '@/hooks/task'
import Loading from '../Loading'
import { ToastContext } from '@/hooks/toast'

const TaskRegisterModal = ({
    isOpen,
    closeHandler,
    workbook_id = '',
    date = '',
    workbookData = {},
    workbookList,
}) => {
    const [state, setState] = useState({
        workbook_id,
        has_chapter: workbookData.has_chapter == 1 ? true : false,
        selected_date: dateFormat(new Date(date)),
        chapter_number: 1,
        question_number: 1,
        chapters: workbookData ? workbookData.chapters : [],
    })
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState(null)
    const [errors, setErrors] = useState([])
    const toastCtx = useContext(ToastContext)

    const { storeTask } = useTask()

    const [selectedChapter, setSelectedChapter] = useState(
        workbookData.chapters ? workbookData.chapters[0].questions : [],
    )

    const selectChapterHandler = chapterNum => {
        state?.chapters.map(chapter => {
            if (chapter.number == chapterNum) {
                setSelectedChapter(chapter.questions)
            }
        })
    }

    const handleInputChange = event => {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name
        if (name === 'workbook_id') {
            let wid = event.target.value
            let hasChap = false
            let chaps = []
            if (wid) {
                workbookList.map(workbook => {
                    if (workbook.id === Number(wid)) {
                        hasChap = workbook.has_chapter == 1 ? true : false
                        chaps = workbook.chapters
                    }
                })
                setSelectedChapter(chaps[0].questions)

                setState({
                    ...state,
                    has_chapter: hasChap,
                    workbook_id: Number(wid),
                    chapters: chaps,
                })
            } else {
                setSelectedChapter([])

                setState({
                    ...state,
                    workbook_id: '',
                    has_chapter: false,
                    chapter_number: 1,
                    question_number: 1,
                    chapters: [],
                })
            }
        } else if (name === 'chapter_number') {
            if (!isNaN(value)) {
                setState({
                    ...state,
                    chapter_number: Number(event.target.value),
                    question_number: 1,
                })
                selectChapterHandler(Number(event.target.value))
            }
        } else {
            setState({ ...state, [name]: value })
        }

        state
    }

    const submitHandler = async e => {
        setErrors([])
        await setLoading(true)

        e.preventDefault()
        //タスクを個別に登録する
        await storeTask(state, { setStatus, setErrors })
    }

    useEffect(() => {
        if (errors.length > 0) {
            setLoading(false)
        } else if (status) {
            setLoading(false)
            closeHandler()
            if (status === 200) {
                toastCtx.addToast(<p>新しいタスクを登録しました!</p>)
            } else {
                toastCtx.addToast(<p>タスクの登録に失敗しました</p>)
            }
        }
    }, [status, errors])

    const formatTitleLength = title => {
        const limitLength = 20
        const titleLen = title.length
        if (titleLen > limitLength) {
            return title.slice(0, limitLength) + '...'
        }
        return title
    }

    useEffect(() => {
        return () => {
            setLoading(false)
            setState({
                workbook_id,
                has_chapter: workbookData.has_chapter == 1 ? true : false,
                selected_date: dateFormat(new Date(date)),
                chapter_number: 1,
                question_number: 1,
                chapters: workbookData ? workbookData.chapters : [],
            })
            setSelectedChapter(
                workbookData.chapters ? workbookData.chapters[0].questions : [],
            )
            setStatus(null)
            setErrors([])
        }
    }, [])

    return (
        <Modal
            title="タスクを作成する"
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
                    <p className="col-md-3">教材名</p>
                    <div className="col-md-9">
                        {/* selectに変更する */}
                        <div className="c-select__wrapper">
                            <select
                                name="workbook_id"
                                id="workbook_id"
                                value={state.workbook_id}
                                onChange={handleInputChange}>
                                <option value="">選択してください</option>
                                {workbookList.length > 0 &&
                                    workbookList?.map(workbook => {
                                        return (
                                            <option
                                                value={workbook.id}
                                                key={workbook.id}>
                                                {formatTitleLength(
                                                    workbook.name,
                                                )}
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
                        {state.has_chapter == 1 && (
                            <div className="c-select__wrapper--sm">
                                <select
                                    name="chapter_number"
                                    id="chapter_number"
                                    value={state.chapter_number}
                                    onChange={handleInputChange}>
                                    {state.chapters?.map(chapter => {
                                        return (
                                            <option
                                                value={chapter.number}
                                                key={chapter.number}>
                                                {chapter.number}章
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                        )}
                        <div className="c-select__wrapper--sm">
                            <select
                                name="question_number"
                                id="question_number"
                                value={state.question_number}
                                onChange={handleInputChange}>
                                {selectedChapter.map(question => {
                                    return (
                                        <option
                                            value={question.number}
                                            key={question.number}>
                                            {question.number}番
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row c-text align-items-center my-3">
                    <p className="col-md-3">解く予定日</p>
                    <div className="col-md-9">
                        <input
                            type="date"
                            className="c-input"
                            name="selected_date"
                            value={state.selected_date}
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
                            {loading ? <Loading /> : '登録する'}
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
export default TaskRegisterModal
