import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { PencilFill, TrashFill } from "react-bootstrap-icons";

const TodoItem = ({ todo, onDelete, onChecked }) => {
	const [isChecked, setIsChecked] = useState(todo.complete);
	const navigate = useNavigate();

	return (
		<div className="py-2 px-4 mb-2 d-flex align-items-center section-container">
			<p className={`${isChecked && "completed-todo"} w-100 mb-0`}>
				{todo.task}
			</p>
			<div className="d-flex">
				<div className="p-2 d-flex align-items-center justify-content-center">
					<input
						className="form-check-input"
						type="checkbox"
						checked={isChecked}
						onChange={() => {
							setIsChecked(!isChecked);
							onChecked(todo);
						}}
						id="flexCheckDefault"
					/>
				</div>
				<button
					className="btn text-warning"
					onClick={() =>
						navigate(`/${todo.id}/edit`, { state: { todo } })
					}
				>
					<PencilFill />
				</button>
				<button
					className="btn text-danger"
					onClick={() => onDelete(todo.id)}
				>
					<TrashFill />
				</button>
			</div>
		</div>
	);
};

TodoItem.propTypes = {
	todo: PropTypes.object,
	onDelete: PropTypes.func,
	onChecked: PropTypes.func,
};

export default TodoItem;
