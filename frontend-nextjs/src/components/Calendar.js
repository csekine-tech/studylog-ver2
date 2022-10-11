import { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'

const Calendar = ({
    openTaskSetRateModalOpenHandler,
    openTaskRegisterModalOpenHandler,
    taskList,
    getTaskList,
}) => {
    const searchTaskById = id => {
        let res = ''
        Object.keys(taskList).map(index => {
            taskList[index].map(task => {
                if (task.id === Number(id)) {
                    res = task
                }
            })
        })
        return res
    }
    const eventClickHandler = e => {
        //task_idをモーダルに渡す
        let task = searchTaskById(e.event._def.publicId)
        if (!task.done_at) {
            openTaskSetRateModalOpenHandler(task)
        }
    }
    const dateClickHandler = e => {
        //日付をモーダルに渡す
        openTaskRegisterModalOpenHandler(e.dateStr)
    }
    const [events, setEvents] = useState()

    useEffect(() => {
        setEvents(() => {
            let arr = []

            Object.keys(taskList).map(index => {
                let tasks = taskList[index]
                tasks.map(task => {
                    let obj = {}

                    if (task.planned_at) {
                        obj.id = task.id
                        obj.title =
                            task.question.chapter.workbook.has_chapter === 1
                                ? formatTitleLength(task.workbook_name) +
                                  ' ' +
                                  task.question.chapter.number +
                                  '-' +
                                  task.question.number
                                : task.workbook_name +
                                  ' ' +
                                  task.question.number
                        obj.start = task.planned_at
                        if (task.done_at) {
                            obj.className = [
                                `u-bg--gray`,
                                `u-border--gray`,
                                'done',
                            ]
                        } else {
                            obj.className = [
                                `u-bg--${task.question.chapter.workbook.subject.color_name}`,
                                `u-border--${task.question.chapter.workbook.subject.color_name}`,
                            ]
                        }
                    }
                    arr.push(obj)
                    obj = {}
                })
            })
            return arr
        })
    }, [taskList])

    const formatTitleLength = title => {
        const limitLength = 12
        const titleLen = title.length
        if (titleLen > limitLength) {
            return title.slice(0, limitLength) + '...'
        }
        return title
    }

    return (
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            locale="ja"
            eventClick={eventClickHandler}
            dateClick={dateClickHandler}
            eventOverlap={false}
            events={events}
            eventOrder="done_at"
        />
    )
}
export default Calendar
