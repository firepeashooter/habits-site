import Dashboard from "./Pages/Dashboard"
import SignIn from "./Pages/SignIn"
import SignUp from "./Pages/SignUp"
import LandingPage from "./Pages/LandingPage";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from "./Components/SignInComps/ProtectedRoute";

function App() {

	return (
		<BrowserRouter>
			<Routes>
				{/*PUBLIC ROUTES*/}
				<Route path="/" element={<LandingPage />} />
				<Route path="/signin" element={<SignIn />} />
				<Route path="/signup" element={<SignUp />} />

				{/*PRIVATE ROUTES*/}
				<Route element={<ProtectedRoute />}>
					<Route path="/dashboard" element={<Dashboard />} />
				</Route>

			</Routes>
		</BrowserRouter>
	)
}

export default App
