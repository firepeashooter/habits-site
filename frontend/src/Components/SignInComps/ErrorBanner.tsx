interface ErrorBannerProps {
	bannerMessage: string;
}

function ErrorBanner({ bannerMessage }: ErrorBannerProps) {
	return (
		<div
			role="status"
			className="flex items-center gap-3 rounded-lg border bg-red-200 p-3 text-red-900 shadow-inner transition-all animate-fade-in"
		>
			{/* Standard Checkmark Icon (Static) */}
			<svg
				className="w-5 h-5 text-red-600"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
			>
				<path fillRule="evenodd" d="M2.25 12c0 5.385 4.365 9.75 9.75 9.75s9.75-4.365 9.75-9.75S17.385 2.25 12 2.25 2.25 6.365 2.25 12Zm15.197-5.432a.75.75 0 0 1 .154 1.05l-6 8.25a.75.75 0 0 1-1.127.075l-3.25-3.5a.75.75 0 0 1 1.096-1.025l2.623 2.824 5.454-7.5a.75.75 0 0 1 1.05-.154Z" clipRule="evenodd" />
			</svg>

			<p className="text-sm font-semibold leading-none">
				{bannerMessage}
			</p>
		</div>
	)
}

export default ErrorBanner
