import { Fragment, useContext } from "react";
// pts
import PropTypes from "prop-types";
// redux
import { connect } from "react-redux";
import { setAlert } from "../store/actions/alertActions";
// router
import { Switch, Route } from "react-router-dom";
import { __RouterContext } from "react-router";
// spring
import { useTransition, animated } from "react-spring";
// common routes
import Landing from "../components/pages/landing/landing";
import List from "../components/pages/list/list";
import Ball from "../components/pages/ball/ball";
import Explosion from "../components/pages/explosion/explosion";
import BlackHole from "../components/pages/blackHole/blackHole";
import Carousel from "../components/pages/carousel/carousel";
import Cannon from "../components/pages/cannon/cannon";

const Routes = ({ addAlert }) => {
	const { location } = useContext(__RouterContext);
	// switch routes animation
	const transitions = useTransition(location, (location) => location.pathname, {
		from: {
			opacity: 0,
			transform: "translate3d(0%, -30%, 0) scale(0.25)",
			position: "absolute",
			width: "100%",
		},
		enter: {
			opacity: 1,
			transform: "translate3d(0%, 0%, 0) scale(1.0)",
			position: "relative",
			width: "100%",
		},
		leave: {
			opcatity: 0,
			transform: "translate3d(-100%, 0%, 0) scale(0.25)",
			position: "absolute",
			width: "100%",
		},
		onRest: (item, state) => {
			// console.log("item: ", item);
			// console.log("state: ", state);

			function getPageName(path) {
				switch (path) {
					case "/carousel":
						return "Carousel page";
					case "/list":
						return "List page";
					case "/ball":
						return "Ball page";
					case "/explosion":
						return "Big Bang page";
					case "/bh":
						return "Black hole page";
					case "/cannon":
						return "Stars cannon page";
					default:
						return "Main page";
				}
			}

			switch (state) {
				case "enter":
					return addAlert(getPageName(item.pathname), "success");
				case "update":
					return addAlert(getPageName(item.pathname), "success");
				default:
					break;
			}
		},
		config: { duration: 500 },
	});

	return (
		<Fragment>
			{transitions.map(({ item, props, key }) => (
				<animated.div key={key} style={props}>
					<Switch location={item}>
						<Route exact path="/carousel" component={Carousel} />
						<Route exact path="/bh" component={BlackHole} />
						<Route exact path="/explosion" component={Explosion} />
						<Route exact path="/ball" component={Ball} />
						<Route exact path="/list" component={List} />
						<Route exact path="/cannon" component={Cannon} />
						<Route exact path="/" component={Landing} />
					</Switch>
				</animated.div>
			))}
		</Fragment>
	);
};

Routes.propTypes = {
	addAlert: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
	return {
		addAlert: (msg, type) => dispatch(setAlert(msg, type)),
	};
};

export default connect(null, mapDispatchToProps)(Routes);
