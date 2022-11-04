import axios from 'axios'

export const API_URL = `http://localhost:5000/api`

const $api = axios.create({
	withCredentials: true,
	baseURL: API_URL
})

$api.interceptors.request.use((config) => {
	config.headers = config.headers ?? {}
	config.headers.Authorization = `Bearer ${sessionStorage.getItem('token')}`
	return config
})

export default $api