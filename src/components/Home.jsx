import {useState, useEffect} from 'react';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';

import {useFeaturedProducts} from '../utils/hooks/useFeaturedProducts';
import {navigationPaths} from '../utils/navigationConstants';
import SliderBanner from './SliderBanner';
import Carousel from './Carousel';
import ItemGrid from './ItemGrid';
import Button from './Button';

const StyledMoreProductsContainer = styled.div`
    width: 100%;
    margin-top: ${({theme}) => 2 * theme.coreSpace}px;
    margin-bottom: ${({theme}) => 2 * theme.coreSpace}px;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const Home = () => {
    const {data, isLoading} = useFeaturedProducts();
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading){
            const results = data.results;
            setItems(results);
        }
    }, [data, isLoading]);

    const handleViewAllProductsClick = () => {
        navigate(navigationPaths.products);
    }

    return(
        <div>
            <SliderBanner/>
            <Carousel/>
            <ItemGrid 
                items={items}
                isLoading={isLoading}
            />
            <StyledMoreProductsContainer>
                <Button
                    onClick={handleViewAllProductsClick}
                >
                    View all products
                </Button>
            </StyledMoreProductsContainer>
        </div>
    );
};

export default Home;
