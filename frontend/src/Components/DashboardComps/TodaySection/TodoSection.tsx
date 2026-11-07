import TodoCard from "./TodoCard"

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
	editable: boolean;
	type: string;
	addTodo?: (text: string, type: string) => void;
	toggleTodo?: (id: string, type: string) => void;
}

export interface TodoSectionProps {
	curTodos: TodoItemType[];
	dailyTodos: TodoItemType[];
	addTodoList: (text: string, type: string) => void;
	toggleTodo: (text: string, type: string) => void;

}


function TodoSection({ curTodos, dailyTodos, addTodoList, toggleTodo }: TodoSectionProps) {



	const username = localStorage.getItem("username");

	return (

		<div className="flex flex-col items-center gap-5 pb-10">
			<h1 className="font-sans font-bold text-3xl p-4">Good Morning {username}</h1>

			<TodoCard header="Dailies" subheader="Refreshes Everyday" curTodos={dailyTodos} editable={false} addTodo={addTodoList} toggleTodo={toggleTodo} type="daily" />
			<TodoCard header="Todo" subheader="What are you doing today" curTodos={curTodos} editable={true} addTodo={addTodoList} toggleTodo={toggleTodo} type="current" />

		</div>

	)
}

export default TodoSection
