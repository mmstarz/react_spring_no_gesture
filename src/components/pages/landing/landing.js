import {
	useRef,
	useState,
	useCallback,
	useLayoutEffect,
	useEffect,
} from "react";
// router
import { Link } from "react-router-dom";
// spring
import {
	useChain,
	useSpring,
	useTransition,
	animated,
	config,
} from "react-spring";
// els
import StarParallax from "./stars/starParallax";
import Spinner from "../../../widgets/spinner/spinner";
// mui
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
// icons
import CloseIcon from "@material-ui/icons/Close";
// styles
import { makeStyles } from "@material-ui/core/styles";
// data
import data from "./navLinks";

const useStyles = makeStyles((theme) => ({
	landing_wrapper: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		overflow: "hidden",
		"& .stars_wrapper": {
			position: "absolute",
			top: "0%",
			left: "0%",
			width: "100%",
			height: "100%",
			overflow: "hidden",
		},
	},
	enter: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexWrap: "wrap",
		filter: "drop-shadow(1px 1px 2px black)",
		cursor: "pointer"
	},	
	select_headline: {
		fontSize: "0.85rem",
	},
	linkWrapper: {
		margin: theme.spacing(0.5, 0.5),
		filter: "drop-shadow(1px 1px 1px black)",
		borderRadius: theme.spacing(0.5),
	},
	link: {
		width: "100%",
		height: "100%",
		padding: theme.spacing(1),
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		textDecoration: "none",
		color: "#546E7A",
		"&:hover": {
			color: "black",
			background: "aliceblue",
		},
	},
	actions: {
		width: "100%",
		height: 50,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		"& > span": {
			position: "absolute",
			top: 0,
			right: 0,
		},
	},
}));

const linkMargin = 8;

const calcMove = (x, y) => [
	x - window.innerWidth / 2,
	y - window.innerHeight / 2,
	1,
];

const Landing = () => {
	const classes = useStyles();

	const [hide, setHide] = useState(true);
	const [sizes, setSizes] = useState({ w: 0, h: 0 });
	const [loading, setLoading] = useState(true);

	// start btn
	const startRef = useRef();
	const handleStart = useCallback(
		(show) => ({
			ref: startRef,
			config: config.stiff,
			from: {
				open: 1,
			},
			to: {
				open: show ? 1 : 0,
			},
		}),
		[]
	);
	const [start, setStart] = useSpring(() => handleStart(true));

	// headline block
	const headlineRef = useRef();
	const handleHeadline = useCallback(
		(show) => ({
			ref: headlineRef,
			config: config.stiff,
			from: {
				open: 0,
			},
			to: {
				open: show ? 1 : 0,
			},
		}),
		[]
	);
	const [headline, setHeadline] = useSpring(() => handleHeadline(false));

	// enter block
	const springRef = useRef();
	const handleSpring = useCallback(
		(show, w, h) => ({
			ref: springRef,
			config: config.stiff,
			from: {
				size: [w, h],
				radius: 0,
				shadow: 0,
				bg: "aliceblue",
			},
			to: {
				size: !show ? [w, h] : [w * 2, h * 2],
				radius: !show ? 0 : 1,
				shadow: !show ? 1 : 0,
				bg: !show ? "aliceblue" : "white",
			},
		}),
		[]
	);

	const [spring, setSpring] = useSpring(() =>
		handleSpring(false, window.innerWidth / 4, window.innerWidth / 4)
	);

	// links block
	const transRef = useRef();
	const transitions = useTransition(hide ? [] : data, (item) => item.name, {
		ref: transRef,
		unique: true,
		trail: 800 / data.length,
		from: { opacity: 0, transform: "scale(0)" },
		enter: { opacity: 1, transform: "scale(1)" },
		leave: { opacity: 0, transform: "scale(0)" },
	});

	// parallax stars
	const [star, setStar] = useSpring(() => ({
		xys: [0, 0, 1],
		opacity: 1,
		config: { mass: 10, tension: 550, friction: 140 },
	}));

	const showStars = useCallback(
		(x, y) => {
			if (hide) setStar({ xys: calcMove(x, y), opacity: 1 });
		},
		[hide, setStar]
	);

	const hideStars = useCallback(() => {
		setHide(!hide);
		if (!hide) {
			setStar({ xys: calcMove(0, 0), opacity: 1 });
		} else {
			setStar({ xys: calcMove(0, 0), opacity: 0 });
		}

		setStart(handleStart(!hide));
		setHeadline(handleHeadline(hide));
		setSpring(handleSpring(hide, sizes.w, sizes.h));
	}, [
		hide,
		sizes,
		setStar,
		setSpring,
		handleSpring,
		setHeadline,
		handleHeadline,
		setStart,
		handleStart,
	]);

	useChain(
		!hide
			? [startRef, springRef, headlineRef, transRef]
			: [transRef, headlineRef, springRef, startRef],
		[0, !hide ? 0.3 : 0.9, !hide ? 0.6 : 1.2, !hide ? 0.9 : 1.5]
	);

	const handleResize = useCallback(
		(e) => {
			// console.log("@resize");
			const wh = e === undefined ? window.innerHeight : e.target.innerHeight;
			const ww = e === undefined ? window.innerWidth : e.target.innerWidth;

			// console.log("@resize: ", ww, " x ", wh);

			function calculations(side, divider, status) {
				setSizes({ w: side / divider, h: side / divider });
				setStart(handleStart(status));
				setHeadline(handleHeadline(!status));
				setSpring(handleSpring(!status, side / divider, side / divider));
				setLoading(false);
			}

			if (ww < wh) {
				if (ww >= 900) {
					calculations(ww, 5, hide);
				} else if (ww >= 600 && ww < 900) {
					calculations(ww, 4, hide);
				} else if (ww >= 300 && ww < 600) {
					calculations(ww, 3, hide);
				} else if (ww < 300) {
					calculations(ww, 2.5, hide);
				}				
			} else if (ww > wh) {
				if (wh >= 900) {
					calculations(wh, 5, hide);
				} else if (wh >= 600 && wh < 900) {
					calculations(wh, 4, hide);
				} else if (wh >= 300 && wh < 600) {
					calculations(wh, 3, hide);
				} else if (wh < 300) {
					calculations(wh, 2.5, hide);
				}				
			} else if (ww === wh) {
				if (wh >= 900) {
					calculations(wh, 5, hide);
				} else if (wh >= 600 && wh < 900) {
					calculations(wh, 4, hide);
				} else if (wh >= 300 && wh < 600) {
					calculations(wh, 3, hide);
				} else if (wh < 300) {
					calculations(wh, 2.5, hide);
				}
			}
		},
		[
			hide,
			setSpring,
			handleSpring,
			setHeadline,
			handleHeadline,
			setStart,
			handleStart,
		]
	);

	useLayoutEffect(() => {
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [handleResize]);

	useEffect(() => {
		let mount = true;

		if (mount && loading) {
			handleResize();
		}

		return () => {
			// clean section
		};
	}, [loading, handleResize]);

	const parallaxStars = [
		{ speed: 12, position: { x: -200, y: -100 }, color: "aliceblue" },
		{ speed: 10, position: { x: 100, y: -100 }, color: "deeppink" },
		{ speed: 6, position: { x: -50, y: -200 }, color: "cyan" },
		{ speed: 14, position: { x: 50, y: 50 }, color: "lightblue" },
		{ speed: 8, position: { x: -150, y: 50 }, color: "springgreen" },
	];

	return (
		<Box
			classes={{ root: classes.landing_wrapper }}
			style={{
				width: "100%",
				height: "100vh",
			}}
			onMouseMove={({ clientX: x, clientY: y }) =>
				hide ? showStars(x, y) : null
			}
			onTouchMove={({ changedTouches }) =>
				hide
					? showStars(changedTouches[0].clientX, changedTouches[0].clientY)
					: null
			}
		>
			{loading && <Spinner />}

			{!loading && (
				<Box className="stars_wrapper">
					{parallaxStars.map((item, idx) => {
						return (
							<StarParallax
								key={idx}
								animProps={star}
								speed={item.speed}
								inlineStyle={{
									transform: `translate(${item.position.x}%, ${item.position.y}%)`,
									color: item.color,
								}}
							/>
						);
					})}
				</Box>
			)}

			{!loading && (
				<animated.div
					className={classes.enter}
					style={{
						minHeight: spring.radius
							.interpolate({
								range: [0, 0.5, 1],
								output: [sizes.h, sizes.h * 1.5, sizes.h * 2 + 50],
							})
							.interpolate((val) => `${val}px`),
						height: spring.size.interpolate((w, h) => `${h}px`),
						width: spring.size.interpolate((w, h) => `${w}px`),
						borderRadius: spring.radius
							.interpolate({ range: [0, 0.5, 1], output: [50, 25, 1] })
							.interpolate((val) => `${val}%`),
						boxShadow: spring.shadow
							.interpolate({ range: [0, 0.5, 1], output: [0, 4, 2] })
							.interpolate((val) => `#FF5722 0px 0px ${val * 2}px ${val}px`),
						background: spring.bg,
						transform: spring.radius
							.interpolate({
								range: [0, 0.5, 1],
								output: [0.6, 0.8, 1],
							})
							.interpolate((val) => `scale(${val})`),
						WebkitTransform: spring.radius
							.interpolate({
								range: [0, 0.5, 1],
								output: [0.6, 0.8, 1],
							})
							.interpolate((val) => `scale(${val})`),
					}}
					onClick={() => hideStars()}
				>
					<animated.div
						className={classes.actions}
						style={{
							display: start.open.interpolate((val) =>
								val < 0.5 ? "none" : "flex"
							),
							opacity: start.open.interpolate((val) => `${val}`),
							transform: start.open.interpolate((val) => `scale(${val})`),
							WebkitTransform: start.open.interpolate((val) => `scale(${val})`),
						}}
					>
						<Typography>OPEN</Typography>
					</animated.div>

					<animated.div
						className={classes.actions}
						style={{
							display: headline.open.interpolate((val) =>
								val < 0.5 ? "none" : "flex"
							),
							opacity: headline.open.interpolate((val) => `${val}`),
							transform: headline.open.interpolate((val) => `scale(${val})`),
							WebkitTransform: headline.open.interpolate(
								(val) => `scale(${val})`
							),
						}}
					>
						<Typography className={classes.select_headline}>
							SELECT ANIMATION
						</Typography>
						<IconButton
							aria-label="close window"
							component="span"
							color="secondary"
							disabled={false}
							size="medium"
						>
							<CloseIcon />
						</IconButton>
					</animated.div>

					{transitions.map(({ item, key, props }) => (
						<animated.div
							key={key}
							className={classes.linkWrapper}
							elevation={2}
							style={{
								...props,
								height: `calc(${sizes.h * 2 - (data.length / 2) * 8}px / ${
									data.length / 2
								})`,
								width: `calc(50% - ${linkMargin}px)`,
								background: item.css,
							}}
						>
							<Link to={item.to} className={classes.link}>
								{item.routeName}
							</Link>
						</animated.div>
					))}
				</animated.div>
			)}
		</Box>
	);
};

export default Landing;
