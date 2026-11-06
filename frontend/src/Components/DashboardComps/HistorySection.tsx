import TodoCard from "./TodoCard";

function HistorySection() {

	const dailyTodos = [];
	const curTodos = [];


	return (

		<div className="flex flex-col items-center gap-5 pb-10">
			<h1 className="font-sans font-bold text-3xl p-4">History Section</h1>

			<TodoCard header="Dailies" subheader="Refreshes Everyday" curTodos={dailyTodos} editable={false} type="daily" />
			<TodoCard header="Todo" subheader="What are you doing today" curTodos={curTodos} editable={false} type="current" />

		</div>


	);
}

export default HistorySection
