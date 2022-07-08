import PropTypes from 'prop-types';
import styled from "styled-components";

import Input from './Input';


const StyledNumberInput = styled(Input)`
    max-width: 80px;
    min-width: 60px;
    margin-right: ${({theme}) => theme.coreSpace}px;
`;

const NumberInput = ({value, disabled, max, min, onChange, onBlur}) => {
    return (
        <StyledNumberInput 
            type="number"
            value={value}
            max={max || null}
            min={min || null}
            disabled={disabled}
            onChange={onChange}
            onBlur={onBlur}
        />
    );
};

NumberInput.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.number.isRequired,
        PropTypes.string.isRequired,
    ]),
    disabled: PropTypes.bool,
    max: PropTypes.number,
    min: PropTypes.number,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
};

NumberInput.defaultProps = {
    value: 1,
    disabled: false,
    max: null,
}


export default NumberInput;