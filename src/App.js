import authFacade from "./scripts/authFacade";
import React, { useState, useEffect } from "react";

function LogIn({ login }) {
	const init = { username: "", password: "" };
	const [loginCredentials, setLoginCredentials] = useState(init);

	const performLogin = (evt) => {
		evt.preventDefault();
		login(loginCredentials.username, loginCredentials.password);
	};
	const onChange = (evt) => {
		setLoginCredentials({ ...loginCredentials, [evt.target.id]: evt.target.value });
	};

	return (
		<div>
			<h2>Login</h2>
			<form onChange={onChange}>
				<input placeholder="User Name" id="username" />
				<input placeholder="Password" id="password" />
				<button onClick={performLogin}>Login</button>
			</form>
		</div>
	);
}
function LoggedIn() {
	const [dataFromServer, setDataFromServer] = useState("Loading...");

	useEffect(() => {
		authFacade.fetchData().then((data) => {
			console.log(data);
			setDataFromServer(data);
		});
	}, []);

	return (
		<div>
			<h2>Data Received from server</h2>
			<h3>{dataFromServer.msg}</h3>
		</div>
	);
}

function App() {
	const [loggedIn, setLoggedIn] = useState(false);

	const logout = () => {
		authFacade.logout();
		setLoggedIn(false);
	};
	const login = (user, pass) => {
		authFacade.login(user, pass).then(() => {
			setLoggedIn(true);
		});
	};

	return (
		<div>
			{!loggedIn ? (
				<LogIn login={login} />
			) : (
				<div>
					<LoggedIn />
					<button onClick={logout}>Logout</button>
				</div>
			)}
		</div>
	);
}
export default App;
