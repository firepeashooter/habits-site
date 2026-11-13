import Header from '../Components/DashboardComps/Header.tsx'
import TodoSection from '../Components/DashboardComps/TodaySection/TodoSection'
import MobileNavBar from '../Components/DashboardComps/MobileNavBar.tsx'
import { useState, useEffect } from 'react'
import PlanningSection from '../Components/DashboardComps/PlanningSection/Planningsection.tsx'
import type { UUID } from 'node:crypto'
import HistorySection from '../Components/DashboardComps/HistorySection/HistorySection.tsx'
import UserMenu from '../Components/DashboardComps/UserMenu.tsx'


function Dashboard() {

	const [curTodos, setCurTodos] = useState([])
	const [dailyTodos, setDailyTodos] = useState([])
	const [tomorrowTodos, setTomorrowTodos] = useState([])

	const [activeTab, setActiveTab] = useState("home")
	const [menuOpen, setMenuOpen] = useState(false)

	//TODO: This formatting shoudl be done in the big fetch function
	const [dateToday, setdateToday] = useState(() => {
		const today = new Date();
		const year = today.getFullYear();
		const month = String(today.getMonth() + 1).padStart(2, '0');
		const day = String(today.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	});


	const [dateTomorrow, setdateTomorrow] = useState(() => {
		const tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);
		const year = tomorrow.getFullYear();
		const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
		const day = String(tomorrow.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	});

	//Helper function to map backend json to frontend array
	function dataToArray(data) {

		const simplifiedData = data.map((todo) => (
			{
				id: todo.id,
				name: todo.name,
				completed: todo.is_completed
			})
		)
		return simplifiedData
	}

	useEffect(() => {
		async function fetchAllTodoLists() {

			const token = localStorage.getItem("accessToken");
			const headers = {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			}

			//TODO: The dailies need to be reworked somehow
			try {

				console.log("fetching data....");
				const [dailyData, todayData, tomorrowData] = await Promise.all([
					fetch('http://127.0.0.1:8000/api/habits/getDailies/', { method: "GET", headers }),
					fetch(`http://127.0.0.1:8000/api/habits/todoInstanceList/?date=${dateToday}`, { method: "GET", headers }),
					fetch(`http://127.0.0.1:8000/api/habits/todoInstanceList/?date=${dateTomorrow}`, { method: "GET", headers })
				])

				const rawDailies = await dailyData.json();
				const rawTodays = await todayData.json();
				const rawTomorrows = await tomorrowData.json();

				const dailies = dataToArray(rawDailies);
				const todays = dataToArray(rawTodays);
				const tomorrows = dataToArray(rawTomorrows);

				setCurTodos(todays);
				setDailyTodos(dailies);
				setTomorrowTodos(tomorrows);


			} catch (error) {
				console.log(error)

			}
		}

		fetchAllTodoLists()
	}, []);

	async function postTodo(date: String, text: String, id: UUID) {
		const token = localStorage.getItem("accessToken");

		const headers = {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`
		};

		console.log("Adding Entry to Backend");

		try {

			const response = await fetch(`http://127.0.0.1:8000/api/habits/createInstance/`, {
				method: "POST",
				headers,
				body: JSON.stringify({
					id: id,
					date: date,
					name: text,
					is_completed: false,
					is_daily: false
				})
			});

			if (!response.ok) {
				throw new Error("Failed to Save");
				//TODO: and eventually remove it from the frontend list
			}

			const data = await response.json()
			console.log(data)

		} catch (error) {
			console.log(error);
		}

	}

	function addTodoList(text: string, type: string) {

		const clientID = crypto.randomUUID()

		if (type === 'current') {

			//Add our new todo with our text
			const updatedCurTodos = [...curTodos, { id: clientID, todoID: "master-3", name: text, completed: false }]
			setCurTodos(updatedCurTodos)

			postTodo(dateToday, text, clientID);


		} else if (type === 'tomorrow') {

			const updatedTmrwTodos = [...tomorrowTodos, { id: clientID, todoID: "master-3", name: text, completed: false }]
			setTomorrowTodos(updatedTmrwTodos)

			postTodo(dateTomorrow, text, clientID);

		} else if (type === 'daily') {
			//Add our new todo with our text
			const updatedDailyTodos = [...dailyTodos, { id: clientID, todoID: "master-3", name: text, completed: false }]
			setDailyTodos(updatedDailyTodos)
		}

	}

	function removeTodoList(id: UUID, type: String) {

		if (type === 'current') {
			setCurTodos(prevTodos =>
				prevTodos.filter(todo => todo.id !== id)
			);

		} else if (type === 'daily') {

			setDailyTodos(prevTodos =>
				prevTodos.filter(todo => todo.id !== id)
			);

		} else if (type === 'tomorrow') {

			setTomorrowTodos(prevTodos =>
				prevTodos.filter(todo => todo.id !== id)
			);

		}

	}



	async function patchToggleTodo(id: UUID) {
		const token = localStorage.getItem("accessToken");

		const headers = {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`
		};

		console.log("Adding Entry to Backend");

		try {

			const response = await fetch(`http://127.0.0.1:8000/api/habits/toggleInstanceComplete/${id}`, {
				method: "PATCH",
				headers,
			});

			if (!response.ok) {
				throw new Error("Failed to Toggle");

				//TODO: Could we just call toggle todo again?
			}

			const data = await response.json()
			console.log(data)

		} catch (error) {
			console.log(error);

			//TODO: Could we just call toggle todo again?
		}

	}

	function toggleTodo(id: string, type: string) {

		if (type === 'current') {

			patchToggleTodo(id)

			setCurTodos(prevTodos =>
				prevTodos.map(todo =>
					todo.id === id ? { ...todo, completed: !todo.completed } : todo // if the id is the one we just clicked, update it
				)
			);

		} else if (type === 'daily') {

			patchToggleTodo(id)

			setDailyTodos(prevTodos =>
				prevTodos.map(todo =>
					todo.id === id ? { ...todo, completed: !todo.completed } : todo // if the id is the one we just clicked, update it
				)
			);
		} else if (type === 'tomorrow') {

			patchToggleTodo(id);

			setTomorrowTodos(prevTodos =>
				prevTodos.map(todo =>
					todo.id === id ? { ...todo, completed: !todo.completed } : todo // if the id is the one we just clicked, update it
				)
			);
		}

	}

	// Helper function to translate the activeTab string into a CSS percentage shift
	const getTranslateX = () => {
		if (activeTab === "home") return "-translate-x-1/3";       // Show page 1
		if (activeTab === "todos") return "-translate-x-2/3";   // Slide left to show page 2
		if (activeTab === "history") return "-translate-x-0"; // Not sure why -2/3 but ok
		return "translate-x-0";
	};

	return (

		<>
			<div className='bg-slate-900 text-slate-100 min-h-screen w-full'>

				<main className='w-full px-4 pt-4 pb-24'>
					<Header setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
					{menuOpen && <UserMenu />}
					<div className='w-full overflow-hidden'>

						{/* 200% means it can hold 2 sections worth*/}
						<div className={`flex w-[300%] transition-transform duration-300 ease-in-out ${getTranslateX()}`}>

							{/* w-1/2 tells it how much to take up*/}
							<section className='w-1/3 shrink-0'>
								<HistorySection />
							</section>
							<section className='w-1/3 shrink-0'>
								<TodoSection dailyTodos={dailyTodos} curTodos={curTodos} addTodoList={addTodoList} toggleTodo={toggleTodo} />
							</section>
							<section className='w-1/3 shrink-0'>
								<PlanningSection tomorrowTodos={tomorrowTodos} addTodoList={addTodoList} toggleTodo={toggleTodo} />
							</section>
						</div>
					</div>
				</main>

				<MobileNavBar activeTab={activeTab} setActiveTab={setActiveTab} />


			</div >

		</>
	)
}

export default Dashboard
