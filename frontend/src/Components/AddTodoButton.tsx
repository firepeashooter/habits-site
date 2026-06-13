import { PlusIcon } from "./PlusIcon"



function AddTodoButton() {
	return (

		<button className="flex justify-center items-center border border-slate-600 bg-slate-800 rounded-lg p-2 w-full opacity-50 active:opacity-100">
			<PlusIcon className="w-8 h-8 text-slate-300 pointer-events-none" />
		</button>
	)
}

export default AddTodoButton
