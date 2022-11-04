import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import LoginForm from "./components/LoginForm";
import { Context } from "./index";
import UserService from './service/UserService';
import IUser from "./models/IUser";

function App() {
	const { store } = useContext(Context);
	const [users, setUsers] = useState<IUser[]>([])
	useEffect(() => {
		if(sessionStorage.getItem('token')) {
			store.checkAuth()
		}
	}, []);

	async function getUsers() {
		try {
			const response = await UserService.fetchUsers()
			setUsers(response.data)
		} catch (e) {

		}
	}
	if(store.isLoading) {
		return <div>LOADING!!!</div>
	}
	if(!store.isAuth) {
		return <div>
			<LoginForm />
			<button onClick={() => getUsers()}>Get all users</button>
		</div>
	}
	return (
		<div className="App">
			<h1>{store.isAuth ? `User authorized ${store.user.email}` : 'Not Authorized'}</h1>
			<button onClick={() => store.logout()}>Logout</button>
			<div>
				<button onClick={() => getUsers()}>Get all users</button>
			</div>
			{
				users.map((user) => {
					return <div key={user.email}>{user.email}</div>
				})
			}
		</div>
	);
}

export default observer(App);
