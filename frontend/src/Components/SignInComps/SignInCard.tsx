import InputField from "./InputField"
import SubmitButton from "./SubmitButton";

interface SignInCardProps {
	title: string;

}

function SignInCard({ title }: SignInCardProps) {

	return (

		<div className="flex flex-col bg-slate-700 rounded w-11/12 p-5 border border-slate-600 shadow gap-5">
			<h1 className="font-bold text-xl">{title}</h1>
			<form action="" className="flex flex-col gap-5">

				<InputField placeholder="Username" />
				<InputField placeholder="Password" />
				<SubmitButton />
			</form>

			<p className="text-sm">Don't Have an Account? Sign up Here: <a href="https://www.google.com" className="text-blue-600 underline">Sign Up</a></p>


		</div>

	)
}

export default SignInCard
