import {useState, useEffect} from 'react';
import styled from 'styled-components';
import {useNavigate, useSearchParams} from 'react-router-dom';

import {navigationPaths, queriesParams} from '../utils/navigationConstants';
import {useProducts} from '../utils/hooks/useProducts';
import ItemGrid from './ItemGrid';
import SliceBar from './SliceBar';
import PageNavigation from './PageNavigation';


const pageSize = 12;

const StyledProducts = styled.div`
    display: flex;
    flex: 1;

    height: 100%;
`;
const StyledProductsSliceBarContainer = styled.div`
    margin-right: ${({theme}) => theme.coreSpace * 2}px;
`;
const StyledProductsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
`;

const Products = () => {
    const [activeCategories, setActiveCategories] = useState(new Set());
    const [page, setPage] = useState(1);

    const {data, isLoading} = useProducts(pageSize, page);
    const [items, setItems] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    

    useEffect(() => {
        // Reset scroll position
        window.scroll({
            top: 0, 
            left: 0, 
            behavior: 'smooth',
        });
    }, []);

    useEffect(() => {
        if (!isLoading) {
            const results = data.results;
            setItems(results);
        }
    }, [data, isLoading]);

    useEffect(() => {
        const categoriesSearchParam = searchParams.get(queriesParams.category);
        if (categoriesSearchParam) {
            const categories = categoriesSearchParam.split(',');
            const newCategories = new Set();
            
            let shouldUpdateCategories = categories.length !== activeCategories.size;
            categories.forEach(category => {
                newCategories.add(category);
                if (!activeCategories.has(category)) {
                    shouldUpdateCategories = true;
                }                
            });

            if (shouldUpdateCategories) {
                setActiveCategories(newCategories);
            }
        } else {
            if (activeCategories.size !== 0) {
                setActiveCategories(new Set());
            }
        }
    }, [searchParams, activeCategories]);

    const clearCategories = () => {
        navigate(navigationPaths.products);
    };

    const toggleCategoryState = (category) => {
        const newActiveCategories = new Set(activeCategories);
        if (activeCategories.has(category)) {
            newActiveCategories.delete(category);
        } else {
            newActiveCategories.add(category);
        }
        
        const categories = [];
        newActiveCategories.forEach(category => {
            categories.push(category);
        });
        const newSearchParams = categories.join(',');

        if (newSearchParams.length === 0) {
            clearCategories();
        } else {
            setSearchParams(new URLSearchParams({[queriesParams.category]: newSearchParams}));
        }
    };

    const handlePrevPage = () => {
        setPage(page - 1);
    }

    const handleNextPage = () => {
        setPage(page + 1);
    }

    const filterdItems = activeCategories.size === 0
        ? items
        : items.filter(item => activeCategories.has(item.data.category.slug));

    return(
        <StyledProducts>
            <StyledProductsSliceBarContainer>
                <SliceBar 
                    activeItems={activeCategories}
                    toggleItemState={toggleCategoryState}
                    clearActiveItems={clearCategories}
                />
            </StyledProductsSliceBarContainer>
            <StyledProductsContainer>
                <h2>Products</h2>
                <ItemGrid
                    activeCategories={activeCategories}
                    isLoading={isLoading}
                    items={filterdItems}
                />
                <PageNavigation
                    page={page}
                    disabled={isLoading}
                    disableNextPage={filterdItems.length < pageSize}
                    prevPage={handlePrevPage}
                    nextPage={handleNextPage}
                />
            </StyledProductsContainer>
        </StyledProducts>
    );
};

export default Products;