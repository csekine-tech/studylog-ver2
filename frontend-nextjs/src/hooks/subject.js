import useSWR from 'swr'
import axios from '@/lib/axios'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { SubjectContext } from '@/store/subject-context'

export const useSubject = ({} = {}) => {
    const router = useRouter()
    const subjectCtx = useContext(SubjectContext)

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const getSubjectList = async () => {
        // await csrf()
        axios
            .get('/api/subjects')
            .then(res => {
                subjectCtx.setSubjectList(res.data.subjects)
            })
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(Object.values(error.response.data.errors).flat())
            })
    }
    return {
        getSubjectList,
    }
}
