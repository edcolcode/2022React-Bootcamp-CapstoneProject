import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {nanoid} from 'nanoid';
import {SkeletonTheme} from 'react-loading-skeleton';

import {skeletonTheme} from '../App';
import {useProductCategories} from '../utils/hooks/useProductCategories';
import Button from './Button';
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

const SliceBar = ({activeItems, toggleItemState, clearActiveItems}) => {
    const {data, isLoading} = useProductCategories();
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (!isLoading) {
            const results = data.results;
            setItems(results);
        }
    }, [isLoading, data]);

    const content = (isLoading)
        ?
            (
                <SkeletonTheme {...skeletonTheme.dark}>
                {
                    loadingItems.map(() => 
                        <SliceBarItem 
                            key={nanoid()}
                            id={nanoid()}
                            name=''
                            slug=''
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
                    slug={item.slugs[0]}
                    selected={activeItems.has(item.slugs[0])}
                    onClick={toggleItemState}
                    loading={false}
                />
            );

    return(
        <StyledSliceBar>
            <StyledSlideBarList>
                {content}
            </StyledSlideBarList>
            {(!isLoading && activeItems.size > 0)
                ?
                <Button 
                    onClick={clearActiveItems}
                >
                    Clear all
                </Button>
                :
                null
            }
        </StyledSliceBar>
    );
};

SliceBar.propTypes = {
    activeItems: PropTypes.object.isRequired, // Set
    toggleItemState: PropTypes.func.isRequired,
    clearActiveItems: PropTypes.func.isRequired,
};

export default SliceBar;