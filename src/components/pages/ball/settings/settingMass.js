// prop types
import PropTypes from "prop-types";
import CustomSlider from "../../../../widgets/slider/slider";

const SettingMass = ({ handleChange }) => {
	const handleMarks = () => {
		let marks = [];
		for (let i = 1; i <= 5; i++) {
			marks.push({
				value: i,
				label: `${i.toString()} M`,
			});
		}

		// console.log(marks);
		return marks;
	};

	const format = (value) => {
		return `${value} M`;
	};

	return (
		<CustomSlider
			changeValue={(value) => handleChange(value)}
			title="Mass"
			marks={handleMarks()}
			format={format}
			step={1}
			defVal={1}
			min={1}
			max={5}
			mode="light"
		/>
	);
};

SettingMass.propTypes = {
	handleChange: PropTypes.func.isRequired,
};

export default SettingMass;
