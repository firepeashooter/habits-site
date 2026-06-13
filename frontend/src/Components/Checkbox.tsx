interface CheckboxProps {
	checked: boolean;
	onChange: () => void;
}

export default function Checkbox({ checked, onChange }: CheckboxProps) {
	return (
		<div className="relative w-6 h-6 flex items-center justify-center cursor-pointer flex-shrink-0">
			<input
				type="checkbox"
				checked={checked}
				onChange={onChange}
				className="sr-only peer"
			/>

			{/* The Custom Circle */}
			<div className="w-full h-full rounded-full border-2 border-slate-500 bg-transparent 
                      flex items-center justify-center transition-all duration-200
                      peer-checked:bg-emerald-500 peer-checked:border-emerald-500">

				{/* The Checkmark Vector */}
				<svg
					className={`w-4 h-4 text-white transition-transform duration-200 block ${checked ? 'scale-100' : 'scale-0'
						}`}
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					strokeWidth="3.5"
				>
					<path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
				</svg>

			</div>
		</div>
	);
}
