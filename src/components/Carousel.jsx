import {useState, useEffect} from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import {useNavigate, createSearchParams} from 'react-router-dom';

import {NavigateBefore} from '@styled-icons/material-outlined/NavigateBefore';
import {NavigateNext} from '@styled-icons/material-outlined/NavigateNext';

import {navigationPaths, queriesParams} from '../utils/navigationConstants';
import {useProductCategories} from '../utils/hooks/useProductCategories';

const width = 300;
const height = 300;
const StyledCarousel = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: nowrap;

    width: 100%;
    margin-top: 80px;
    margin-bottom: 80px;
`;
const StyledCarouselMaintem = styled.div`
    transform: scale(1.5);
    z-index: 1;
    position: relative;

    cursor: pointer;
`;
const StyledCarouselSkeleton = styled(Skeleton)`
    height: ${({theme}) => height - (theme.coreSpace * 2)}px;
    max-height: ${height}px;

    box-shadow: 0 0 12px black;
`;
const StyledCarouselMainItemSkeleton = styled(StyledCarouselSkeleton)`
    transform: scale(1.2);
    z-index: 1;
    position: relative;  
`;
const StyledCarouselSecondaryItem = styled.div`
    z-index: 0;

    display: flex;
    align-items: center;
`;
const StyledCarouselSecondaryItemSkeleton = styled(StyledCarouselSkeleton)`
    z-index: 0;
    transform: scale(0.8);
`;
const StyledCarouselSecondaryItemLeft = styled(StyledCarouselSecondaryItem)`
    cursor: w-resize;
`;
const StyledCarouselSecondaryItemRight = styled(StyledCarouselSecondaryItem)`
    cursor: e-resize;
`;
const StyledCarouselItemImg = styled.img`
    width: 100%;
    max-width: ${width}px;
    max-height: ${height}px;
    box-shadow: 0 0 12px black;
`;
const StyledCarouselItemTextContainer = styled.div`
    color: white;
`;
const StyledCarouselItemTitle = styled.span`
    text-shadow: 0px 0px 8px black;
    width: 100%;
    text-align: center;
    position: absolute;
    top: 80%;
`;

const Carousel = () => {
    const {data, isLoading} = useProductCategories();
    const [items, setItems] = useState([]);
    const [activeIdx, setActiveIdx] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading) {
            const results = data.results;
            setItems(results);
        }
    }, [isLoading, data]);

    const handlePrev = () => {
        const prevIdx = ((activeIdx - 1) < 0) ? length - 1 : (activeIdx - 1) % length;
        setActiveIdx(prevIdx);
    };

    const handleNext = () => {
        const nextIdx = (activeIdx + 1) % length;
        setActiveIdx(nextIdx);
    };

    const handleItemClick = () => {
        navigate({
            pathname: navigationPaths.products,
            search: `?${createSearchParams({
                [queriesParams.category]: items[activeIdx].slugs[0],
            })}`,
        })
    };

    const length = (items) ? items.length : 0;
    const activeItem = isLoading
        ?
            <StyledCarouselMainItemSkeleton containerClassName='skeletonCustomContainer'/>
        :
            items.length > 0
            ?
            (
            <StyledCarouselMaintem
                onClick={handleItemClick}
            >
                <StyledCarouselItemImg 
                    src={items[activeIdx].data.main_image.url} 
                    alt={items[activeIdx].data.name}
                />
                <StyledCarouselItemTextContainer>
                    <StyledCarouselItemTitle>
                        {items[activeIdx].data.name}
                    </StyledCarouselItemTitle>
                </StyledCarouselItemTextContainer>
            </StyledCarouselMaintem>
            )
            :
            null;
    if (length === 1) {
        return activeItem;
    }
    
    const prevIdx = ((activeIdx - 1) < 0) ? length - 1 : (activeIdx - 1) % length;
    const nextIdx = (activeIdx + 1) % length;

    if (!isLoading && items.length === 0) {
        return null;
    }

    return (
        <StyledCarousel>
            {isLoading
                ?
                <StyledCarouselSecondaryItemSkeleton containerClassName='skeletonCustomContainer'/>
                :
                <>
                    <span>
                        <NavigateBefore 
                            size={40}
                            onClick={handlePrev}
                        />
                    </span>
                    <StyledCarouselSecondaryItemLeft
                        onClick={handlePrev}
                    >
                        <StyledCarouselItemImg 
                            src={items[prevIdx].data.main_image.url} 
                            alt={items[prevIdx].data.name}
                        />
                    </StyledCarouselSecondaryItemLeft>
                </>
            }
            {activeItem}
            {isLoading
                ?
                <StyledCarouselSecondaryItemSkeleton containerClassName='skeletonCustomContainer'/>
                :
                <>
                    <StyledCarouselSecondaryItemRight
                        onClick={handleNext}
                    >
                        <StyledCarouselItemImg 
                            src={items[nextIdx].data.main_image.url} 
                            alt={items[nextIdx].data.name}
                        />
                    </StyledCarouselSecondaryItemRight>
                    <span>
                        <NavigateNext 
                            size={40}
                            onClick={handleNext}
                        />
                    </span>
                </>
            }
        </StyledCarousel>
    );
};

export default Carousel;