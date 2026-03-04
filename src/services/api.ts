import axios from 'axios'
import type {
    ContHumedadPayload,
    ContHumedadSaveResponse,
    ContHumedadEnsayoDetail,
    ContHumedadEnsayoSummary,
} from '@/types'

const API_URL = import.meta.env.VITE_API_URL || 'https://api.geofal.com.pe'

const api = axios.create({
    baseURL: API_URL,
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            window.dispatchEvent(new CustomEvent('session-expired'))
        }
        return Promise.reject(error)
    },
)

export async function saveContHumedadEnsayo(
    payload: ContHumedadPayload,
    ensayoId?: number,
): Promise<ContHumedadSaveResponse> {
    const { data } = await api.post<ContHumedadSaveResponse>('/api/cont-humedad/excel', payload, {
        params: {
            download: false,
            ensayo_id: ensayoId,
        },
    })
    return data
}

export async function saveAndDownloadContHumedadExcel(
    payload: ContHumedadPayload,
    ensayoId?: number,
): Promise<{ blob: Blob; ensayoId?: number }> {
    const response = await api.post('/api/cont-humedad/excel', payload, {
        params: {
            download: true,
            ensayo_id: ensayoId,
        },
        responseType: 'blob',
    })

    const ensayoIdHeader = response.headers['x-cont-humedad-id']
    const parsedId = Number(ensayoIdHeader)
    return {
        blob: response.data,
        ensayoId: Number.isFinite(parsedId) ? parsedId : undefined,
    }
}

export async function listContHumedadEnsayos(limit = 100): Promise<ContHumedadEnsayoSummary[]> {
    const { data } = await api.get<ContHumedadEnsayoSummary[]>('/api/cont-humedad/', {
        params: { limit },
    })
    return data
}

export async function getContHumedadEnsayoDetail(ensayoId: number): Promise<ContHumedadEnsayoDetail> {
    const { data } = await api.get<ContHumedadEnsayoDetail>(`/api/cont-humedad/${ensayoId}`)
    return data
}

export default api
