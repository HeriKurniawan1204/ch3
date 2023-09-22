/* eslint-disable no-mixed-spaces-and-tabs */
import TodoItem from "./TodoItem";
import PropTypes from "prop-types";

import { useState } from "react";
import { useContext } from "react";
import { TodoContext } from "../context/todoContext";

const TodoItems = () => {
	const {
		todos,
		queryResults,
		deleteTodoHandler,
		checkedTodoHandler,
		deleteDoneTaskHandler,
		deleteAllTaskHandler,
	} = useContext(TodoContext);

	const [filter, setFilter] = useState("all");

	const results = queryResults.length !== 0 ? queryResults : todos;

	const filteredTodos =
		filter === "all"
			? results
			: filter === "done"
			? results.filter((todo) => todo.complete === true)
			: filter === "todo" &&
			  results.filter((todo) => todo.complete === false);

	return (
		<section className="mb-5">
			<h2 className="text-center mb-3">TodoList</h2>
			<div className="d-flex flex-row gap-4 mb-2">
				<button
					className="btn w-100 color-primary"
					onClick={() => setFilter("all")}
				>
					All
				</button>
				<button
					className="btn w-100 color-primary"
					onClick={() => setFilter("done")}
				>
					Done
				</button>
				<button
					className="btn w-100 color-primary"
					onClick={() => setFilter("todo")}
				>
					Todo
				</button>
			</div>
			<ul className="list-unstyled">
				{filteredTodos.length !== 0 ? (
					[...filteredTodos].reverse().map((todo) => (
						<li key={todo.id}>
							<TodoItem
								todo={todo}
								onDelete={deleteTodoHandler}
								onChecked={checkedTodoHandler}
							/>
						</li>
					))
				) : (
					<h3 className="text-center p-5 my-3 border border-1 rounded-2 text-black-50">
						No task available
					</h3>
				)}
			</ul>
			<div className="d-flex gap-4">
				<button
					className="btn btn-danger w-100"
					onClick={deleteDoneTaskHandler}
				>
					Delete done tasks
				</button>
				<button
					className="btn btn-danger w-100"
					onClick={deleteAllTaskHandler}
				>
					Delete all tasks
				</button>
			</div>
		</section>
	);
};

TodoItems.propTypes = {
	todos: PropTypes.array,
	onDelete: PropTypes.func,
	onChecked: PropTypes.func,
	onDeleteAllTask: PropTypes.func,
	onDeleteDoneTask: PropTypes.func,
	filter: PropTypes.string,
	setFilter: PropTypes.func,
};

export default TodoItems;
