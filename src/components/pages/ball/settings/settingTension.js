// prop types
import PropTypes from "prop-types";
import CustomSlider from "../../../../widgets/slider/slider";

const SettingTension = ({ handleChange }) => {
	const handleMarks = () => {
		let marks = [];
		for (let i = 0; i < 13; i++) {
			marks.push({
				value: i * 100 + 300,
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
			title="Tension"
			marks={handleMarks()}
			format={format}
			defVal={1000}
			step={100}
			min={300}
			max={1500}
			mode="light"
		/>
	);
};

SettingTension.propTypes = {
	handleChange: PropTypes.func.isRequired,
};

export default SettingTension;
