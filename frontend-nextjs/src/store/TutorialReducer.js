import { useContext, useEffect, useState, useReducer } from 'react'
import { createContext } from 'react'

const TutorialContext = createContext({
    isTutorialing: true,
    tutorialStep: 1,
    nextStep: () => {},
    prevStep: () => {},
    open: () => {},
    close: () => {},
})

const defaultTutorialState = {
    isTutorialing: true,
    tutorialStep: 1,
}

const tutorialReducer = (state, action) => {
    if (action.type === 'NEXT') {
        if (state.tutorialStep !== 7) {
            return {
                isTutorialing: false,
                tutorialStep: state.tutorialStep + 1,
            }
        }
    }
    if (action.type === 'PREV') {
        if (state.tutorialStep !== 1) {
            return {
                isTutorialing: false,
                tutorialStep: state.tutorialStep - 1,
            }
        }
    }
    if (action.type === 'OPEN') {
        return { isTutorialing: true, tutorialStep: 1 }
    }
    if (action.type === 'CLOSE') {
        return { isTutorialing: false, tutorialStep: 1 }
    }
    return defaultTutorialState
}

const TutorialProvider = props => {
    const [tutorialState, dispatchTutorialAction] = useReducer(
        tutorialReducer,
        defaultTutorialState,
    )
    const nextHandler = () => {
        dispatchTutorialAction({
            type: 'NEXT',
            num: tutorialState.tutorialStep,
        })
    }
    const prevHandler = () => {
        dispatchTutorialAction({
            type: 'PREV',
            num: tutorialState.tutorialStep,
        })
    }
    const openHandler = () => {
        dispatchTutorialAction({
            type: 'OPEN',
        })
    }
    const closeHandler = () => {
        dispatchTutorialAction({
            type: 'CLOSE',
        })
    }

    const tutorialContext = {
        isTutorialing: tutorialState.isTutorialing,
        tutorialStep: tutorialState.tutorialStep,
        nextStep: nextHandler,
        prevStep: prevHandler,
        open: openHandler,
        close: closeHandler,
    }
    return (
        <TutorialContext.Provider value={tutorialContext}>
            {props.children}
        </TutorialContext.Provider>
    )
}

export { TutorialProvider, TutorialContext }
