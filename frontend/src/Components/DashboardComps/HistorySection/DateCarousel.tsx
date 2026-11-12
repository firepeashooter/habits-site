import { useState } from "react";
import DateButton from "./DateButton";

export interface DateCarouselProps {
	fetchAllTodoLists: (date: String) => Promise<void>;
}

function DateCarousel({ fetchAllTodoLists }: DateCarouselProps) {

	const yesterday = new Date();
	yesterday.setDate(yesterday.getDate() - 1)


	const [curDate, setCurDate] = useState(yesterday);
	const formattedDate = `${curDate.getFullYear()}-${String(curDate.getMonth() + 1).padStart(2, '0')}-${String(curDate.getDate()).padStart(2, '0')}`;

	function changeDate(direction: String) {

		const newDate = new Date(curDate);

		console.log("current date = " + formattedDate);

		if (direction === "forward") {

			//Makes sure the buttons don't go past yesterday
			newDate.setDate(newDate.getDate() + 1);

		}
		else {
			newDate.setDate(newDate.getDate() - 1);
		}

		if (newDate <= yesterday) {

			//Format the new date string locally right here and increase it
			const year = newDate.getFullYear();
			const month = String(newDate.getMonth() + 1).padStart(2, '0');
			const day = String(newDate.getDate()).padStart(2, '0');
			const newFormattedDate = `${year}-${month}-${day}`;
			setCurDate(newDate);
			console.log("new date is " + newFormattedDate);
			fetchAllTodoLists(newFormattedDate);

		} else {
			console.log("Day is in the future");
			console.log("Keeping Date the Same");
			console.log("new date is " + formattedDate)

		}



	}

	return (
		<div className="flex items-center w-full justify-around">
			<button onClick={() => changeDate("back")} className="w-7 h-7 bg-amber-600"> L </button>
			<DateButton date={formattedDate} fetchAllTodoLists={fetchAllTodoLists} setCurDate={setCurDate} />
			<button onClick={() => changeDate("forward")} className="w-7 h-7 bg-amber-600"> R </button>


		</div>

	);
}


export default DateCarousel
