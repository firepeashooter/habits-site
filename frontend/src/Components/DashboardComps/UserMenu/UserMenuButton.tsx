
//TODO: We need to kill their refresh token so we need to save that local storage too
async function logOut() {

	//hit the logout enpoint

	const token = localStorage.getItem("accessToken");
	const headers = {
		"Content-Type": "application/json",
		"Authorization": `Bearer ${token}`
	}

	try {

		const response = await fetch('http://127.0.0.1:8000/api/auth/logout/', { method: "POST", headers });

		const data = await response.json()

		console.log(data);


	} catch (error) {
		console.log(error);
	}


	//delete the token from thing
	localStorage.removeItem("accessToken");

	//reload the page
	location.reload()



}

function UserMenuButton() {

	return (
		<button type="button" className="flex text-2xl justify-center items-center border border-slate-400 bg-slate-700 rounded-lg p-3 w-full max-h-20"
			onClick={logOut}>
			Log Out
		</button>

	)


}

export default UserMenuButton;
