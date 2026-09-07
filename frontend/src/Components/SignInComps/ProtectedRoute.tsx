import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {

	const token = localStorage.getItem("accessToken");

	//If not token is there reroute to login
	//TODO:How do we validate this on the front end?
	if (!token) {
		return <Navigate to="/signin" replace />;
	}

	// If token exists, render the requested child route 
	return <Outlet />;

}

export default ProtectedRoute;
