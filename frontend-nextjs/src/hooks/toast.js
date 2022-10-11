import { useContext, useEffect, useState, useReducer } from 'react'
import { createPortal } from 'react-dom'
import { createContext } from 'react'
// import { ReactDOM } from 'react-dom'
import { Transition } from 'react-transition-group'
function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min) //The maximum is exclusive and the minimum is inclusive
}

const ToastContext = createContext({
    toasts: [],
    addToast: content => {},
    removeToast: id => {},
    hideToast: id => {},
})
const defaultToastState = {
    toasts: [],
}

const toastReducer = (state, action) => {
    if (action.type === 'ADD') {
        if (action.content) {
            const updatedToast = state.toasts.concat({
                id: action.id,
                content: action.content,
                visible: true,
            })

            return { toasts: updatedToast }
        }
    }
    if (action.type === 'REMOVE') {
        const updatedToast = state.toasts.filter(
            toast => toast.id !== action.id,
        )

        return { toasts: updatedToast }
    }
    if (action.type === 'HIDE') {
        const updatedToast = state.toasts.map(toast => {
            if (toast.id === action.id) {
                return { ...toast, visible: false }
            } else {
                return toast
            }
        })
        if (updatedToast === []) {
            action.setShowable(false)
        }
        return { toasts: updatedToast }
    }
    return defaultToastState
}

const ToastProvider = props => {
    const [showable, setShowable] = useState(false)

    const [toastState, dispatchToastAction] = useReducer(
        toastReducer,
        defaultToastState,
    )
    const addToastHandler = content => {
        setShowable(true)
        const id = getRandomInt(0, 100000)

        dispatchToastAction({
            type: 'ADD',
            content: content,
            id: id,
        })
    }
    const hideToastHandler = id => {
        dispatchToastAction({ type: 'HIDE', id: id, setShowable: setShowable })
    }
    const removeToastHandler = id => {
        dispatchToastAction({
            type: 'REMOVE',
            id: id,
            setShowable: setShowable,
        })
    }

    const toastContext = {
        toasts: toastState.toasts,
        addToast: addToastHandler,
        removeToast: removeToastHandler,
        hideToast: hideToastHandler,
    }
    return (
        <ToastContext.Provider value={toastContext}>
            {props.children}

            {typeof window === 'object' &&
                toastState.toasts.length > 0 &&
                createPortal(
                    <div className="c-toast__wrapper">
                        {toastState.toasts
                            .slice(0)
                            .reverse()
                            .map(toast => {
                                return (
                                    <Toast
                                        key={toast.id}
                                        id={toast.id}
                                        visible={+toast.visible}>
                                        {toast.content}
                                    </Toast>
                                )
                            })}
                    </div>,
                    document.getElementById('__next'),
                )}
        </ToastContext.Provider>
    )
}

export { ToastProvider, ToastContext }

const Toast = ({ children, id, visible }) => {
    const toastCtx = useContext(ToastContext)

    useEffect(() => {
        if (typeof id !== 'undefined') {
            setTimeout(() => {
                toastCtx.hideToast(id)
            }, 12000)
            setTimeout(() => {
                toastCtx.removeToast(id)
            }, 15000)
        }
    }, [id])
    return (
        <div className={`c-toast c-text ${visible ? '' : 'hidden'}`}>
            <span
                className="c-toast__close"
                onClick={() => {
                    toastCtx.removeToast(id)
                }}>
                <i className="fas fa-times"></i>
            </span>
            {children}
        </div>
    )
}
