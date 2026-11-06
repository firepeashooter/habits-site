import { useState } from "react";

function DateCarousel() {

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

	}



	return (
		<div className="flex w-full justify-around">
			<button onClick={() => changeDate("back")} className="w-7 h-7 bg-amber-600"> L </button>
			<h1>{formattedDate}</h1>
			<button onClick={() => changeDate("forward")} className="w-7 h-7 bg-amber-600"> R </button>


		</div>

	);
}


export default DateCarousel
