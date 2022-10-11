import { useState, useEffect, useContext } from 'react'
import Modal from '../Modal'
import { SubjectContext } from '@/store/subject-context'
import { useWorkbook } from '@/hooks/workbook'
import Loading from '../Loading'
import { ToastContext } from '@/hooks/toast'

const WorkbookEditModal = ({ id, isOpen, closeHandler, workbookData }) => {
    const [state, setState] = useState({
        workbook_id: workbookData.id,
        workbook_name: workbookData.name,
        subject_id: workbookData.subject_id,
        subject_name: workbookData.subject_name,
        has_chapter: Boolean(workbookData.has_chapter),
        chapter_counts: workbookData.chapter_counts,
        chapters: workbookData.chapters,
        image: workbookData.image_url,
    })
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState(null)
    const [errors, setErrors] = useState([])
    const [image, setImage] = useState('')
    const [preview, setPreview] = useState(
        workbookData.image_url
            ? process.env.NEXT_PUBLIC_STORAGE_URL + '/' + workbookData.image_url
            : '',
    )
    const subjectCtx = useContext(SubjectContext)
    const [subjectList, setSubjectList] = useState(subjectCtx.subjectList)
    const { updateWorkbook } = useWorkbook()
    const toastCtx = useContext(ToastContext)
    const [imageChanged, setImageChanged] = useState(false)

    const handleInputChange = event => {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name

        //問題数を変更したとき
        if (name.match(/question_counts/)) {
            if (!isNaN(value) || value == '') {
                //章立ての時
                if (state.has_chapter) {
                    let i = name.split('-')[1]
                    let chaps = []
                    state.chapters.map(chap => {
                        if (chap.number == i) {
                            chaps.push({
                                number: Number(i),
                                question_counts:
                                    value === '' ? '' : Number(value),
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
                    setState({
                        ...state,
                        chapters: [
                            {
                                number: 1,
                                question_counts:
                                    value === '' ? '' : Number(value),
                            },
                        ],
                    })
                }
            } else {
                setErrors(['問題数は数値を入力してください'])
            }
        } else if (name == 'subject_id') {
            setState({ ...state, [name]: Number(event.target.value) })
        } else if (name == 'image') {
            if (event.target.files.length > 0) {
                setImage(event.target.files[0])
                setPreview(window.URL.createObjectURL(event.target.files[0]))
            } else {
                setImage('')
                setPreview('')
            }
            setImageChanged(true)
        } else {
            setState({ ...state, [name]: value })
        }
    }
    const selectChangeHandler = e => {
        e.preventDefault()
        setState({
            ...state,
            has_chapter: e.target.value === 'true',
            chapter_counts: 1,
            chapters: [state.chapters[0]],
        })
    }

    const chapter_countsChangeHandler = e => {
        let arr = []
        const prevchapter_counts = state.chapter_counts
        const newchapter_counts = Number(e.target.value)
        if (prevchapter_counts < newchapter_counts) {
            Array.from(Array(newchapter_counts).keys()).map(number => {
                if (number + 1 <= prevchapter_counts) {
                    arr.push(state.chapters[number])
                } else {
                    arr.push({ number: number + 1, question_counts: '' })
                }
            })
        } else {
            Array.from(Array(prevchapter_counts).keys()).map(number => {
                if (number + 1 <= newchapter_counts) {
                    arr.push(state.chapters[number])
                }
            })
        }
        setState({
            ...state,
            chapter_counts: Number(e.target.value),
            chapters: arr,
        })
    }
    const inputquestion_countsJsx = state.has_chapter
        ? Array.from(Array(state.chapter_counts).keys()).map(
              (number, index) => {
                  return (
                      <div
                          className="row c-text align-items-center my-2"
                          key={index}>
                          <p className="col-3">{number + 1}章</p>
                          <p className="col-9">
                              <input
                                  type="text"
                                  name={`question_counts-${number + 1}`}
                                  className="c-input--sm"
                                  onChange={handleInputChange}
                                  value={
                                      state.chapters.find(
                                          chap => chap.number === number + 1,
                                      ).question_counts
                                  }
                              />
                              <span className="ml-1">問</span>
                          </p>
                      </div>
                  )
              },
          )
        : null

    const submitHandler = async e => {
        setErrors([])
        setLoading(true)
        e.preventDefault()
        const formData = new FormData()

        if (image !== '' && imageChanged === true) {
            formData.append('image', image)
        }
        await updateWorkbook({ setErrors, setStatus }, state, formData)
    }
    useEffect(() => {
        if (errors.length > 0) {
            setLoading(false)
        } else if (status) {
            setLoading(false)
            closeHandler()
            setImageChanged(false)
            if (status === 200) {
                toastCtx.addToast(<p>問題集を編集しました!</p>)
            } else {
                toastCtx.addToast(<p>問題集の編集に失敗しました</p>)
            }
        }
    }, [status, errors])

    useEffect(() => {
        return () => {
            setImage('')
            setPreview('')
            setLoading(false)
            setState({
                workbook_name: '',
                has_chapter: false,
                chapter_counts: 1,
                chapters: [{ number: 1, question_counts: '' }],
                subject_id: '',
            })
            setStatus(null)
            setErrors([])
        }
    }, [])

    return (
        <Modal
            title="教材情報を編集する"
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
                <div className="row">
                    <div className="col-md-9">
                        <div className="row c-text align-items-center my-2">
                            <p className="col-md-3">教材名</p>
                            <p className="col-md-9">
                                <input
                                    name="workbook_name"
                                    id="workbook_name"
                                    type="text"
                                    className="c-input"
                                    value={state.workbook_name}
                                    onChange={handleInputChange}
                                />
                            </p>
                        </div>
                        <div className="row c-text align-items-center my-2">
                            <p className="col-md-3">科目</p>
                            <div className="col-md-9">
                                <div className="c-select__wrapper">
                                    <select
                                        name="subject_id"
                                        id="subject_id"
                                        onChange={handleInputChange}
                                        value={state.subject_id}>
                                        <option value="">
                                            選択してください
                                        </option>
                                        {subjectList?.map(subject => {
                                            return (
                                                <option
                                                    value={subject.id}
                                                    key={subject.id}>
                                                    {subject.name}
                                                </option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row  c-text align-items-center my-2">
                            <p className="col-md-3">構成</p>
                            <div className="col-d-9">
                                <div className="c-select__wrapper">
                                    <select
                                        name="has_chapter"
                                        id="has_chapter"
                                        onChange={selectChangeHandler}
                                        value={state.has_chapter}>
                                        <option value={true}>章立て</option>
                                        <option value={false}>通し</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        {!state.has_chapter && (
                            <>
                                <div className="row c-text align-items-center my-2">
                                    <p className="col-3">問題数</p>
                                    <p className="col-9">
                                        <input
                                            type="text"
                                            name="question_counts"
                                            className="c-input--sm"
                                            value={
                                                state.chapters[0]
                                                    .question_counts
                                            }
                                            onChange={handleInputChange}
                                        />
                                        <span className="ml-1">問</span>
                                    </p>
                                </div>
                            </>
                        )}
                        {state.has_chapter && (
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
                                                        name="chapter_counts"
                                                        id="chapter_counts"
                                                        onChange={
                                                            chapter_countsChangeHandler
                                                        }
                                                        value={
                                                            state.chapter_counts
                                                        }>
                                                        {items}
                                                    </select>
                                                )
                                            })()}
                                        </div>
                                    </div>
                                </div>
                                <div className="pl-md-4 py-md-1">
                                    {inputquestion_countsJsx}
                                </div>
                            </>
                        )}
                    </div>
                    <div className="col-md-3">
                        <img
                            src={
                                preview === '' ? '/img/img-dummy.png' : preview
                            }
                            alt=""
                            className="w-100"
                        />
                        <div className="my-1">
                            <input
                                name="image"
                                onChange={handleInputChange}
                                type="file"
                                className=""
                            />
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-6 pl-md-1 order-md-2 mb-1">
                        <button className="c-button--wide" type="submit">
                            {loading ? <Loading /> : '編集を完了する'}
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
