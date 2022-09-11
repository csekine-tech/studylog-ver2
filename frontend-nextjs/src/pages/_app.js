// import 'bootstrap/dist/css/bootstrap.min.css';
import '@fullcalendar/common/main.css' // @fullcalendar/react imports @fullcalendar/common
import '@fullcalendar/daygrid/main.css' // @fullcalendar/timegrid imports @fullcalendar/daygrid
// import '@fullcalendar/timegrid/main.css' // @fullcalendar/timegrid is a direct import
import './../scss/style.scss'

const App = ({ Component, pageProps }) => <Component {...pageProps} />

export default App
