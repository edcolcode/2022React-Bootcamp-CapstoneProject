import {useState, useEffect} from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';

import {NavigateBefore} from '@styled-icons/material-outlined/NavigateBefore';
import {Pause} from '@styled-icons/bootstrap/Pause';
import {NavigateNext} from '@styled-icons/material-outlined/NavigateNext';
import {Play} from '@styled-icons/boxicons-regular/Play';

import {useFeaturedBanners} from '../utils/hooks/useFeaturedBanners';
import Button from './Button';

const PLAYBACK_SPEED_MS = 3000;

const width = 300;
const height = 300;
const StyledSliderBanner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    max-height: ${height}px;
    min-width: ${width}px;
    margin: ${({theme}) => theme.coreSpace * 2}px;
    margin-top: ${({theme}) => theme.coreSpace * 4}px;
`;
const StyledSliderBannerNavigation = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    max-width: 60%;

    margin-top: -30px;
`;
const StyledSliderBannerImg = styled.img`
    max-width: 80%;
    max-height: ${height}px;
`;
const StyledSliderBannerTitleContainer = styled.div`
    position: absolute;
    color: white;
`;
const StyledSliderBannerTitle = styled.h4`
    text-shadow: 0px 0px 4px black;
`;

const SliderBanner = () => {
    const {data, isLoading} = useFeaturedBanners();
    const [items, setItems] = useState([]);

    const [bannerIdx, setBannerIdx] = useState(1);
    const [isPlaybackActive, setIsPlaybackActive] = useState(true);

    const resumePlayback = () => {
        setIsPlaybackActive(true);
    };

    const stopPlayback = () => {
        setIsPlaybackActive(false);
    };

    const handleNextBanner = () => {
        const nextBannerIdx = (bannerIdx + 1) % bannersDataLength;
        setBannerIdx(nextBannerIdx);
    };

    useEffect(() => {
        let interval = null;
        if (!isLoading) {
            const results = data.results;
            setItems(results);
            if (results.length > 0) {
                setIsPlaybackActive(true);
            }
        }

        if (isPlaybackActive) {
            const bannersDataLength = items.length;
            if (bannersDataLength <= 0) {
                setIsPlaybackActive(false);
            } else {
                interval = setInterval(() => {
                    const nextBannerIdx = (bannerIdx + 1) % bannersDataLength;
                    setBannerIdx(nextBannerIdx);
                }, PLAYBACK_SPEED_MS);
            }
        } else {
            clearInterval(interval);
        }

        return () => {
            clearInterval(interval);
        };
    }, [bannerIdx, isPlaybackActive, items, isLoading, data]);    

    const bannersDataLength = items.length;
    const handlePrevBanner = () => {
        let nextBannerIdx = (bannerIdx - 1) % bannersDataLength;
        if (nextBannerIdx < 0) {
            nextBannerIdx = bannersDataLength - 1;
        }
        setBannerIdx(nextBannerIdx);

    };
    const handleBannerPlayback = () => {
        setIsPlaybackActive(!isPlaybackActive);
        if (isPlaybackActive) {
            stopPlayback();
        } else {
            resumePlayback();
        }
    };

    return (
        <StyledSliderBanner>
            {isLoading 
                ? <Skeleton containerClassName='skeletonFullWidthContainer' height={height}/>
                :
                    bannersDataLength <= 0
                        ? null
                        :
                        <>
                            {/* Content */}
                            <StyledSliderBannerTitleContainer>
                                <StyledSliderBannerTitle>
                                    {items[bannerIdx].data.title}
                                </StyledSliderBannerTitle>
                            </StyledSliderBannerTitleContainer>
                            <StyledSliderBannerImg src={items[bannerIdx]?.data?.main_image?.url}/>
                            {/* Navigation */}
                            <StyledSliderBannerNavigation>
                                <Button
                                    type="transparent"
                                    onClick={handlePrevBanner}
                                >
                                    <NavigateBefore size="18"/>
                                </Button>
                                <Button
                                    type="transparent"
                                    onClick={handleBannerPlayback}
                                >
                                    {
                                        isPlaybackActive
                                            ? <Pause size="18"/>
                                            : <Play size="18"/>
                                    }
                                    
                                </Button>
                                <Button
                                    type="transparent"
                                    onClick={handleNextBanner}
                                >
                                    <NavigateNext size="18"/>
                                </Button>
                            </StyledSliderBannerNavigation>
                        </>
            }
        </StyledSliderBanner>
    );
}

export default SliderBanner;