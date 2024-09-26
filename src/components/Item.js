import PropTypes from 'prop-types';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import { useNavigate } from 'react-router-dom';

import Button from './Button';
import { navigationPaths, pathParams } from '../utils/navigationConstants';


const width = 200;
const StyledItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: ${width}px;
    margin: ${({theme}) => theme.coreSpace * 2}px;
`;
const StyledItemDescription = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const StyledItemImg = styled.img`
    width: ${width - 20}px;

    cursor: pointer;
`;
const StyledSkeletonItemImg = styled(Skeleton)`
    width: ${width}px;
    height: ${width}px;
`;
const StyledItemPriceContainer = styled.span`
    font-weight: bolder;
`;
const StyledItemTitleContainer = styled.div`
    text-decoration: underline;
    width: 100;
    text-align: center;

    cursor: pointer;
`;
const StyledItemCategoryContainer = styled.span`
    font-size: 10px;
`;
const StyledItemAddToCartContainer = styled.div`
    margin-top: ${({theme}) => theme.coreSpace}px;
`;


const Item = ({id, detail, loading}) => {
    const {
        name,
        category: {slug: category},
        mainimage: {url: image},
        price,
    } = detail;
    const navigate = useNavigate();

    const navigateProductDetail = () => {
        navigate(navigationPaths.product.replace(`:${pathParams.product}`, id));
    };

    return (
        <StyledItem>
            {loading
                ? <StyledSkeletonItemImg/>
                : 
                    <StyledItemImg
                        src={image}
                        onClick={navigateProductDetail}
                    />
            }
            <StyledItemDescription>
                {loading
                    ? <Skeleton width={width}/>
                    : 
                        <StyledItemCategoryContainer>
                            {category}
                        </StyledItemCategoryContainer>
                }
                {loading
                    ? <Skeleton width={width}/>
                    :
                        <StyledItemTitleContainer
                            onClick={navigateProductDetail}
                        >
                            <span>
                                {name}
                            </span>
                        </StyledItemTitleContainer>
                }
                {loading
                    ? <Skeleton width={width}/>
                    :
                    <StyledItemPriceContainer>
                        {'$ ' + price}
                    </StyledItemPriceContainer>
                }
                {!loading
                    ? 
                    <StyledItemAddToCartContainer>
                        <Button>
                            Add to cart
                        </Button>
                    </StyledItemAddToCartContainer>
                    :
                    null
                }
            </StyledItemDescription>
        </StyledItem>
    );
};

Item.propTypes = {
    id: PropTypes.string,
    detail: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
}

Item.defaultProps = {
    id: null,
    detail: {
        name: null,
        category: {
            slug: null,
        },
        mainimage: {
            url: null,
        },
        price: null,
    },
    loading: false,
}

export default Item;