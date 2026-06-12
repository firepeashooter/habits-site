import { useState } from "react";
import Todo from "./Todo"

interface TodoItem {
	id: string;
	name: string;
	completed: boolean;
}

const initialTodos: TodoItem[] = [
	{ id: crypto.randomUUID(), name: "Complete a Leetcode", completed: false },
	{ id: crypto.randomUUID(), name: "Apply for Jobs", completed: false },
	{ id: crypto.randomUUID(), name: "Train Chess", completed: false },

]

function TodoCard() {

	// 1. Initialize state with our initial todos
	const [todos, setTodos] = useState<TodoItem[]>(initialTodos);

	// 2. The function to toggle completed status based on ID
	const toggleTodo = (id: string) => {
		setTodos(prevTodos =>
			prevTodos.map(todo =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo // if the id is the one we just clicked, update it
			)
		);
	};

	return (


		<div className="flex flex-col bg-slate-700 rounded-2xl w-11/12 p-5 border border-slate-600/40 shadow-lg">
			<header className="flex flex-col pb-5">

				<h2 className="text-slate-100 font-sans font-bold text-2xl pb-1">Dailies</h2>
				<p className="text-slate-300 text-lg">Refreshes Every Day</p>

			</header>

			<div className="flex flex-col items-center gap-3">
				{
					todos.map((todo) =>
						<Todo
							key={todo.id}
							name={todo.name}
							completed={todo.completed}
							onToggle={() => toggleTodo(todo.id)}

						/>

					)
				}

			</div>




		</div>




	)
}

export default TodoCard 
