import '@fullcalendar/common/main.css' // @fullcalendar/react imports @fullcalendar/common
import '@fullcalendar/daygrid/main.css' // @fullcalendar/timegrid imports @fullcalendar/daygrid
import './../scss/style.scss'
import { SubjectProvider } from '@/store/subject-context'
import { ToastProvider } from '@/hooks/toast'

const App = ({ Component, pageProps }) => {
    return (
        <div id="app">
            <SubjectProvider>
                <ToastProvider>
                    <Component {...pageProps} />
                </ToastProvider>
            </SubjectProvider>
        </div>
    )
}

export default App
