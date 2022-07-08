import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { nanoid } from 'nanoid';

import {useSelector, useDispatch} from 'react-redux';
import {modifyItem} from '../store/cartSlice';
import {useProduct} from '../utils/hooks/useProduct';
import { getValidNumberInRange } from '../utils/validationUtils';

import Button from './Button';
import NumberInput from './NumberInput';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


const swiperMaxHeight = 600;
const StyledProductDetail = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    flex-direction: column;

    width: 100%;
`;
const StyledProductDetailMain = styled.div`
    display: flex;
    flex-direction: row;

    width: 100%;
`;
const StyledProductDetailMainContainer = styled.div`
    width: 50%;
    max-width: 50%;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: ${({theme}) => theme.coreSpace * 4}px;
`;
const StyledProductDetailInfoContainer = styled.div`
    display: block;
    min-width: 150px;
    width: 80%;
`;
const StyledProductDetailMoreContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    width: 80%;
`;
const StyledSwiper = styled(Swiper)`
    /* height: 50%; */
    width: 100%;
    max-height: ${swiperMaxHeight}px;
`;
const StyledSwiperImg = styled.img`
    /* max-width: 100%; */
    /* height: 50%;
    max-height: 50%; */
    width: 100%;
    max-height: ${swiperMaxHeight}px;
`;
const StyledProductAddContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: end;
`;
const StyledProductDescriptionContainer = styled.div`
    width: 100%;
`;


const ProducDetail = () => {
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const {productId} = useParams();
    const {data, isLoading} = useProduct(productId);

    const itemsOnCart = useSelector(({cart}) => {
        const productOnCart = cart.items[productId];
        if (productOnCart) {
            return productOnCart[0];
        }
        return 0;
    });
    const dispatch = useDispatch();

    const stock = product ? product.data.stock : 0;
    const availableStock = stock - itemsOnCart;

    useEffect(() => {
        if (!isLoading) {
            const result = data.results[0];
            setProduct(result);
        }
    }, [isLoading, data]);

    const handleQuantity = (event) => {
        const _quantity = event.target.value;
        setQuantity(_quantity);
    };
    const handleQuantityOnBlur = (event) => {
        const newValue = getValidNumberInRange(
            event.target.value, 1, 1, availableStock);
        setQuantity(newValue);
    }

    const handleModifyItem = () => {
        dispatch(modifyItem({
            item: {id: productId, ...product.data}, 
            amount: quantity + itemsOnCart,
        }));
        setQuantity(1);
    }

    const {
        data: {
            name,
            price,
            sku,
            category: {slug: category},
            description,
            specs,
            images,
        },
        tags,
    } = (product === null)
        ?
        {
            data: {
                name: '',
                price: null,
                sku: '',
                images: [],
                mainimage: null,
                category: {
                    slug: '',
                },
                description: [],
                specs: [],
            },
            tags: [],
        }
        :
        product;
    const tagsText = tags.join(', ');
    const disabledItem = itemsOnCart >= stock || stock === 0;

    return (
        <StyledProductDetail>
            <StyledProductDetailMain>
                <StyledProductDetailMainContainer>
                    <StyledSwiper 
                        loop={true} 
                        spaceBetween={10} 
                        navigation={true}
                    >   
                        {
                            images.map(({image}) => (
                                <SwiperSlide key={nanoid()}>
                                    <StyledSwiperImg src={image.url}/>
                                </SwiperSlide>
                            ))
                        }
                    </StyledSwiper>
                </StyledProductDetailMainContainer>
                <StyledProductDetailMainContainer>
                    <StyledProductDetailInfoContainer>
                        <h3>
                        {isLoading
                            ?
                            <Skeleton/>
                            :
                            <label>
                                {name}
                            </label>
                        }
                        </h3>
                        <h4>
                        {isLoading
                            ?
                            <Skeleton/>
                            :
                            <label>
                                $ {price}
                            </label>
                        }
                        </h4>
                        <div>
                            {isLoading
                                ?
                                <Skeleton/>
                                :
                                <label>
                                    sku: {sku}
                                </label>
                            }
                        </div>
                        <div>
                            {isLoading
                                ?
                                <Skeleton/>
                                :
                                <label>
                                    {category}
                                </label>
                            }
                        </div>
                        {isLoading
                            ?
                            null
                            :
                            <StyledProductAddContainer>
                                <NumberInput 
                                    value={quantity}
                                    disabled={disabledItem}
                                    max={availableStock}
                                    min={1}
                                    onChange={handleQuantity}
                                    onBlur={handleQuantityOnBlur}
                                />
                                <Button
                                    onClick={handleModifyItem}
                                    disabled={disabledItem}
                                >
                                    Add to cart
                                </Button>
                            </StyledProductAddContainer>
                        }
                    </StyledProductDetailInfoContainer>
                </StyledProductDetailMainContainer>
            </StyledProductDetailMain>
            <StyledProductDetailMoreContainer>
                <StyledProductDescriptionContainer>
                    {isLoading
                        ?
                        <Skeleton count={5}/>
                        :
                        <p>
                            {description.map(entry => entry.text)}
                        </p>
                    }
                </StyledProductDescriptionContainer>
                {isLoading
                    ?
                    <Skeleton/>
                    :
                    <div>
                        <label>Tags: </label>
                        <label>{tagsText}</label>
                    </div>
                }
                <br/>
                <table>
                    <tbody>
                        {
                            specs.map(({spec_name, spec_value}) => (
                                <tr key={nanoid()}>
                                    <td>
                                        {spec_name}
                                    </td>
                                    <td>
                                        {spec_value}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </StyledProductDetailMoreContainer>
        </StyledProductDetail>
    );
};

export default ProducDetail;