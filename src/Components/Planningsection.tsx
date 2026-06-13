import type { TodoItemType } from "./TodoSection"
import type { TodoCardType } from "./TodoSection"
import TodoCard from "./TodoCard"

const tomorrow: TodoItemType[] = [

]
const weekly: TodoItemType[] = [
	{ id: crypto.randomUUID(), name: "Tidy Appartment", completed: false },
	{ id: crypto.randomUUID(), name: "Do Laundry", completed: false },
	{ id: crypto.randomUUID(), name: "Finish UI for Habits Site", completed: false },
	{ id: crypto.randomUUID(), name: "Update Minecraft Server Scripts", completed: false },
	{ id: crypto.randomUUID(), name: "Update Minecraft Server Scripts again but longer", completed: false },
	{ id: crypto.randomUUID(), name: "Do Laundry", completed: false },
]

const todoCards: TodoCardType[] = [
	{ id: crypto.randomUUID(), header: "Tomorrow", subheader: "Plan Tomorrow Today", initialTodos: tomorrow },

	{ id: crypto.randomUUID(), header: "Weekly/Overall", initialTodos: weekly }

]
function PlanningSection() {
	return (

		< div className="flex flex-col items-center gap-5 pb-10" >

			<h1 className="font-sans font-bold text-3xl p-4">Good Morning Benjamin!</h1>
			{
				todoCards.map((card) =>

					<TodoCard
						key={card.id}
						header={card.header}
						subheader={card.subheader}
						initialTodos={card.initialTodos}

					/>
				)

			}


		</div >

	)
}

export default PlanningSection
