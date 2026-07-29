import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {

	const token = localStorage.getItem("accessToken");

	//If not token is there reroute to login
	if (!token) {
		return <Navigate to="/signin" replace />;
	}

	// If token exists, render the requested child route 
	return <Outlet />;

}

export default ProtectedRoute;
