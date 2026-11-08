import { useState } from "react";
import DateButton from "./DateButton";

export interface DateCarouselProps {
	fetchAllTodoLists: (date: String) => Promise<void>;
}

//TODO: BUG WHERE WHEN SWITCHING BUTTONS IT STILL ACTIVATES THE OLD ONE
function DateCarousel({ fetchAllTodoLists }: DateCarouselProps) {

	const today = new Date();

	const [curDate, setCurDate] = useState(today);
	const formattedDate = `${curDate.getFullYear()}-${String(curDate.getMonth() + 1).padStart(2, '0')}-${String(curDate.getDate()).padStart(2, '0')}`;

	function changeDate(direction: String) {

		const newDate = new Date(curDate);

		if (direction === "forward") {
			newDate.setDate(newDate.getDate() + 1);
		}
		else {
			newDate.setDate(newDate.getDate() - 1);
		}


		setCurDate(newDate);
		console.log(formattedDate);
		fetchAllTodoLists(formattedDate);

	}

	return (
		<div className="flex items-center w-full justify-around">
			<button onClick={() => changeDate("back")} className="w-7 h-7 bg-amber-600"> L </button>
			<DateButton date={formattedDate} fetchAllTodoLists={fetchAllTodoLists} />
			<button onClick={() => changeDate("forward")} className="w-7 h-7 bg-amber-600"> R </button>


		</div>

	);
}


export default DateCarousel
