import { useState } from "react";
import TodoCard from "../TodaySection/TodoCard";
import DateCarousel from "./DateCarousel";
import DateButton from "./DateButton";

//Helper function to map backend json to frontend array
function dataToArray(data) {

	const simplifiedData = data.map((todo) => (
		{
			id: todo.id,
			name: todo.name,
			completed: todo.is_completed
		})
	)
	return simplifiedData
}

function HistorySection() {

	const [curTodos, setCurTodos] = useState([]);
	const [dailyTodos, setDailyTodos] = useState([]);


	async function fetchAllTodoLists(date: String) {

		const token = localStorage.getItem("accessToken");
		const headers = {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`
		}

		//TODO: The dailies need to be reworked somehow
		try {

			console.log("fetching data....");
			const [dailyData, todayData] = await Promise.all([
				fetch('http://127.0.0.1:8000/api/habits/getDailies/', { method: "GET", headers }),
				fetch(`http://127.0.0.1:8000/api/habits/todoInstanceList/?date=${date}`, { method: "GET", headers }),
			])

			const rawDailies = await dailyData.json();
			const rawTodays = await todayData.json();

			const dailies = dataToArray(rawDailies);
			const todays = dataToArray(rawTodays);

			setCurTodos(todays);
			setDailyTodos(dailies);


		} catch (error) {
			console.log(error)

		}
	}

	return (

		<div className="flex flex-col items-center gap-5 pb-10">
			<h1 className="font-sans font-bold text-3xl p-4">History Section</h1>

			<DateCarousel fetchAllTodoLists={fetchAllTodoLists} />

			<TodoCard header="Dailies" subheader="Refreshes Everyday" curTodos={dailyTodos} editable={false} type="daily" />
			<TodoCard header="Todo" subheader="What are you doing today" curTodos={curTodos} editable={false} type="current" />

		</div>


	);
}

export default HistorySection
