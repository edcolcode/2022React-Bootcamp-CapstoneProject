import PropTypes from 'prop-types';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';

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
`;
const StyledItemCategoryContainer = styled.span`
    font-size: 10px;
`;

const Item = ({detail, loading}) => {
    const {
        name,
        category: {slug: category},
        mainimage: {url: image},
        price,
    } = detail;

    return (
        <StyledItem>
            {loading
                ? <StyledSkeletonItemImg/>
                : 
                    <StyledItemImg
                        src={image}
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
                        <StyledItemTitleContainer>
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
            </StyledItemDescription>
        </StyledItem>
    );
};

Item.propTypes = {
    detail: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
}

Item.defaultProps = {
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