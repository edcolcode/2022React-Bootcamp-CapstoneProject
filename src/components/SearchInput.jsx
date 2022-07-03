import {useEffect, createRef} from 'react';
import styled from "styled-components";
import { useNavigate, createSearchParams, useLocation } from "react-router-dom";
import {navigationPaths, queriesParams} from '../utils/navigationConstants';

import Input from './Input';


const StyledSearchInput = styled(Input)`
    min-width: 120px;
`;


const SearchInput = () => {
    const navigate = useNavigate();
    const inputRef = createRef(null);
    const {pathname} = useLocation();
    
    useEffect(() => {
        if (pathname !== navigationPaths.search) {
            if (inputRef) {
                inputRef.current.value = "";
            }
        }
    }, [pathname, inputRef]);

    const handleKeyUp = (event) => {
        if (event.keyCode === 13) {
            const value = event.target.value;
            navigate({
                pathname: navigationPaths.search,
                search: `?${createSearchParams({
                    [queriesParams.search]: value,
                })}`,
            })
        }
    };

    return (
        <StyledSearchInput 
            type="text"
            ref={inputRef}
            placeholder="Enter a search query"
            onKeyUp={handleKeyUp}
        />
    );
};

export default SearchInput;