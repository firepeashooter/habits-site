import { useState } from "react";
import Todo from "./Todo"
import ProgressWheel from "./ProgressWheel";

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

	const [todos, setTodos] = useState<TodoItem[]>(initialTodos);

	const totalCount = todos.length;
	const completedCount = todos.filter(todo => todo.completed).length;

	const toggleTodo = (id: string) => {
		setTodos(prevTodos =>
			prevTodos.map(todo =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo // if the id is the one we just clicked, update it
			)
		);
	};

	return (


		<div className="flex flex-col bg-slate-700 rounded-2xl w-11/12 p-5 border border-slate-600/40 shadow-lg">
			<header className="flex pb-5 justify-between">

				<div className="flex flex-col">
					<h2 className="text-slate-100 font-sans font-bold text-2xl pb-1">Dailies</h2>
					<p className="text-slate-300 text-lg">Refreshes Every Day</p>
				</div>

				<ProgressWheel completedCount={completedCount} totalCount={totalCount} />
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
