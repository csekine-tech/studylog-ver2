import axios from '@/lib/axios'
import { useContext } from 'react'
import { useRouter } from 'next/router'

export const useTask = ({} = {}) => {
    const router = useRouter()

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const getTaskList = async ({ setTaskList }) => {
        await csrf()
        axios
            .get('/api/tasklist')
            .then(res => {
                setTaskList(res.data.taskList)
            })
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(Object.values(error.response.data.errors).flat())
            })
    }

    const getTodaysTaskList = async ({ setTodaysTaskList }) => {
        await csrf()
        axios
            .get('/api/today_tasklist')
            .then(res => {
                setTodaysTaskList(res.data.taskList)
            })
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(Object.values(error.response.data.errors).flat())
            })
    }

    const storeTask = async (task, { setStatus, setErrors }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/api/task/store', task)
            .then(response => setStatus(response.data.status))
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(Object.values(error.response.data.errors).flat())
            })
    }

    const setRate = async (
        request,
        { setStatus, setErrors, setReturnData },
    ) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/api/task/setrate', request)
            .then(response => {
                setStatus(response.data.status)
                setReturnData(response.data.returnData)
            })
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(Object.values(error.response.data.errors).flat())
            })
    }

    const updatePlanDate = async (request, { setStatus, setErrors }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('api/task/update_plan_date', request)
            .then(response => {
                setStatus(response.data.status)
            })
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(Object.values(error.response.data.errors).flat())
            })
    }

    const bulkAdd = async (request, { setStatus, setErrors }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('api/task/bulk-add', request)
            .then(response => {
                setStatus(response.data.status)
            })
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(Object.values(error.response.data.errors).flat())
            })
    }

    return {
        getTaskList,
        getTodaysTaskList,
        storeTask,
        setRate,
        updatePlanDate,
        bulkAdd,
    }
}
