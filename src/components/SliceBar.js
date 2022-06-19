import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {nanoid} from 'nanoid';
import {SkeletonTheme} from 'react-loading-skeleton';

import {skeletonTheme} from '../App';
import SliceBarItem from './SliceBarItem';

const loadingItems = new Array(8);
loadingItems.fill(null, 0, loadingItems.length);

const StyledSliceBar = styled.div`
    width: ${({theme}) => theme.coreSpace * 30}px;
    height: 100%;

    padding: ${({theme}) => theme.coreSpace * 2}px;
    box-sizing: border-box;

    border-right: 1px solid ${({theme}) => theme.colorPrimaryContainer};
    background-color: ${({theme}) => theme.colorSecondaryContainer};
`;
const StyledSlideBarList = styled.ul`
    margin: 0;
    padding-left: 0;
`;

const SliceBar = ({items, activeItems, toggleItemState, loading}) => {
    const handleItemClick = (event) => {
        event.preventDefault();
        let rootElement = event.target;
        while (rootElement.tagName.toLowerCase() !== 'li') {
            rootElement = rootElement.parentElement;
        }

        toggleItemState(rootElement.dataset.id);
    };

    const content = (loading)
        ?
            (
                <SkeletonTheme {...skeletonTheme.dark}>
                {
                    loadingItems.map(() => 
                        <SliceBarItem 
                            key={nanoid()}
                            id={nanoid()}
                            name=''
                            selected={false}
                            loading={true}
                        />
                    )
                }
                </SkeletonTheme>
            )
        :
            items.map(item => 
                <SliceBarItem 
                    key={item.id} 
                    id={item.id}
                    name={item.data.name}
                    selected={activeItems.has(item.id)}
                    onClick={handleItemClick}
                    loading={false}
                />
            );

    return(
        <StyledSliceBar>
            <StyledSlideBarList>
                {content}
            </StyledSlideBarList>
        </StyledSliceBar>
    );
};

SliceBar.propTypes = {
    items: PropTypes.array.isRequired,
    activeItems: PropTypes.object.isRequired, // Set
    toggleItemState: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default SliceBar;