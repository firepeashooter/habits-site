import Todo from "./Todo"
import ProgressWheel from "./ProgressWheel";
import AddTodoButton from "./AddTodoButton";
import type { TodoItemType } from "./TodoSection";
import { useEffect, useState } from "react";


interface TodoCardProps {
	header: string;
	subheader?: string;
	type: string;
	curTodos: TodoItemType[];
	editable?: boolean;
	selectedDate: string;
	addTodo: (text: string, type: string) => void;
	toggleTodo: (id: string, type: string) => void;
}


function TodoCard({ header, subheader, curTodos = [], type, editable = false, selectedDate, addTodo, toggleTodo }: TodoCardProps) {


	const totalCount = curTodos.length;
	const completedCount = curTodos.filter(todo => todo.completed).length;



	//TODO: Will fetch selected date todos from the backend, and refresh everytime the date changes

	useEffect(() => {
		async function GetTodoByDate(date: string) {

			const url = new URL("http://127.0.0.1:8000/api/habits/view-date/");
			const token = localStorage.getItem("accessToken");
			url.searchParams.append("date", date);

			try {

				const response = await fetch(url, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${token}`
					}

				})

				const data = await response.json()
				console.log(data)


			} catch (error) {
				console.log(error)

			}
		}

		GetTodoByDate(selectedDate)
	}, [selectedDate]);


	return (


		<div className="flex flex-col bg-slate-700 rounded-2xl w-11/12 p-5 border border-slate-600/40 shadow-lg">
			<header className="flex pb-5 justify-between">

				<div className="flex flex-col">
					<h2 className="text-slate-100 font-sans font-bold text-2xl pb-1">{header}</h2>
					<p className="text-slate-300 text-lg">{subheader}</p>
				</div>

				<ProgressWheel completedCount={completedCount} totalCount={totalCount} />
			</header>

			<div className="flex flex-col items-center gap-3">
				{
					curTodos.map((todo) =>
						<Todo
							key={todo.id}
							name={todo.name}
							type={type}
							completed={todo.completed}
							onToggle={() => toggleTodo(todo.id, type)}


						/>

					)
				}

				{editable && <AddTodoButton type={type} addTodo={addTodo} />}

			</div>




		</div>




	)
}

export default TodoCard 
