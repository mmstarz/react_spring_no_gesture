// prop types
import PropTypes from "prop-types";
import CustomSlider from "../../../../widgets/slider/slider";

const SettingVelocity = ({ handleChange }) => {
	const handleMarks = () => {
		let marks = [];
		for (let i = 0; i < 11; i++) {
			marks.push({
				value: i,
			});
		}

		// console.log(marks);
		return marks;
	};

	const format = (value) => {
		return `${value}`;
	};

	return (
		<CustomSlider
			changeValue={(value) => handleChange(value)}
			title="Velocity"
			marks={handleMarks()}
			format={format}
			step={1}
			defVal={0}
			min={0}
			max={10}
			mode="light"
		/>
	);
};

SettingVelocity.propTypes = {
	handleChange: PropTypes.func.isRequired,
};

export default SettingVelocity;
