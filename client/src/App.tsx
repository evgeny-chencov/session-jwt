import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import LoginForm from "./components/LoginForm";
import { Context } from "./index";

function App() {
	const { store } = useContext(Context);
	useEffect(() => {
		if(sessionStorage.getItem('token')) {
			store.checkAuth()
		}
	}, []);
	if(store.isLoading) {
		return <div>LOADING!!!</div>
	}
	if(!store.isAuth) {
		return <LoginForm />
	}
	return (
		<div className="App">
			<h1>{store.isAuth ? `User authorized ${store.user.email}` : 'Not Authorized'}</h1>
			<button onClick={() => store.logout()}>Logout</button>
		</div>
	);
}

export default observer(App);
