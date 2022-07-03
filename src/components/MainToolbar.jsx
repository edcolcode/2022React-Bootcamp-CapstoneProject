import styled from 'styled-components';

import SearchInput from './SearchInput';
import CartBadge from './CartBadge';


const StyledMainToolbar = styled.div`
    display: flex;
    align-self: center;
    justify-content: space-evenly;
`;


const MainToolbar = () => {
    return (
        <StyledMainToolbar>
            <SearchInput/>
            <CartBadge/>
        </StyledMainToolbar>
    );
};

export default MainToolbar;