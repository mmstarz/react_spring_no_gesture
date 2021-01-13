import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// redux
import { Provider as ReduxProvider } from "react-redux";
import store from "./store/store";
// routes
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./components/layout/layout";
import Routes from "./routes/routes";
// import AnimatedRoutes from './routes/animatedRoutes';
// material-ui
import {
	unstable_createMuiStrictModeTheme,
	ThemeProvider,
} from "@material-ui/core/styles";
const theme = unstable_createMuiStrictModeTheme();

const App = () => {
	return (
		<ReduxProvider store={store}>
			<Router>
				<Layout>
					<Routes />
					{/* <AnimatedRoutes /> */}
				</Layout>
			</Router>
		</ReduxProvider>
	);
};

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
