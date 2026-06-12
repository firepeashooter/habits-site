import { useState } from "react";
function MobileNavBar() {

	const [activeTab, setActiveTab] = useState("home");

	const navigationItems = [
		{
			id: "home", label: "Home", icon: (
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
					<path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
				</svg>
			)
		},
		{
			id: "todos", label: "Dashboard", icon: (
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
					<path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
				</svg>
			)
		},
		{
			id: "projects", label: "Projects", icon: (
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
					<path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
				</svg>
			)
		},

		{
			id: "Chess", label: "Chess", icon: (
				<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
					<path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
				</svg>
			)
		},
	];

	return (
		<nav className="fixed bottom-0 left-0 right-0 h-16 bg-slate-900/95 backdrop-blur-md border-t border-slate-800/80 p-3 z-50">
			<div className="flex h-full items-center justify-around">
				{navigationItems.map((item) => {
					const isActive = activeTab === item.id;

					return (
						<button
							key={item.id}
							onClick={() => setActiveTab(item.id)}
							className="flex flex-col items-center justify-center w-20 h-full relative"
						>
							{/* Icon layout with a smooth micro-interaction shift up when active */}
							<div className={`transition-all duration-200 ${isActive ? "text-emerald-400 -translate-y-0.5 scale-110" : "text-slate-400"
								}`}>
								{item.icon}
							</div>

							{/* Text Label */}
							<span className={`text-[10px] font-medium tracking-wide mt-1 transition-colors ${isActive ? "text-emerald-400" : "text-slate-500"
								}`}>
								{item.label}
							</span>

						</button>
					);
				})}
			</div>
		</nav>
	);
}

export default MobileNavBar
