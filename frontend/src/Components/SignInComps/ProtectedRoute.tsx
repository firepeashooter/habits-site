import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

async function verifyToken(accessToken: String | null) {

	try {

		const response = await fetch('http://127.0.0.1:8000/api/auth/token/verify/', {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
			},
			// SimpleJWT's TokenVerifyView expects a JSON body with the key "token"
			body: JSON.stringify({ token: accessToken }),

		});

		if (response.ok) {
			const data = await response.json();
			console.log("Token is valid" + data);
			return true;
		} else {
			console.log("Token is invalid");
			return false;
		}

	} catch (error) {
		console.log(error);
		return false;

	}


}

function ProtectedRoute() {

	const token = localStorage.getItem("accessToken");

	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

	useEffect(() => {

		if (!token) {
			setIsAuthenticated(false);
		}
		verifyToken(token).then(isValid => {
			setIsAuthenticated(isValid);
		});
	}, [token]);

	if (isAuthenticated === null) {
		return (
			<div>Loading...</div>
		)
	}

	if (isAuthenticated === false) {

		return <Navigate to="/signin" replace />;
	}

	if (isAuthenticated === true) {

		return <Outlet />;
	}


}


export default ProtectedRoute;
