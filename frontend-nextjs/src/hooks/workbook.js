import axios from '@/lib/axios'
import { useContext } from 'react'
import { useRouter } from 'next/router'
import { useState } from 'react'

export const useWorkbook = ({} = {}) => {
    const router = useRouter()

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const getWorkbookList = async ({ setWorkbookList }) => {
        await csrf()
        axios
            .get('/api/workbooklist')
            .then(res => {
                setWorkbookList(res.data.workbookList)
            })
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(Object.values(error.response.data.errors).flat())
            })
    }

    const getWorkbookDetail = async ({ id, setWorkbookData }) => {
        await csrf()

        axios
            .get(`/api/workbook/${id}`)
            .then(res => {
                setWorkbookData(res.data.workbook)
            })
            .catch(error => {
                if (error.response.status === 404) router.push('/404')

                if (error.response.status !== 422) throw error

                setErrors(Object.values(error.response.data.errors).flat())
            })
    }

    const storeWorkbook = async ({ setStatus, setErrors }, state, formData) => {
        await csrf()
        setErrors([])
        setStatus(null)

        async function f() {
            let result
            try {
                result = await axios.post('/api/workbook/store', state)
            } catch (error) {
                if (error.response.status !== 422) throw error
                setErrors(Object.values(error.response.data.errors).flat())
                return
            }
            if (formData.has('image')) {
                let imageResult
                try {
                    await formData.append('id', result.data.id)
                    imageResult = await axios.post(
                        '/api/workbook/store-img',
                        formData,
                    )
                } catch (error) {
                    if (error.response.status !== 422) throw error
                    setErrors(Object.values(error.response.data.errors).flat())
                    return
                }
                setStatus(imageResult.data.status)
            } else {
                await setStatus(result.data.status)
            }
        }

        f()
    }

    const destroyWorkbook = async id => {
        await csrf()
        axios
            .post(`/api/workbook/destroy/${id}`)
            .then(res => {
                res.data
            })
            .then(() => {
                router.push('/workbook')
            })
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(Object.values(error.response.data.errors).flat())
            })
    }

    const updateWorkbook = async (
        { setStatus, setErrors },
        state,
        formData,
    ) => {
        await csrf()
        setErrors([])
        setStatus(null)
        async function f() {
            let result
            try {
                result = await axios.post(
                    `/api/workbook/update/${state.workbook_id}`,
                    state,
                )
            } catch (error) {
                if (error.response.status !== 422) throw error
                setErrors(Object.values(error.response.data.errors).flat())
                return
            }
            if (formData.has('image')) {
                let imageResult
                try {
                    await formData.append('id', state.workbook_id)
                    imageResult = await axios.post(
                        '/api/workbook/store-img',
                        formData,
                    )
                } catch (error) {
                    if (error.response.status !== 422) throw error
                    setErrors(Object.values(error.response.data.errors).flat())
                    return
                }
                setStatus(imageResult.data.status)
            } else {
                await setStatus(result.data.status)
            }
        }

        f()
    }

    return {
        getWorkbookList,
        getWorkbookDetail,
        storeWorkbook,
        destroyWorkbook,
        updateWorkbook,
    }
}
