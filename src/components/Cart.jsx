import styled from 'styled-components';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import { navigationPaths } from '../utils/navigationConstants';

import Button from './Button';
import CartTable from './CartTable';


const StyledCart = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    width: 100%;
    height: 100%;
`;

const Cart = () => {
    const navigate = useNavigate();
    const itemsOnCart = useSelector(({cart}) => {
        if (cart.items) {
            return Object.values(cart.items);
        }
        return [];
    });

    const handleCheckoutClick = () => {
        navigate(navigationPaths.checkout);
    };

    return (
        <StyledCart>
            <h3>Cart</h3>
            {
                itemsOnCart.length === 0
                ?
                <span>Your cart is empty</span>
                :
                <>
                    <CartTable 
                        editable={true}
                        showUnitPriceColumn={true}
                    />
                    <Button
                        onClick={handleCheckoutClick}
                    >
                        <span>
                            Proceed to checkout
                        </span>
                    </Button>
                </>
            }
        </StyledCart>
    );
};

export default Cart;