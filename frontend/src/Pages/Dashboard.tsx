import Header from '../Components/DashboardComps/Header.tsx'
import TodoSection from '../Components/DashboardComps/TodoSection'
import MobileNavBar from '../Components/DashboardComps/MobileNavBar.tsx'
import { useState } from 'react'
import PlanningSection from '../Components/DashboardComps/Planningsection.tsx'


function Dashboard() {

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
								<PlanningSection />
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
