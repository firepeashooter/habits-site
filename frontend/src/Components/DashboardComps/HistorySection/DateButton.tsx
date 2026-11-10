import { useRef } from "react";

export interface DateButtonProps {
	date: String;
	fetchAllTodoLists: (date: String) => Promise<void>;
	setCurDate: React.Dispatch<React.SetStateAction<Date>>;

}

function DateButton({ date, fetchAllTodoLists, setCurDate }: DateButtonProps) {
	const inputRef = useRef<HTMLInputElement>(null);

	return (

		<button type="button" className="flex justify-between items-center border border-slate-400 bg-slate-500 rounded-lg p-3"
			onClick={() => { inputRef.current?.showPicker() }}
		>
			{date}

			<input
				type="date"
				ref={inputRef}
				className="sr-only"
				onChange={
					(e) => {
						const dateSelected = e.target.value;
						const newDateObject = new Date(dateSelected + 'T00:00:00');
						console.log("date selected: " + dateSelected);
						setCurDate(newDateObject);
						fetchAllTodoLists(dateSelected);
					}
				}
			></input>


		</button>


	)
}

export default DateButton
