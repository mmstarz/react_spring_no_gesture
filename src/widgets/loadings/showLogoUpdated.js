import { useContext, useCallback } from "react";
import { __RouterContext } from "react-router";
// spring
import { useTransition, animated } from "react-spring";
// mui els
import Box from "@material-ui/core/Box";
// icons
import RedditIcon from "@material-ui/icons/Reddit";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import TelegramIcon from "@material-ui/icons/Telegram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import PinterestIcon from "@material-ui/icons/Pinterest";
import GitHubIcon from "@material-ui/icons/GitHub";
// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	wrapper: {
		position: "absolute",
		top: 0,
		left: 0,
	},
	box_loading: {
		width: 150,
		height: 150,
	},
	icon_logo: {
		color: "inherit",
		width: 150,
		height: 150,
		filter: "drop-shadow(0px 0px 2px black)",
	},
}));

// config.default	{ mass: 1, tension: 170, friction: 26 }
// config.gentle	{ mass: 1, tension: 120, friction: 14 }
// config.wobbly	{ mass: 1, tension: 180, friction: 12 }
// config.stiff	{ mass: 1, tension: 210, friction: 20 }
// config.slow	{ mass: 1, tension: 280, friction: 60 }
// config.molasses { mass: 1, tension: 280, friction: 120 }

const ShowLogoUpdated = () => {
	const classes = useStyles();

	const randomColor = () => {
		let res = "#" + Math.floor(Math.random() * 16777215).toString(16);
		return res;
	};

	const { location } = useContext(__RouterContext);

	const renderLogo = useCallback(
		(pathname) => {
			switch (pathname) {
				case "/bh":
					return <TwitterIcon classes={{ root: classes.icon_logo }} />;
				case "/list":
					return <FacebookIcon classes={{ root: classes.icon_logo }} />;
				case "/ball":
					return <LinkedInIcon classes={{ root: classes.icon_logo }} />;
				case "/cannon":
					return <RedditIcon classes={{ root: classes.icon_logo }} />;
				case "/carousel":
					return <TelegramIcon classes={{ root: classes.icon_logo }} />;
				case "/explosion":
					return <PinterestIcon classes={{ root: classes.icon_logo }} />;
				default:
					return <GitHubIcon classes={{ root: classes.icon_logo }} />;
			}
		},
		[classes]
	);

	const transitions = useTransition(location, (location) => location.pathname, {
		from: {
			display: 0,
			opacity: 0,
			transform: [-192, 192, 0, 0.25, 360, -360],
		},
		enter: (item) => async (next) => {
			await next({
				display: 1,
				opacity: 1,
				transform: [-96, 128, 0, 0.25, 360, -360],
			});
			await next({
				display: 1,
				opacity: 1,
				transform: [8, 104, 0, 0.5, 180, -180],
			});
			await next({
				display: 1,
				opacity: 1,
				transform: [8, 104, 0, 1, 0, 0],
			});
		},
		leave: (item) => async (next, cancel) => {
			await next({
				display: 0,
				opacity: 0,
				transform: [-192, 192, 0, 0.25, 90, -360],
			});
		},
		onRest: (item, state) => {
			// console.log("item: ", item);
			// console.log("state: ", state);
		},
		config: { duration: 500 },
	});

	return transitions.map(({ item, key, props }) => {
		// console.log("item.pathname: ", item.pathname);

		return (
			<animated.a
				/*
				 	no sense of link usage here.
				 	bcs layout animations parent has lower z-index
				 	than the main screen component
				*/
				// target="_blank"
				// rel="noopener noreferrer"
				// aria-label="linkedin-link"
				// component="a"
				// href={renderLink(item.pathname)}

				key={key}
				className={classes.wrapper}
				style={{
					display: props.display
						.interpolate([0, 1], [0, 1])
						.interpolate((val) => (val < 1 ? "none" : "block")),
					opacity: props.opacity.interpolate(
						[0, 0.3, 0.6, 1],
						[0, 0.25, 0.5, 1]
					),
					transform: props.transform.interpolate(
						(x, y, z, s, r, rz) => `						
						translate3d(${x}px, ${y}px, ${z}px)
						scale(${s})
						rotate3d(1, 1, 0, ${r}deg)
						rotateZ(${rz}deg)						
					`
					),
					WebkitTransform: props.transform.interpolate(
						(x, y, z, s, r, rz) => `						
						translate3d(${x}px, ${y}px, ${z}px)
						scale(${s})
						rotate3d(1, 1, 0, ${r}deg)
						rotateZ(${rz}deg)
					`
					),
				}}
				children={
					<Box
						component="div"
						style={{ color: randomColor() }}
						classes={{ root: classes.box_loading }}
					>
						{renderLogo(item.pathname)}
					</Box>
				}
			/>
		);
	});
};

export default ShowLogoUpdated;
