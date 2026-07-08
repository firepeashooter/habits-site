
interface InputFieldProps {
	placeholder: string;

}

function InputField({ placeholder }: InputFieldProps) {

	return (

		<div className="flex justify-center items-center border border-slate-600 bg-slate-200 rounded-lg p-2 w-full">
			<input
				type="text"
				placeholder={placeholder}
				className="bg-transparent text-slate-950 outline-none w-full px-1"
				autoFocus
			/>
		</div>

	)
}

export default InputField
