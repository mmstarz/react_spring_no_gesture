import { useState } from "react";
// els
import PageHeader from "../../layout/pageHeader";
import Pull from "../../animated/pull/pull";
import SettingMass from "./settings/settingMass";
import SettingTension from "./settings/settingTension";
import SettingFriction from "./settings/settingFriction";
import SettingVelocity from "./settings/settingVelocity";
// mui
import Box from "@material-ui/core/Box";
// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	box_root: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		minHeight: "100vh"
	},
	box_settings: {
		margin: theme.spacing(1, 0),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		transform: "scale(.8)",
	},
	typo_headline: {
		color: "white",
	},
}));

const Ball = () => {
	const classes = useStyles();
	const [mass, setMass] = useState(1);
	const [tension, setTension] = useState(1000);
	const [friction, setFriction] = useState(50);
	const [velocity, setVelocity] = useState(0);

	return (
		<Box classes={{ root: classes.box_root }}>
			<PageHeader title="Move the ball" />
			<Box classes={{ root: classes.box_settings }}>
				<SettingMass handleChange={(val) => setMass(val)} />
				<SettingTension handleChange={(val) => setTension(val)} />
				<SettingFriction handleChange={(val) => setFriction(val)} />
				<SettingVelocity handleChange={(val) => setVelocity(val)} />
			</Box>
			<Pull
				mass={mass}
				tension={tension}
				friction={friction}
				velocity={velocity}
			/>
		</Box>
	);
};

export default Ball;
