import {useState} from 'react';
import { useFeaturedBanners } from './utils/hooks/useFeaturedBanners';
import styled, {ThemeProvider} from 'styled-components';
import theme from './themes';
import {SkeletonTheme} from 'react-loading-skeleton'

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Products from './components/Products';


import 'react-loading-skeleton/dist/skeleton.css'

const LoadingView = styled.div`
  min-width: 100%;
  min-height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledApp = styled.div`
    height: 100%;
    min-height: 100%;
    min-width: 350px;
    
	  display: flex;
	  flex-direction: column;
    flex-wrap: nowrap;
  `;

const MainContainer = styled.div`
  width: 100%;
`;

const ContentContainer = styled(MainContainer)`
  flex: 1;
`;

export const skeletonTheme = {
  light: {
    
  },
  dark: {
    baseColor: "#202020",
    highlightColor: "#444",
  },
};

const App = () => {
  // const { data, isLoading } = useFeaturedBanners();
  const {isLoading} = useFeaturedBanners();
  const [isHomeDisplayed, setIsHomeDisplayed] = useState(true);

  if (isLoading) {
    return (
      <LoadingView>
        <span>Loading...</span>
      </LoadingView>
    );
  }

  const navigateHome = () => {
    setIsHomeDisplayed(true);
  };
  const navigateProducts = () => {
    setIsHomeDisplayed(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <SkeletonTheme {...skeletonTheme.ligth}>
        <StyledApp>
          <MainContainer>
            <Header 
              navigateHome={navigateHome}
            />
          </MainContainer>
          <ContentContainer>
            {
              isHomeDisplayed 
              ? 
                <Home 
                  navigateProducts={navigateProducts}
                />
              : <Products/>
            }
          </ContentContainer>
          <MainContainer>
            <Footer/>
          </MainContainer>
        </StyledApp>
      </SkeletonTheme>
    </ThemeProvider>
  );
}

export default App;
