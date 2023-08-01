import React from 'react';

import { StyleSheet, ImageBackground } from 'react-native';

import mainBG from '../assets/main-menu-icons/mainBG.jpg';
import { resolvePath } from './resolve-path';

type Props = {
  children: JSX.Element;
};

export default function WoodBG({ children }: Props) {
  return (
    <ImageBackground
      source={{ uri: resolvePath(mainBG) }}
      imageStyle={style.mainBG}
      resizeMode="repeat">
      {children}
    </ImageBackground>
  );
}

const style = StyleSheet.create({
  mainBG: {
    height: '200%',
  },
  logo: {
    alignSelf: 'center',
    margin: 10,
    marginTop: 30,
  },
});
