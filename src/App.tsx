import './App.css'
import Header from './Components/Header.tsx'
import TodoSection from './Components/TodoSection'
import MobileNavBar from './Components/MobileNavBar.tsx'


function App() {

	return (
		<>
			<div className='bg-slate-900 text-slate-100 min-h-screen w-full'>

				<main className='w-full px-4 pt-4 pb-24'>
					<Header />
					<TodoSection />
				</main>

				<MobileNavBar />


			</div >

		</>
	)
}

export default App
