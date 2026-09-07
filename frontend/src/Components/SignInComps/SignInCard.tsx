import { Link, useNavigate } from "react-router-dom";
import type { InputObject } from "../../Pages/SignUp";
import { useState } from "react";
import InputField from "./InputField"
import SubmitButton from "./SubmitButton";
import ErrorBanner from "./ErrorBanner";

interface SignInCardProps {
	title: string;
	submitText: string;
	inputs: InputObject[]
	bottomText: string;
	link: string;
	linkText: string;
	backendURL: string;
}

function SignInCard({ title, submitText, inputs, bottomText, link, linkText, backendURL }: SignInCardProps) {

	const [isError, setIsError] = useState(false);
	const navigate = useNavigate()

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

		//Here eventually we will send to the backend and verify
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const formValues = Object.fromEntries(formData.entries());

		console.log("Form Submitted! Values:", formValues);

		try {
			const response = await fetch(backendURL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formValues),

			});

			//TODO:When a username already exists in the system we need to be able to read for that
			if (!response.ok) {
				setIsError(true)
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const result = await response.json();

			//TODO: Make the access token NOT be in local storage this is for testing
			localStorage.setItem("accessToken", result.access)

			//TODO: Currently the username isn't getting sent back when we sign up, we need to change that

			//Stores the username in local storage so we can display it
			localStorage.setItem("username", result.username);

			setIsError(false)
			console.log("Response:", result)
			navigate("/dashboard")

		} catch (error) {
			setIsError(true);
			console.error("Error Fetching from Credentials from backend:", error);
		}
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

			{isError && <ErrorBanner bannerMessage="Username or Password is Incorrect" />}

			<p className="text-sm">{bottomText}<Link to={link} className="text-blue-600 underline">{linkText}</Link></p>


		</div>

	)
}

export default SignInCard
