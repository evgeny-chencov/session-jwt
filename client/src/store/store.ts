import IUser from "../models/IUser";
import { makeAutoObservable } from "mobx";
import AuthService from "../service/AuthService";
import axios from 'axios'
import { AuthResponse } from "../models/response/AuthResponse";
import { API_URL } from "../http";

export default class Store {
	user = {} as IUser
	isAuth = false
	isLoading = false

	constructor() {
		makeAutoObservable(this)
	}

	setAuth(bool: boolean) {
		this.isAuth = bool
	}

	setLoading(bool: boolean) {
		this.isLoading = bool
	}

	setUser(user: IUser) {
		this.user = user
	}

	async login(email: string, password: string) {
		try {
			const response = await AuthService.login(email, password)
			sessionStorage.setItem('token', response.data.accessToken)
			this.setAuth(true)
			this.setUser(response.data.user)
		} catch (e: any) {
			console.log(e.response?.data?.message)
		}
	}

	async registration(email: string, password: string) {
		try {
			const response = await AuthService.registration(email, password)
			console.log(response.data)
			sessionStorage.setItem('token', response.data.accessToken)
			this.setAuth(true)
			this.setUser(response.data.user)
		} catch (e: any) {
			console.log(e.response?.data?.message)
		}
	}

	async logout() {
		try {
			const response = await AuthService.logout()
			sessionStorage.removeItem('token')
			this.setAuth(false)
			this.setUser({} as IUser)
		} catch (e: any) {
			console.log(e.response?.data?.message)
		}
	}

	async checkAuth() {
		this.setLoading(true)
		try {
			const response = await axios.get<AuthResponse>(`${ API_URL }/refresh`, { withCredentials: true })
			sessionStorage.setItem('token', response.data.accessToken)
			this.setUser(response.data.user)
			this.setAuth(true)
		} catch (e: any) {
			console.log(e.response?.data?.message)
		} finally {
			this.setLoading(false)
		}
	}
}