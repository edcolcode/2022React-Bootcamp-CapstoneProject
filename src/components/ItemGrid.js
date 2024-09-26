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


const ItemGrid = ({isLoading, items}) => {
    const content = (isLoading)
        ? 
        (
            loadingItems.map(() => 
                <Item 
                    key={`loadingItem-${nanoid()}`} 
                    loading={true}
                />
            )
        )
        :
        (
            items.map(item => 
                <Item
                    id={item.id}
                    key={item.id}
                    detail={item.data}
                />
            )
        );

    return (
        <StyledItemGrid>
            {content}
        </StyledItemGrid>
    );
};

ItemGrid.propTypes = {
    isLoading: PropTypes.bool,
    items: PropTypes.array.isRequired,
}

ItemGrid.defaultProps = {
    isLoading: false,
}

export default ItemGrid;