
export interface DateButtonProps {
	date: String;
	fetchAllTodoLists: (date: String) => Promise<void>;

}

function DateButton({ date, fetchAllTodoLists }: DateButtonProps) {
	return (

		<button type="button" className="flex justify-between items-center border border-slate-400 bg-slate-500 rounded-lg p-3"
			onClick={() => { console.log("Date Buttton Pressed") }}

		>
			{date}

			<input
				type="date"
				className="sr-only"
				onChange={
					(e) => {
						const dateSelected = e.target.value;
						console.log("date selected: " + dateSelected);
						fetchAllTodoLists(dateSelected)
					}
				}
			></input>


		</button>


	)
}

export default DateButton
