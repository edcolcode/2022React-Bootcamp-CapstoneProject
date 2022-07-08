import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';

import {navigationPaths} from '../utils/navigationConstants';
import Logo from './Logo';
import MainToolbar from './MainToolbar';

const StyledHeader = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    justify-content: space-between;
    
    padding: ${({theme}) => theme.coreSpace}px;
    height: ${({theme}) => theme.headerHeight}px;

    border-bottom: 1px solid ${({theme}) => theme.colorPrimaryContainer};
    box-sizing: border-box;
`;

const Header = () => {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate(navigationPaths.home);
    };

    return (
        <StyledHeader>
            <Logo
                onClick={handleLogoClick}
            />
            <MainToolbar/>
        </StyledHeader>
    );
};

export default Header;