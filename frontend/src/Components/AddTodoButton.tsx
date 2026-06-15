import { useState } from "react"
import { PlusIcon } from "./PlusIcon"


interface AddTodoButtonType {
	addTodo: (text: string) => void;
}


function AddTodoButton({ addTodo }: AddTodoButtonType) {

	const [isEditing, setIsEditing] = useState(false);
	const [text, setText] = useState('');

	if (isEditing) {
		return (
			<div className="flex justify-center items-center border border-slate-600 bg-slate-800 rounded-lg p-2 w-full">
				<input
					type="text"
					value={text}
					onChange={(e) => setText(e.target.value)}
					placeholder="Add a todo..."
					className="bg-transparent text-slate-200 outline-none w-full px-1"
					autoFocus
					onBlur={() => {
						if (!text.trim()) setIsEditing(false);
					}}
					onKeyDown={(e) => {
						if (e.key === 'Enter') {

							//We need to send text data back up so we call the callback function where our state is handeled
							addTodo(text)
							setText('');
							setIsEditing(false);
						} else if (e.key === 'Escape') {
							setIsEditing(false);
						}
					}}
				/>
			</div>
		);

	} else {
		return (

			<button

				onClick={() => setIsEditing(true)}

				className="flex justify-center items-center border border-slate-600 bg-slate-800 rounded-lg p-2 w-full opacity-50 active:opacity-100">
				<PlusIcon className="w-8 h-8 text-slate-300 pointer-events-none" />
			</button>

		)
	}


}


export default AddTodoButton
