import Todo from "./Todo"

interface TodoItem {
	id: string;
	name: string;
	completed: boolean;
}

const todos: TodoItem[] = [
	{ id: crypto.randomUUID(), name: "Complete a Leetcode", completed: false },
	{ id: crypto.randomUUID(), name: "Apply for Jobs", completed: false },
	{ id: crypto.randomUUID(), name: "Train Chess", completed: false },

]

function TodoCard() {

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

						/>

					)
				}

			</div>




		</div>




	)
}

export default TodoCard 
