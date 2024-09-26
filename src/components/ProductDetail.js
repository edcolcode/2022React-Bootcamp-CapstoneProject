import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';

import {useProduct} from '../utils/hooks/useProduct';
import Button from './Button';
import NumerInput from './NumberInput';

// Styles must use direct files imports
import 'swiper/swiper-bundle.min.css';
import "swiper/swiper.min.css";
import "swiper/modules/navigation/navigation.min.css";
import 'swiper/modules/pagination/pagination.min.css';
import { nanoid } from 'nanoid';
//import 'swiper/swiper.scss'; // core Swiper

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
    const {productId} = useParams();
    const [product, setProduct] = useState(null);
    const {data, isLoading} = useProduct(productId);

    useEffect(() => {
        if (!isLoading) {
            const result = data.results[0];
            setProduct(result);
        }
    }, [isLoading, data]);

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
                                <NumerInput />
                                <Button>Add to cart</Button>
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