
interface InputFieldProps {
	placeholder: string;
	type: string;

}

function InputField({ placeholder, type }: InputFieldProps) {

	return (

		<div className="flex justify-center items-center border border-slate-600 bg-slate-100 rounded-lg p-2 w-full">
			<input
				type={type}
				placeholder={placeholder}
				className="bg-transparent text-slate-950 outline-none w-full px-1"
				autoFocus
			/>
		</div>

	)
}

export default InputField
