import Checkbox from "./Checkbox";

interface TodoProps {
	name: string;
	type: string;
	completed: boolean;
	editible: boolean;
	onToggle?: () => void;
}

function Todo({ name, completed, onToggle, type, editible }: TodoProps) {

	return (


		<label className="flex justify-between items-center border border-slate-400 bg-slate-700 rounded-lg p-3 w-full">
			<h3 className="text-lg">{name}</h3>
			<Checkbox checked={completed} onChange={onToggle} editible={editible} />

		</label>




	)
}

export default Todo
