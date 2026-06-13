
export function PlusIcon({ className = "w-6 h-6" }: { className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={2.0} /* Thicker stroke matches that premium mobile feel */
			stroke="currentColor"
			className={className}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				pathLength="1"
				d="M12 4.5v15m7.5-7.5h-15"
			/>
		</svg>
	);
}
