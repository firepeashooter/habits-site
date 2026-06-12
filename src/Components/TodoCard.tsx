import Todo from "./Todo"

function TodoCard() {

	return (


		<div className="flex flex-col bg-slate-700 rounded-2xl w-11/12 p-4 border border-slate-600/40 shadow-lg">
			<header className="flex flex-col pb-5">

				<h2 className="text-slate-100 font-sans font-bold text-xl pb-1">Dailies</h2>
				<p className="text-slate-300">Refreshes Every Day</p>

			</header>

			<div className="flex flex-col items-center">

				<Todo />
			</div>




		</div>




	)
}

export default TodoCard 
