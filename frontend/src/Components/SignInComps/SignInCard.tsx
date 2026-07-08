import type { InputObject } from "../../Pages/SignUp";
import InputField from "./InputField"
import SubmitButton from "./SubmitButton";

interface SignInCardProps {
	title: string;
	submitText: string;
	inputs: InputObject[]
	bottomText: string;
	link: string;
	linkText: string;


}

function SignInCard({ title, submitText, inputs, bottomText, link, linkText }: SignInCardProps) {

	return (

		<div className="flex flex-col bg-slate-700 rounded w-11/12 p-5 border border-slate-600 shadow gap-5">
			<h1 className="font-bold text-xl">{title}</h1>
			<form action="" className="flex flex-col gap-5">

				{
					inputs.map((input) =>
						<InputField
							key={input.id}
							placeholder={input.placeholder}
							type={input.type}
						/>
					)
				}

				<SubmitButton text={submitText} />
			</form>

			<p className="text-sm">{bottomText}<a href={link} className="text-blue-600 underline">{linkText}</a></p>


		</div>

	)
}

export default SignInCard
