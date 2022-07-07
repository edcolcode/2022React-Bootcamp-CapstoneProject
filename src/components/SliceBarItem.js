import styled from 'styled-components';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';

const StyledSliceBarItem = styled.li`
    display: block;
    margin-top: ${({theme}) => theme.coreSpace}px;
    margin-bottom: ${({theme}) => theme.coreSpace}px;

    &:not(:last-child) {
        margin-bottom: ${({theme}) => theme.coreSpace * 2}px;
    }

    font-weight: ${({selected}) => selected ? 'bolder': 'normal'}
`;
const StyledSliceBarItemA = styled.a`
    color: black;

`;
const StyledSliceBarItemText = styled.span`
    text-decoration: underline;
`;

const SliceBarItem = ({id, name, selected, onClick, loading}) => {
    if (loading) {
        return (
            <Skeleton/>
        );
    }

    return (
        <StyledSliceBarItem
            data-id={id}
            selected={selected}
            onClick={onClick}
        >
            <StyledSliceBarItemA 
                href="#"
            >
                <StyledSliceBarItemText>
                    {name}
                </StyledSliceBarItemText>
            </StyledSliceBarItemA>
        </StyledSliceBarItem>
    )
};

SliceBarItem.propTypes = {
    loading: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    onClick: PropTypes.func,
}

SliceBarItem.defaulProps = {
    loading: false,
    selected: false,
    name: null,
    onClick: () => {},
}


export default SliceBarItem;