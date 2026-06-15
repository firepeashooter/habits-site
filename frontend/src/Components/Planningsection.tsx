import type { TodoItemType } from "./TodoSection"
import type { TodoCardType } from "./TodoSection"
import TodoCard from "./TodoCard"
import { useState } from "react"

{/* Just grab todos with tomorrows date from the backend*/ }
const tomorrow: TodoItemType[] = [

]

{/* Just grab weekly items from the todo*/ }
const weekly: TodoItemType[] = [
	{ id: crypto.randomUUID(), name: "Tidy Appartment", completed: false },
	{ id: crypto.randomUUID(), name: "Do Laundry", completed: false },
	{ id: crypto.randomUUID(), name: "Finish UI for Habits Site", completed: false },
	{ id: crypto.randomUUID(), name: "Update Minecraft Server Scripts", completed: false },
	{ id: crypto.randomUUID(), name: "Update Minecraft Server Scripts again but longer", completed: false },
	{ id: crypto.randomUUID(), name: "Do Laundry", completed: false },
]

function PlanningSection() {

	const [weeklyTodos, setWeeklyTodos] = useState(weekly)
	const [tomorrowTodos, setTomorrowTodos] = useState(tomorrow)


	function addWeeklyTodoList(text: string) {
		//Add our new todo with our text
		const updatedWeeklyTodos = [...weeklyTodos, { id: crypto.randomUUID(), todoID: "master-3", name: text, completed: false }]
		setWeeklyTodos(updatedWeeklyTodos)
	}

	function toggleWeeklyTodo(id: string) {

		setWeeklyTodos(prevTodos =>
			prevTodos.map(todo =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo // if the id is the one we just clicked, update it
			)
		);
	}

	function addTomorrowTodoList(text: string) {
		//Add our new todo with our text
		const updatedTomorrowTodos = [...tomorrowTodos, { id: crypto.randomUUID(), todoID: "master-3", name: text, completed: false }]
		setTomorrowTodos(updatedTomorrowTodos)
	}

	function toggleTomorrowTodo(id: string) {

		setTomorrowTodos(prevTodos =>
			prevTodos.map(todo =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo // if the id is the one we just clicked, update it
			)
		);
	}
	return (

		< div className="flex flex-col items-center gap-5 pb-10" >

			<h1 className="font-sans font-bold text-3xl p-4">Good Morning Benjamin!</h1>


			<TodoCard header="Tomorrow" subheader="Plan Tomorrow Today" curTodos={tomorrowTodos} editable={true} addTodo={addTomorrowTodoList} toggleTodo={toggleTomorrowTodo} />

			<TodoCard header="Weekly/Overall" curTodos={weeklyTodos} editable={true} addTodo={addWeeklyTodoList} toggleTodo={toggleWeeklyTodo} />

		</div >

	)
}

export default PlanningSection
