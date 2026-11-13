import { useState } from 'react';
import Raypfp from '../../assets/thumb-1920-376165.png'

export interface HeaderProps {
	setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
	menuOpen: boolean;
}

function Header({ setMenuOpen, menuOpen }: HeaderProps) {

	return (

		<nav className='flex justify-between items-center p-4 text-slate-100 w-full'>

			<h1 className='font-sans font-bold text-lg'>
				{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
			</h1>

			<button type="button" onClick={() => { setMenuOpen(!menuOpen) }} className='w-13 h-13 rounded-full overflow-hidden bg-amber-700'>
				<img className='w-full h-full object-cover' src={Raypfp} alt="Profile picture image" />
			</button>
		</nav>

	)
}

export default Header
