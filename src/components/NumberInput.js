import styled from "styled-components";

const StyledNumberInput = styled.input`
    max-width: 60px;
    margin-right: ${({theme}) => theme.coreSpace}px;
`;

const NumberInput = () => {
    return (
        <StyledNumberInput 
            type="number"
            value="1"
            disabled
        />
    );
};

export default NumberInput;