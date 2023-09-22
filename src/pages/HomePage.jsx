import TodoItems from "../components/TodoItems";
import TodoSearch from "../components/TodoSearch";

const HomePage = () => {
	return (
		<main className="container">
			<TodoSearch />
			<TodoItems />
		</main>
	);
};

export default HomePage;
