import React, { useContext, useState } from 'react'

const  GlobalModalContext = React.createContext({
    todoList: [],
    todoDateRelations: [],
    setTodoList: todoList => {},
    setTodoDateRelations: todoDateRelations => {},
})

const GlobalModalProvider = ({ children }) => {
    const [todoList, setTodoList] = useState([])
    const [todoDateRelations, setTodoDateRelations] = useState([])
    return (
        <GlobalModalContext.Provider
            value={{
                todoList,
                setTodoList,
                todoDateRelations,
                setTodoDateRelations,
            }}>
            {children}
        </GlobalModalContext.Provider>
    )
}


export { GlobalModalProvider,  GlobalModalContext}