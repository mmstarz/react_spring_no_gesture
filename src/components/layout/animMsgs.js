import PropTypes from "prop-types";
// redux
import { connect } from "react-redux";
import { removeAlert } from "../../store/actions/alertActions";
// spring
import { useTransition, animated } from "react-spring";
// mui els
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
// icons
import CloseIcon from "@material-ui/icons/Close";
// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	wrapper: {
		position: "fixed",
		bottom: "10%",
		right: 0,
		background: "transparent",
		marginRight: 8,
		maxHeight: 0,
		"& .notification": {
			position: "relative",
			top: 0,
			left: 0,
			opacity: 0,
			transform: "translateY(0%)",
			transition: "transform 200ms ease-in, opacity 200ms ease-in",
			filter: "drop-shadow(2px 4px 6px currentColor)",			
			"& .ntfBox": {
				"& .life": {
					position: "absolute",
					bottom: 0,
					left: 0,
					background: "linear-gradient(130deg, #00b4e6, #00f0e0)",
					height: 2,
					transform: "translateY(-800%)",
					zIndex: 3,
				},
				position: "relative",
				display: "flex",
				alignItems: "center",
				justifyContent: "flex-end",
				"& .msgbox": {
					color: "white",
					margin: "1rem 0",
					opacity: 0.9,
					padding: 15,
					fontSize: 15,
					"&.success": {
						background: "#4caf50",
					},
					"&.fail": {
						background: "#E91E63",
					},
				},
			},
		},
	},
	closeBtn: {
		background: " #673AB7",
		color: "white",
		borderRadius: 0,
		"&:hover": {
			background: "#7149b9",
		},
	},
}));

const AnimMsgs = ({ alert, remAlert }) => {
	const classes = useStyles();

	const { alerts } = alert;
	const config = { tension: 125, friction: 20, precision: 0.1 };
	const timeout = 3000;

	// console.log("alerts: ", alerts);

	const transitions = useTransition(alerts, (item) => item.id, {
		unique: true,
		from: { opacity: 0, transform: "translateY(0%)", life: "0%" },
		enter: (item) => async (next) => {
			await next({ opacity: 1, transform: "translateY(-200%)" });
			await next({ life: "100%" });
		},		
		leave: (item) => async (next, cancel) => {
			await next({ life: "0%" });
			await next({ opacity: 0, transform: "translateY(0%)" });
		},
		onRest: (item, state) => {
			// console.log("@rest");

			// alert remove automated by redux action
			// no need to use here

			// return state === "enter" ? remAlert(item.id) : null;			
		},		
		config: (item, state) => {
			// console.log("state: ", state);			
			switch (state) {				
				case "leave":
					return [{ duration: timeout / 3 }, config];
				default:
					return [config, { duration: timeout / 3 }];
			}
		},
	});

	const handleClose = (id) => {
		// console.log("@close");
		
		// handle custom alert remove
		// best to use with onRest alert remove
		// while transition handles only first alert remove

		remAlert(id);
	};

	const renderSuccess = (notification, life) => {
		// life - animatedProps
		return (
			<Box className="ntfBox">
				<animated.div className="life" style={{ width: life }}></animated.div>
				<Box className="msgbox success">{notification.msg}</Box>
				<IconButton
					classes={{ root: classes.closeBtn }}
					component="span"
					onClick={() => handleClose(notification.id, life)}
				>
					<CloseIcon />
				</IconButton>
			</Box>
		);
	};

	const renderFail = (notification, life) => {
		return (
			<Box className="ntfBox">
				<Box className="msgbox fail">{notification.msg}</Box>
				<IconButton
					classes={{ root: classes.closeBtn }}
					component="span"
					onClick={() => remAlert(notification.id)}
				>
					<CloseIcon />
				</IconButton>
			</Box>
		);
	};

	const renderAlerts = () => {
		return transitions.map(({ key, item, props: { life, ...style } }) => {
			// console.log("key: ", key); // number
			// console.log("item: ", item); // { id: ..., type: ..., msg: ... }
			return (
				<animated.div className="notification" key={key} style={style}>
					{item.type === "success"
						? renderSuccess(item, life)
						: renderFail(item, life)}
				</animated.div>
			);
		});
	};

	return (
		<Box component="div" classes={{ root: classes.wrapper }}>
			{renderAlerts()}
		</Box>
	);
};

AnimMsgs.propTypes = {
	alert: PropTypes.object.isRequired,
	remAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
	return {
		alert: state.alert,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		remAlert: (id) => dispatch(removeAlert(id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AnimMsgs);
