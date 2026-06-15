import TodoCard from "./TodoCard"
import { useState } from "react";

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
	addTodo: (text: string) => void;
	toggleTodo: (id: string) => void;
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

	const [curTodos, setCurTodos] = useState(currentTodos)
	const [dailyTodos, setDailyTodos] = useState(dailies)


	function addCurTodoList(text: string) {
		//Add our new todo with our text
		const updatedCurTodos = [...curTodos, { id: crypto.randomUUID(), todoID: "master-3", name: text, completed: false }]
		setCurTodos(updatedCurTodos)
	}

	function addDailyTodoList(text: string) {
		//Add our new todo with our text
		const updatedDailyTodos = [...dailyTodos, { id: crypto.randomUUID(), todoID: "master-3", name: text, completed: false }]
		setDailyTodos(updatedDailyTodos)
	}

	function toggleTodo(id: string) {

		setCurTodos(prevTodos =>
			prevTodos.map(todo =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo // if the id is the one we just clicked, update it
			)
		);
	}

	function toggleDailyTodo(id: string) {

		setDailyTodos(prevTodos =>
			prevTodos.map(todo =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo // if the id is the one we just clicked, update it
			)
		);
	}

	return (

		<div className="flex flex-col items-center gap-5 pb-10">
			<h1 className="font-sans font-bold text-3xl p-4">Good Morning Benjamin!</h1>

			<TodoCard header="Dailies" subheader="Refreshes Everyday" curTodos={dailyTodos} addTodo={addCurTodoList} toggleTodo={toggleDailyTodo} type="daily" />
			<TodoCard header="Todo" subheader="What are you doing today" curTodos={curTodos} editable={true} addTodo={addCurTodoList} toggleTodo={toggleTodo} type="current" />


		</div>




	)
}

export default TodoSection
