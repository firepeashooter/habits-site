import SignInCard from "../Components/SignInComps/SignInCard"

export interface InputObject {
	id: string;
	name: string;
	placeholder: string
	type: string;
}

const inputs: InputObject[] = [
	{ id: "email", name: "email", placeholder: "Email", type: "email" },
	{ id: "username", name: "username", placeholder: "Username", type: "text" },
	{ id: "password", name: "password", placeholder: "Password", type: "password" },
]

function SignUp() {

	return (

		<div className='flex justify-center items-center bg-slate-900 text-slate-100 min-h-screen w-full'>
			<SignInCard title="Create an Account" submitText="Create Account" inputs={inputs} bottomText="Already Have an account? Click Here: " link="/signin" linkText="Sign In" />
		</div>

	)
}

export default SignUp
