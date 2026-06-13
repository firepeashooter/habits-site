import TodoCard from "./TodoCard"

export interface TodoItemType {
	id: string;
	name: string;
	completed: boolean;
}

export interface TodoCardType {
	id: string;
	header: string;
	subheader?: string;
	initialTodos: TodoItemType[];
}

{/* Queried instances*/ }
const dailies: TodoItemType[] = [
	{ id: crypto.randomUUID(), name: "Complete a Leetcode", completed: false },
	{ id: crypto.randomUUID(), name: "Apply for Jobs", completed: false },
	{ id: crypto.randomUUID(), name: "Train Chess", completed: false },

]

{/* Queried instances*/ }
const currentTodos: TodoItemType[] = [
	{ id: crypto.randomUUID(), name: "Tidy Appartment", completed: false },
	{ id: crypto.randomUUID(), name: "Do Laundry", completed: false },
	{ id: crypto.randomUUID(), name: "Finish UI for Habits Site", completed: false },
	{ id: crypto.randomUUID(), name: "Update Minecraft Server Scripts", completed: false },
	{ id: crypto.randomUUID(), name: "Update Minecraft Server Scripts again but longer", completed: false },
	{ id: crypto.randomUUID(), name: "Do Laundry", completed: false },
]

const todoCards: TodoCardType[] = [
	{ id: crypto.randomUUID(), header: "Dailes", subheader: "Refreshes Everyday", initialTodos: dailies },

	{ id: crypto.randomUUID(), header: "Todo", subheader: "What are you doing today", initialTodos: currentTodos }

]


function TodoSection() {

	return (

		<div className="flex flex-col items-center gap-5 pb-10">
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


		</div>




	)
}

export default TodoSection
