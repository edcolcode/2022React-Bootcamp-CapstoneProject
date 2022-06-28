import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import {queriesParams} from '../utils/navigationConstants';

import {useSearch} from '../utils/hooks/useSearch';
import { useEffect, useState } from 'react';
import ItemGrid from './ItemGrid';
import PageNavigation from './PageNavigation';

const pageSize = 20;

const StyledSearch = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
`;

const Search = () => {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);

    const [searchParams] = useSearchParams();
    const {data, isLoading} = useSearch(searchParams.get(queriesParams.search), pageSize, page);
    
    useEffect(() => {
        if (!isLoading) {
            const results = data.results;
            setItems(results);

            if (results < pageSize) {
                setPage(1);
            }
        }
    }, [isLoading, data]);

    const handlePrevPage = () => {
        setPage(page - 1);
    };

    const handleNextPage = () => {
        setPage(page + 1);
    };

    const content = !isLoading && items.length === 0
        ?
        <span>
            "Not matches found"
        </span>
        :
        <>
        <ItemGrid
            isLoading={isLoading}
            items={items}
        />
        <PageNavigation
            prevPage={handlePrevPage}
            nextPage={handleNextPage}
            disableNextPage={items.length < pageSize}
            page={page}
        />
        </>

    return (
        <StyledSearch>
            {content}
        </StyledSearch>
    );
};

export default Search;