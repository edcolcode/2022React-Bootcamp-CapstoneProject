import {useState, useEffect} from 'react';
import styled, {ThemeProvider} from 'styled-components';
import theme from './themes';
import {SkeletonTheme} from 'react-loading-skeleton';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import {Provider} from 'react-redux';

import {store} from './store/store';
import {navigationPaths} from './utils/navigationConstants';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import ProductDetail from './components/ProductDetail';
import Products from './components/Products';
import Search from './components/Search';

import './App.css';
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
  light: {},
  dark: {
    baseColor: theme.colorOnSecondaryContainer,
    highlightColor: theme.colorSecondaryContainer,
  },
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <LoadingView>
        <span>Loading...</span>
      </LoadingView>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <SkeletonTheme {...skeletonTheme.ligth}>
        <Provider store={store}>
          <BrowserRouter>
            <StyledApp>
              <MainContainer>
                <Header/>
              </MainContainer>
              <ContentContainer>
                <Routes>
                  <Route path={navigationPaths.home} element={<Home/>}/>
                  <Route path={navigationPaths.home2} element={<Home/>}/>
                  <Route path={navigationPaths.product} element={<ProductDetail/>}/>
                  <Route path={navigationPaths.products} element={<Products/>}/>
                  <Route path={navigationPaths.search} element={<Search/>}/>
                </Routes>
              </ContentContainer>
              <MainContainer>
                <Footer/>
              </MainContainer>
            </StyledApp>
          </BrowserRouter>
        </Provider>
      </SkeletonTheme>
    </ThemeProvider>
  );
}

export default App;
