import type { TodoItemType } from "./TodoSection"
import TodoCard from "./TodoCard"
import { useState, useEffect } from "react"




function PlanningSection() {

	const [weeklyTodos, setWeeklyTodos] = useState()
	const [tomorrowTodos, setTomorrowTodos] = useState()

	//TODO: This formatting shoudl be done in the big fetch function
	const [dateToday, setdateToday] = useState(() => {
		const today = new Date();
		const year = today.getFullYear();
		const month = String(today.getMonth() + 1).padStart(2, '0');
		const day = String(today.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	});


	const [dateTomorrow, setdateTomorrow] = useState(() => {
		const tomorrow = new Date();

		tomorrow.setDate(tomorrow.getDate() + 1);
		const year = tomorrow.getFullYear();
		const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
		const day = String(tomorrow.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	});

	useEffect(() => {
		async function fetchAllTodoLists() {

			const token = localStorage.getItem("accessToken");
			const headers = {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			}

			//TODO: The dailies need to be reworked somehow
			try {

				console.log("fetching data....");
				const tmrwData = await fetch(`http://127.0.0.1:8000/api/habits/todoInstanceList/?date=${dateTomorrow}`, { method: "GET", headers })

				const rawTmrw = await tmrwData.json();

				console.log(rawTmrw);

				const tomorrow = dataToArray(rawTmrw);

				setTomorrowTodos(tomorrow);


			} catch (error) {
				console.log(error)

			}
		}

		fetchAllTodoLists()
	}, []);


	function dataToArray(data) {

		const simplifiedData = data.map((todo) => (
			{
				id: todo.id,
				name: todo.name,
				is_complete: todo.is_completed
			})
		)

		return simplifiedData

	}


	async function postTodo(date: String, text: String) {
		const token = localStorage.getItem("accessToken");

		const headers = {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`
		};

		console.log("Adding Entry to Backend");

		try {

			const response = await fetch(`http://127.0.0.1:8000/api/habits/createInstance/`, {
				method: "POST",
				headers,
				body: JSON.stringify({
					date: date,
					name: text,
					is_completed: false,
					is_daily: false
				})
			});

			if (!response.ok) {
				throw new Error("Failed to Save");
				//TODO: and eventually remove it from the frontend list
			}

			const data = await response.json()
			console.log(data)

		} catch (error) {
			console.log(error);
		}

	}

	function addTodoList(text: string, type: string) {


		if (type === 'tomorrow') {

			//Add our new todo with our text
			const updatedTomorrowTodos = [...tomorrowTodos, { id: crypto.randomUUID(), todoID: "master-3", name: text, completed: false }]
			setTomorrowTodos(updatedTomorrowTodos)

			postTodo(dateTomorrow, text);
		}

	}


	function toggleTodo(id: string, type: string) {

		if (type === 'weekly') {

			setWeeklyTodos(prevTodos =>
				prevTodos.map(todo =>
					todo.id === id ? { ...todo, completed: !todo.completed } : todo // if the id is the one we just clicked, update it
				)
			);
		} else if (type === 'tomorrow') {

			setTomorrowTodos(prevTodos =>
				prevTodos.map(todo =>
					todo.id === id ? { ...todo, completed: !todo.completed } : todo // if the id is the one we just clicked, update it
				)
			);
		}

	}

	return (

		< div className="flex flex-col items-center gap-5 pb-10" >

			<h1 className="font-sans font-bold text-3xl p-4">Good Morning Benjamin!</h1>


			<TodoCard header="Tomorrow" subheader="Plan Tomorrow Today" type="tomorrow" curTodos={tomorrowTodos} editable={true} addTodo={addTodoList} toggleTodo={toggleTodo} />

			<TodoCard header="Weekly/Overall" type="weekly" curTodos={weeklyTodos} editable={true} addTodo={addTodoList} toggleTodo={toggleTodo} />

		</div >

	)
}

export default PlanningSection
