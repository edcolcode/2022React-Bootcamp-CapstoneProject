import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import {queriesParams} from '../utils/navigationConstants';

import {useSearch} from '../utils/hooks/useSearch';
import { useEffect, useState } from 'react';
import ItemGrid from './ItemGrid';
import PageNavigation from './PageNavigation';


const StyledSearch = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
`;

const Search = () => {
    const [searchParams] = useSearchParams();
    const {data, isLoading} = useSearch(searchParams.get(queriesParams.search));
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (!isLoading) {
            const results = data.results;
            setItems(results);
        }
    }, [isLoading, data]);

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
        <PageNavigation/>
        </>

    return (
        <StyledSearch>
        {content}
        </StyledSearch>
    );
};

export default Search;