import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage";
import NewTask from "./pages/NewTask";
import EditTask from "./pages/EditTask";

const routes = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
	},
	{
		path: "/new",
		element: <NewTask />,
	},
	{
		path: "/:id/edit",
		element: <EditTask />,
	},
]);
const App = () => {
	return <RouterProvider router={routes} />;
};

export default App;
