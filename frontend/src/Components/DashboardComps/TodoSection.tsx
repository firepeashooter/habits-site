import TodoCard from "./TodoCard"
import { useEffect, useState } from "react";

export interface TodoItemType {
	id: string;
	todoID: string;
	name: string;
	completed: boolean;
}

export interface TodoCardType {
	id: string;
	header: string;
	subheader?: string;
	curTodos: TodoItemType[];
	editable?: boolean;
	type: string;
	addTodo: (text: string, type: string) => void;
	toggleTodo: (id: string, type: string) => void;
}

const dailies: TodoItemType[] = [
	{ id: crypto.randomUUID(), todoID: "master-3", name: "Complete a Leetcode", completed: false },
	{ id: crypto.randomUUID(), todoID: "master-3", name: "Apply for Jobs", completed: false },
	{ id: crypto.randomUUID(), todoID: "master-3", name: "Train Chess", completed: false },
	{ id: crypto.randomUUID(), todoID: "master-3", name: "Read 10 Pages", completed: false },

]

{/* Simply request this array from the backend and give it a date. It will just grab all todos with that date*/ }
const currentTodos: TodoItemType[] = [
	{ id: crypto.randomUUID(), todoID: "master-3", name: "Tidy Appartment", completed: false },
	{ id: crypto.randomUUID(), todoID: "master-3", name: "Do Laundry", completed: false },
	{ id: crypto.randomUUID(), todoID: "master-3", name: "Finish UI for Habits Site", completed: false },
	{ id: crypto.randomUUID(), todoID: "master-3", name: "Update Minecraft Server Scripts", completed: false },
	{ id: crypto.randomUUID(), todoID: "master-3", name: "Update Minecraft Server Scripts again but longer", completed: false },
	{ id: crypto.randomUUID(), todoID: "master-3", name: "Do Laundry", completed: false },
]



function TodoSection() {



	const [curTodos, setCurTodos] = useState()
	const [dailyTodos, setDailyTodos] = useState(dailies)

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


	//TODO: One master use effect function that waits for all the todo lists to come in on first load

	useEffect(() => {
		async function fetchAllTodoLists() {

			const url = new URL("http://127.0.0.1:8000/api/habits/view-all/");
			const token = localStorage.getItem("accessToken");

			try {
				const response = await fetch(url, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${token}`
					}

				})

				//Converts the data to simplified array that our frontend can handle
				//updates our todo list 
				const data = await response.json()
				console.log(data);
				const simplified = dataToArray(data);
				console.log(simplified);
				setCurTodos(simplified);

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
				name: todo.todo_details.name,
				is_complete: todo.is_completed
			})
		)

		return simplifiedData

	}

	function addTodoList(text: string, type: string) {

		if (type === 'current') {

			//Add our new todo with our text
			const updatedCurTodos = [...curTodos, { id: crypto.randomUUID(), todoID: "master-3", name: text, completed: false }]
			setCurTodos(updatedCurTodos)

		} else if (type === 'daily') {

			//Add our new todo with our text
			const updatedDailyTodos = [...dailyTodos, { id: crypto.randomUUID(), todoID: "master-3", name: text, completed: false }]
			setDailyTodos(updatedDailyTodos)
		}

	}


	function toggleTodo(id: string, type: string) {

		if (type === 'current') {

			setCurTodos(prevTodos =>
				prevTodos.map(todo =>
					todo.id === id ? { ...todo, completed: !todo.completed } : todo // if the id is the one we just clicked, update it
				)
			);
		} else if (type === 'daily') {

			setDailyTodos(prevTodos =>
				prevTodos.map(todo =>
					todo.id === id ? { ...todo, completed: !todo.completed } : todo // if the id is the one we just clicked, update it
				)
			);
		}

	}

	const username = localStorage.getItem("username");

	return (

		<div className="flex flex-col items-center gap-5 pb-10">
			<h1 className="font-sans font-bold text-3xl p-4">Good Morning {username}</h1>

			<TodoCard header="Dailies" subheader="Refreshes Everyday" curTodos={dailyTodos} addTodo={addTodoList} toggleTodo={toggleTodo} type="daily" />
			<TodoCard header="Todo" subheader="What are you doing today" curTodos={curTodos} editable={true} addTodo={addTodoList} toggleTodo={toggleTodo} type="current" />


		</div>




	)
}

export default TodoSection
