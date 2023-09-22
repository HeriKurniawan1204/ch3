import { Journal } from "react-bootstrap-icons";

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TodoContext } from "../context/todoContext";

const NewTask = () => {
	const { addTodoHandler } = useContext(TodoContext);
	const [text, setText] = useState("");
	const navigate = useNavigate();

	const saveHandler = (e) => {
		e.preventDefault();
		addTodoHandler(text);
		navigate("/");
	};

	return (
		<main className="container">
			<h2 className="text-center my-3">New Todo</h2>
			<form>
				<div className="input-group mb-3">
					<span
						className="input-group-text color-primary"
						id="basic-addon1"
					>
						<Journal />
					</span>
					<input
						type="text"
						className="form-control"
						placeholder="Add new task"
						value={text}
						onChange={(e) => setText(e.target.value)}
						aria-label="Search"
						aria-describedby="basic-addon1"
					/>
				</div>
				<div className="d-flex gap-3">
					<button
						className="btn color-primary w-100"
						onClick={saveHandler}
					>
						Save
					</button>
					<button
						className="btn btn-secondary w-100"
						onClick={() => navigate("/")}
					>
						Back
					</button>
				</div>
			</form>
		</main>
	);
};

export default NewTask;
