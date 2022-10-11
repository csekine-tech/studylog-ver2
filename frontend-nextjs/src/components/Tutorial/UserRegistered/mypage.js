import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import 'driver.js/dist/driver.min.js'

const DriverComponent = () => {
    const driver = new Driver({
        opacity: 0,
    })
    driver.highlight({
        element: '#tutorial',
        popover: {
            title: '教材登録',
            description: '教材を登録しよう',
            position: 'right',
        },
        // showButtons: false,
    })
    const activeElement = driver.getHighlightedElement()

    if (activeElement) {
        activeElement.node.addEventListener('click', event => {
            driver.moveNext()
        })
    }

    return <></>
}

export default DriverComponent
