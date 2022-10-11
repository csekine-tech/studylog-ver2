import React, { useContext, useState } from 'react'

const SubjectContext = React.createContext({
    subjectList: [],
    setSubjectList: subjectList => {},
})

const SubjectProvider = ({ children }) => {
    const [subjectList, setSubjectList] = useState([])
    return (
        <SubjectContext.Provider
            value={{
                subjectList,
                setSubjectList,
            }}>
            {children}
        </SubjectContext.Provider>
    )
}

export { SubjectProvider, SubjectContext }
