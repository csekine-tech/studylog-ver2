import { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'

const Calendar = ({
    openTaskSetRateModalOpenHandler,
    openTaskRegisterModalOpenHandler,
}) => {
    const eventClickHandler = e => {
        //task_idをモーダルに渡す
        openTaskSetRateModalOpenHandler(e.event._def.publicId)
    }
    const dateClickHandler = e => {
        //日付をモーダルに渡す
        openTaskRegisterModalOpenHandler(e.dateStr)
    }

    return (
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            locale="ja"
            eventClick={eventClickHandler}
            dateClick={dateClickHandler}
            eventOverlap={false}
            events={[
                {
                    id: 1,
                    title: '大学への数学 1-2',
                    start: '2022-09-01',
                    classNames: ['u-bg--red', 'u-border--red'],
                },
                {
                    id: 2,
                    title: '大学への数学 1-3',
                    start: '2022-09-01',
                    classNames: ['u-bg--red', 'u-border--red'],
                },
            ]}
        />
    )
}
export default Calendar
