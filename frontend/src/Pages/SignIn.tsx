import SignInCard from "../Components/SignInComps/SignInCard"
import type { InputObject } from "./SignUp"

const inputs: InputObject[] = [
	{ id: "email", placeholder: "Email", type: "email" },
	{ id: "password", placeholder: "Password", type: "password" },
]

function SignIn() {

	return (

		<div className='flex justify-center items-center bg-slate-900 text-slate-100 min-h-screen w-full'>
			<SignInCard title="Welcome Back" submitText="Sign In" inputs={inputs} bottomText="Don't Have an account? Click Here: " link="https://www.google.com" linkText="Sign Up" />
		</div>

	)
}

export default SignIn
