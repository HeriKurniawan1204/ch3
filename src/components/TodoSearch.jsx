import { Search } from "react-bootstrap-icons";

import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useState, useContext } from "react";
import { TodoContext } from "../context/todoContext";

const TodoSearch = () => {
	const navigate = useNavigate();
	const { searchHandler } = useContext(TodoContext);
	const [query, setQuery] = useState("");

	return (
		<section className="mb-3">
			<h2 className="text-center py-2 fw-bold">TodoSearch</h2>
			<div className="row justify-content-between section-container">
				<div className="col-sm-8 p-0">
					<form>
						<div className="input-group mb-3">
							<span
								className="input-group-text color-primary"
								id="basic-addon1"
							>
								<Search />
							</span>
							<input
								type="text"
								className="form-control"
								placeholder="Search todo"
								value={query}
								onChange={(e) => setQuery(e.target.value)}
								aria-label="Search"
								aria-describedby="basic-addon1"
							/>
						</div>
						<button
							className="btn color-primary w-100"
							onClick={(e) => searchHandler(e, query)}
						>
							Search
						</button>
					</form>
				</div>
				<div className="col-sm-3 p-0">
					<button
						className="btn color-primary w-100"
						onClick={() => navigate("new")}
					>
						Add new Task
					</button>
				</div>
			</div>
		</section>
	);
};

TodoSearch.propTypes = {
	onSearchTodo: PropTypes.func,
};

export default TodoSearch;
