import PropTypes from 'prop-types';
import styled from 'styled-components';
import {NavigateBefore} from '@styled-icons/material-rounded/NavigateBefore';
import {NavigateNext} from '@styled-icons/material-rounded/NavigateNext';

import Button from './Button';


const StyledPageNavigation = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    margin-top: ${({theme}) => theme.coreSpace * 2}px;
    margin-bottom: ${({theme}) => theme.coreSpace * 2}px;
`;
const StyledInput = styled.input`
    width: ${({theme}) => theme.coreSpace * 8}px;
    height: 80%;
    
    text-align: center;
`;


const PageNavigation = ({page, disabled, disableNextPage, prevPage, nextPage}) => {
    return (
        <StyledPageNavigation>
            <Button 
                disabled={disabled || page <= 1}
                onClick={prevPage}
            >
                <NavigateBefore size="18"/>
            </Button>
            <StyledInput 
                type="text" 
                value={page}
                disabled
            />
            <Button
                disabled={disabled || disableNextPage}
                onClick={nextPage}
            >
                <NavigateNext size="18"/>
            </Button>
        </StyledPageNavigation>
    );
};

PageNavigation.propTypes = {
    page: PropTypes.number.isRequired,
    disabled: PropTypes.bool,
    disableNextPage: PropTypes.bool,

    prevPage: PropTypes.func.isRequired,
    nextPage: PropTypes.func.isRequired,
};

PageNavigation.defaulProps = {
    page: 1,
    disabled: false,
    disableNextPage: true,
};

export default PageNavigation;