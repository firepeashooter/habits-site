import './App.css'
import Header from './Components/Header.tsx'
import TodoSection from './Components/TodoSection'
import MobileNavBar from './Components/MobileNavBar.tsx'
import { useState } from 'react'


function App() {

	const [activeTab, setActiveTab] = useState("home")

	// Helper function to translate the activeTab string into a CSS percentage shift
	const getTranslateX = () => {
		if (activeTab === "home") return "translate-x-0";       // Show page 1
		if (activeTab === "todos") return "-translate-x-1/2";   // Slide left to show page 2
		return "translate-x-0";
	};

	return (
		<>
			<div className='bg-slate-900 text-slate-100 min-h-screen w-full'>

				<main className='w-full px-4 pt-4 pb-24'>
					<Header />
					<div className='w-full overflow-hidden'>

						{/* 200% means it can hold 2 sections worth*/}
						<div className={`flex w-[200%] transition-transform duration-300 ease-in-out ${getTranslateX()}`}>

							{/* w-1/2 tells it how much to take up*/}
							<section className='w-1/2 shrink-0'>
								<TodoSection />
							</section>
							<section className='w-1/2 shrink-0'>
								<TodoSection />
							</section>
						</div>
					</div>
				</main>

				<MobileNavBar activeTab={activeTab} setActiveTab={setActiveTab} />


			</div >

		</>
	)
}

export default App
