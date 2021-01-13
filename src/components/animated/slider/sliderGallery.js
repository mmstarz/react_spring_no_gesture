import PropTypes from "prop-types";
// mui
import Box from "@material-ui/core/Box";
// styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	wrapper: {
		// wrapper styles
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexWrap: "wrap",
		"& .child": {
			backgroundSize: "100% 100%",
			backgroundRepeat: "no-repeat",
			backgroundPosition: "center",
		},
	},
}));

const SliderGallery = ({ items, width, height, margin }) => {
	const classes = useStyles();

	const renderItems = () => {
		return items.map((item, idx) => {
			return (
				<Box
					key={`slide-${idx}`}
					component="div"
					className="child"
					style={{
						width: `${width}px`,
						height: `${height}px`,
						marginLeft: `${margin}px`,
						marginRight: `${margin}px`,
						backgroundImage: `url(${item})`,
					}}
				></Box>
			);
		});
	};

	return (
		<Box component="div" classes={{ root: classes.wrapper }}>
			{items && renderItems()}
		</Box>
	);
};

SliderGallery.propTypes = {
	items: PropTypes.array.isRequired,
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	margin: PropTypes.number.isRequired,
};

export default SliderGallery;
