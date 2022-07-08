import styled from 'styled-components';
import {Cart} from '@styled-icons/bootstrap/Cart';
import {useSelector} from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { navigationPaths } from '../utils/navigationConstants';

import Button from './Button';

const StyledCounterButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;
const StyledCounterContainer = styled.div`
    border-radius: 50%;
    margin-left: ${({theme}) => theme.coreSpace}px;
    margin-right: ${({theme}) => theme.coreSpace}px;
`
const StyleCounterSpan = styled.span`
    font-weight: bold;
`;

const CartBadge = () => {
    const itemsCount = useSelector(({cart}) => 
        Object.keys(cart.items)
            .reduce((count, current) => count + cart.items[current][0], 0)
    );

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(navigationPaths.cart);
    };

    return (
        <>
            <Button
                disabled={itemsCount === 0}
                onClick={handleClick}
            >
                <StyledCounterButtonContainer>
                {itemsCount > 0 && 
                    <StyledCounterContainer>
                        <StyleCounterSpan>
                            {itemsCount}
                        </StyleCounterSpan>
                    </StyledCounterContainer>
                }
                <Cart size="18" title="Cart"/>
                </StyledCounterButtonContainer>
            </Button>
        </>
    );
};

export default CartBadge;