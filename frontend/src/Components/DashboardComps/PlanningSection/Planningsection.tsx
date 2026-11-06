import type { TodoItemType } from "../TodaySection/TodoSection";
import TodoCard from "../TodaySection/TodoCard";


export interface PlanningSectionProps {
	tomorrowTodos: TodoItemType[];
	addTodoList: (text: string, type: string) => void;
	toggleTodo: (text: string, type: string) => void;

}


function PlanningSection({ tomorrowTodos, addTodoList, toggleTodo }: PlanningSectionProps) {


	return (

		< div className="flex flex-col items-center gap-5 pb-10" >

			<h1 className="font-sans font-bold text-3xl p-4">Good Morning Benjamin!</h1>

			<TodoCard header="Tomorrow" subheader="Plan Tomorrow Today" type="tomorrow" curTodos={tomorrowTodos} editable={true} addTodo={addTodoList} toggleTodo={toggleTodo} />

		</div >

	)
}

export default PlanningSection
