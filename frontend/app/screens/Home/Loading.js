import React from 'react';
import LottieView from 'lottie-react-native'
import animationData from '../../assets/100088-lazy-panda.json';
import { useSelector } from 'react-redux';


export const Loading = () => {
  const isLoading = useSelector((store) => store.ui.isLoading)

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };
  
    return (
      isLoading && (
        <LottieView source={require('../../assets/100088-lazy-panda.json')} autoPlay loop />
      )
    );
  };