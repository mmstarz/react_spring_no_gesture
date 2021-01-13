import { useState } from "react";
import { useSpring, animated } from "react-spring";
// els
import PageHeader from "../../layout/pageHeader";
import Slider from "../../animated/slider/slider";
import SettingNumber from "./settings/settingNumber";
import SettingSwitch from "./settings/settingSwitch";
// mui
import Box from "@material-ui/core/Box";
// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	box_root: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		minHeight: "100vh",
		paddingBottom: theme.spacing(2),
	},
	typo_headline: {
		color: "white",
		margin: theme.spacing(2, 0),
	},
	slider_wrapper: {
		filter: "drop-shadow(1px 1px 1px black)",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		overflow: "hidden",
	},
	box_settings: {
		margin: theme.spacing(1, 0),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		"& .advanced": {
			width: 232,
			margin: theme.spacing(1, 0),
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			flexWrap: "wrap",
		},
	},
}));

const items = [
	"https://images.pexels.com/photos/62689/pexels-photo-62689.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
	"https://images.pexels.com/photos/296878/pexels-photo-296878.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
	"https://images.pexels.com/photos/351265/pexels-photo-351265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
	"https://images.pexels.com/photos/924675/pexels-photo-924675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
	// "https://cdn.pixabay.com/photo/2020/11/22/07/11/river-5765785_960_720.jpg"
];

const List = () => {
	const classes = useStyles();

	const [reload, setReload] = useState(false);
	const [custom, setCustom] = useState(false);
	const [overflow, setOverflow] = useState(true);
	const [borders, setBorders] = useState(false);
	const [actions, setActions] = useState(true);
	const [pips, setPips] = useState(true);
	const [slideWidth, setSlideWidth] = useState(296);
	const [sideMargin, setSideMargin] = useState(4);

	const props = useSpring({
		to: [
			{
				opacity: 1,
				transform: "translate3d(0px, 0%, 0px)",
			},
		],
		from: {
			opacity: 0,
			transform: "translate3d(0px, 50%, 0px)",
		},
		delay: 1000,
	});

	const handleCustom = (val) => {
		setCustom(val);
		setReload(true);
	};

	return (
		<Box classes={{ root: classes.box_root }}>
			<PageHeader title="Carousel" />
			<Box classes={{ root: classes.box_settings }}>
				<Box className="advanced" component="div">
					<SettingNumber
						title="Slide width"
						name="width"
						min={80}
						max={window.innerWidth}
						step={8}
						readOnly={custom}
						value={slideWidth}
						handleChange={(e) => setSlideWidth(e.target.valueAsNumber)}
					/>
					<SettingNumber
						title="Side margin"
						name="margin"
						min={0}
						max={window.innerWidth}
						step={4}
						readOnly={custom}
						value={sideMargin}
						handleChange={(e) => setSideMargin(e.target.valueAsNumber)}
					/>
				</Box>
				<Box className="advanced" component="div">
					<SettingSwitch
						title="Overflow"
						name="overflow"
						value={overflow}
						disabled={custom}
						handleChange={(e) => setOverflow(e.target.checked)}
					/>
					<SettingSwitch
						title="Borders"
						name="borders"
						value={borders}
						disabled={custom}
						handleChange={(e) => setBorders(e.target.checked)}
					/>
					<SettingSwitch
						title="Actions"
						name="actions"
						value={actions}
						disabled={custom}
						handleChange={(e) => setActions(e.target.checked)}
					/>
					<SettingSwitch
						title="Pips"
						name="pips"
						value={pips}
						disabled={custom}
						handleChange={(e) => setPips(e.target.checked)}
					/>
				</Box>
				<SettingSwitch
					title="Calculate"
					name="custom"
					value={custom}
					disabled={false}
					handleChange={(e) => handleCustom(e.target.checked)}
				/>
			</Box>
			<animated.div className={classes.slider_wrapper} style={props}>
				<Slider
					items={items}
					reload={reload}
					stopReload={() => setReload(false)}
					custom={custom}
					itemWidth={slideWidth}
					itemMargin={sideMargin}
					overflow={overflow}
					showBorders={borders}
					showActions={actions}
					showPips={pips}
				/>
			</animated.div>
		</Box>
	);
};

export default List;
