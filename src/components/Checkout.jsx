import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import {useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import { navigationPaths } from '../utils/navigationConstants';
import checkoutSchema from '../utils/checkoutSchema';

import Button from './Button';
import CartTable from './CartTable';


const StyledCheckout = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    width: 100%;
    height: 100%;
`;
const StyledCheckoutForm = styled.form`
    display: flex;
    flex-direction: column;
    min-width: 350px;
    align-content: space-between;
`;
const StyledCheckoutP = styled.p`
    margin-top: ${({theme}) => theme.coreSpace}px;
    margin-bottom: ${({theme}) => theme.coreSpace}px;
    color: ${({theme}) => theme.colorError};
`;

/**
 name
 email
 post/zip code
 notes
 order summary
 Place order button
 Go back to cart button
 */

const Checkout = () => {
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(checkoutSchema),
    });
    const navigate = useNavigate();
    
    const handleOnSubmit = (data) => {
        // TODO: implement the next steps
        navigate(navigationPaths.summary);
    }

    const handleNavigateToCart = (event) => {
        event.preventDefault();
        navigate(navigationPaths.cart);
    }
    
    return (
        <StyledCheckout>
            <h3>Checkout</h3>
            <StyledCheckoutForm 
                onSubmit={handleSubmit(handleOnSubmit)}
            >
                <input 
                    name="name"
                    type="text"
                    placeholder="name"
                    {...register("name")}
                />
                <StyledCheckoutP>{errors.name?.message}</StyledCheckoutP>
                <input
                    name="email"
                    type="email"
                    placeholder="email"
                    {...register("email")}
                />
                <StyledCheckoutP>{errors.email?.message}</StyledCheckoutP>
                <input
                    name="post"
                    type="number"
                    placeholder="post/zip code"
                    {...register("post")}
                />
                <StyledCheckoutP>{errors.post?.message}</StyledCheckoutP>
                <textarea
                    name="notes"
                    placeholder="notes"
                    {...register("notes")}
                />
                <h4>
                    Order summary
                </h4>
                <CartTable 
                    editable={false}
                    showUnitPriceColumn={false}
                />
                <Button
                    onClick={handleNavigateToCart}
                >
                    Go back to cart
                </Button>
                <Button
                    onClick={handleSubmit(handleOnSubmit)}
                >
                    <span>
                        Place order
                    </span>
                </Button>
            </StyledCheckoutForm>
        </StyledCheckout>
    );
};

export default Checkout;