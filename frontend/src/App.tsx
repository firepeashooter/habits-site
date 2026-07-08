import Dashboard from "./Pages/Dashboard"
import SignIn from "./Pages/SignIn"
import SignUp from "./Pages/SignUp"
import LandingPage from "./Pages/LandingPage";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/signin" element={<SignIn />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/dashboard" element={<Dashboard />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
