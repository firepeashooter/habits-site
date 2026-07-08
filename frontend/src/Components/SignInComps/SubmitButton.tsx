interface SubmitButtonProps {
	text: string;
}

function SubmitButton({ text }: SubmitButtonProps) {
	return (

		<button
			className="flex justify-center items-center border border-slate-600 bg-sky-600 font-bold text-slate-100 rounded-lg p-2 w-full hover:bg-sky-500 active:opacity-100 active:bg-sky-800"
		>
			{text}

		</button>

	)

}

export default SubmitButton
