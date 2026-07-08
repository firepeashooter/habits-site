import { Link } from "react-router-dom";
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

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

		event.preventDefault();

		const formData = new FormData(event.currentTarget);

		const formValues = Object.fromEntries(formData.entries());

		console.log("Form Submitted! Values:", formValues);

	};

	return (

		<div className="flex flex-col bg-slate-700 rounded w-11/12 p-5 border border-slate-600 shadow gap-5 md:max-w-1/3">
			<h1 className="font-bold text-xl">{title}</h1>
			<form onSubmit={handleSubmit} className="flex flex-col gap-5">

				{
					inputs.map((input) =>
						<InputField
							key={input.id}
							name={input.name}
							placeholder={input.placeholder}
							type={input.type}
						/>
					)
				}

				<SubmitButton text={submitText} />
			</form>

			<p className="text-sm">{bottomText}<Link to={link} className="text-blue-600 underline">{linkText}</Link></p>


		</div>

	)
}

export default SignInCard
