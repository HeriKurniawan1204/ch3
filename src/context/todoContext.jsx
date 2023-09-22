import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";
import axios from "axios";

export const TodoContext = createContext();

export const TodoContextProvider = ({ children }) => {
	const API_URL = "http://localhost:8000/todos";

	const [query, setQuery] = useState("");
	const [isRefresh, setIsRefresh] = useState(true);
	const [todos, setTodos] = useState([]);
	const [queryResults, setQueryResults] = useState([]);

	useEffect(() => {
		try {
			const fetchData = async () => {
				const response = await axios.get(API_URL);
				const data = response.data;
				setTodos(data);
			};
			if (isRefresh) {
				fetchData();
				setIsRefresh(false);
			}
		} catch (err) {
			throw new Error("Failed to fetch data");
		}
	}, [setTodos, isRefresh]);

	const addTodoHandler = async (text) => {
		try {
			let id = uuid();

			const todo = {
				id: id,
				task: text,
				complete: false,
			};
			await axios.post(API_URL, todo);
			setIsRefresh(true);
		} catch (err) {
			console.error(err);
		}
	};

	const deleteTodoHandler = async (id) => {
		try {
			await axios.delete(API_URL + `/${id}`);
			setIsRefresh(true);
		} catch (err) {
			console.error(err);
		}
	};

	const checkedTodoHandler = async (todo) => {
		try {
			todo.complete = !todo.complete;
			await axios.put(API_URL + `/${todo.id}`, todo);
		} catch (err) {
			console.error(err);
		}
	};

	const editTodoHandler = async (todo, newTask) => {
		try {
			const updatedTodo = { ...todo, task: newTask };
			await axios.put(API_URL + `/${todo.id}`, updatedTodo);
			setIsRefresh(true);
		} catch (err) {
			console.error(err);
		}
	};

	const deleteDoneTaskHandler = async () => {
		try {
			const completedTodoId = todos
				.filter((todo) => todo.complete === true)
				.map((todo) => todo.id);

			for (const id of completedTodoId) {
				await axios.delete(API_URL + `/${id}`);
			}

			setIsRefresh(true);
		} catch (err) {
			console.error(err);
		}
	};

	const deleteAllTaskHandler = async () => {
		try {
			const todoId = todos.map((todo) => todo.id);
			for (const id of todoId) {
				await axios.delete(API_URL + `/${id}`);
			}
			setIsRefresh(true);
		} catch (err) {
			console.error(err);
		}
	};

	const searchHandler = (e, query) => {
		e.preventDefault();
		if (query.length === 0) {
			setQueryResults([]);
			return;
		}

		setQueryResults(
			todos.filter((todo) =>
				todo.task.toLowerCase().includes(query.toLowerCase())
			)
		);
	};

	return (
		<TodoContext.Provider
			value={{
				query,
				setQuery,
				queryResults,
				searchHandler,
				deleteDoneTaskHandler,
				deleteAllTaskHandler,
				deleteTodoHandler,
				checkedTodoHandler,
				addTodoHandler,
				editTodoHandler,
				todos,
			}}
		>
			{children}
		</TodoContext.Provider>
	);
};

TodoContextProvider.propTypes = {
	children: PropTypes.node,
};
