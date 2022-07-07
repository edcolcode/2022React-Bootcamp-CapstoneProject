import PropTypes from 'prop-types';
import styled from 'styled-components';
import {nanoid} from 'nanoid';

import Item from './Item';

const loadingItems = new Array(8);
loadingItems.fill(null, 0, loadingItems.length);

const StyledItemGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;
`;

const ItemGrid = ({loading, children}) => {
    const content = (loading)
        ? 
            (
                loadingItems.map(() => 
                    <Item 
                        key={`loadingItem-${nanoid()}`} 
                        loading={true}
                    />
                )
            )
        : children;

    return (
        <StyledItemGrid>
            {content}
        </StyledItemGrid>
    );
};

ItemGrid.propTypes = {
    loading: PropTypes.bool.isRequired,
}

export default ItemGrid;