
interface TodoProps {
	name: string;
	completed: boolean;
}

function Todo({ name, completed }: TodoProps) {

	return (


		<div className=" border border-slate-400 bg-slate-700 rounded-lg p-3 w-full">
			<h3 className="text-lg">{name}</h3>

		</div>




	)
}

export default Todo
