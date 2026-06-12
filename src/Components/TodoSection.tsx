import TodoCard from "./TodoCard"

export interface TodoItem {
	id: string;
	name: string;
	completed: boolean;
}

export interface TodoCard {
	id: string;
	header: string;
	subheader: string;
	initialTodos: TodoItem[];
}

const dailies: TodoItem[] = [
	{ id: crypto.randomUUID(), name: "Complete a Leetcode", completed: false },
	{ id: crypto.randomUUID(), name: "Apply for Jobs", completed: false },
	{ id: crypto.randomUUID(), name: "Train Chess", completed: false },

]

const initialTodos: TodoItem[] = [
	{ id: crypto.randomUUID(), name: "Tidy Appartment", completed: false },
	{ id: crypto.randomUUID(), name: "Do Laundry", completed: false },
	{ id: crypto.randomUUID(), name: "Finish UI for Habits Site", completed: false },
	{ id: crypto.randomUUID(), name: "Update Minecraft Server Scripts", completed: false },
	{ id: crypto.randomUUID(), name: "Update Minecraft Server Scripts again but longer", completed: false },
	{ id: crypto.randomUUID(), name: "Do Laundry", completed: false },
]

const todoCards: TodoCard[] = [
	{ id: crypto.randomUUID(), header: "Dailes", subheader: "Refreshes Everyday", initialTodos: dailies },

	{ id: crypto.randomUUID(), header: "Todo", subheader: "What are you doing today", initialTodos: initialTodos }

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
