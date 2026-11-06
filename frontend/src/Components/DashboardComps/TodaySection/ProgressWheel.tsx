interface ProgressCircleProps {
	completedCount: number;
	totalCount: number;
}

export default function ProgressWheel({ completedCount, totalCount }: ProgressCircleProps) {
	// Prevent division by zero if there are no todos
	const percentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

	// SVG Math for the circle path
	const radius = 16;
	const circumference = 2 * Math.PI * radius; // Around 100.53
	const strokeDashoffset = circumference - (percentage / 100) * circumference;

	return (
		<div className="relative flex items-center justify-center w-15 h-15">
			<svg className="w-full h-full transform -rotate-90" viewBox="0 0 40 40">
				{/* Background Track Circle */}
				<circle
					cx="20"
					cy="20"
					r={radius}
					className="text-slate-600"
					strokeWidth="3.5"
					stroke="currentColor"
					fill="transparent"
				/>
				{/* Animated Progress Circle */}
				<circle
					cx="20"
					cy="20"
					r={radius}
					className="text-emerald-500 transition-all duration-500 ease-in-out"
					strokeWidth="3.5"
					strokeDasharray={circumference}
					strokeDashoffset={strokeDashoffset}
					strokeLinecap="round"
					stroke="currentColor"
					fill="transparent"
				/>
			</svg>

			{/* Centered Percentage Text */}
			<span className="absolute text-[13px] font-bold text-slate-200">
				{Math.round(percentage)}%
			</span>
		</div>
	);
}
