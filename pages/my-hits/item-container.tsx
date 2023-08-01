import React from 'react';
import { Text, ImageBackground, StyleSheet } from 'react-native';

import { resolvePath } from '../../utils/resolve-path';
import metalRing from '../../assets/hit_icons/metalRing.png';
import labelPlate from '../../assets/hit_icons/labelPlate.png';

type Props = {
  name: string;
};

export default function ItemContainer(props: Props): JSX.Element {
  return (
    <ImageBackground
      source={{ uri: resolvePath(metalRing) }}
      resizeMode="cover"
      imageStyle={style.ring}>
      <ImageBackground
        source={{ uri: resolvePath(labelPlate) }}
        resizeMode="stretch"
        imageStyle={style.label}>
        <Text style={style.text}>{props.name}</Text>
      </ImageBackground>
    </ImageBackground>
  );
}

const style = StyleSheet.create({
  text: {
    fontSize: 18,
    color: 'black',
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: '500',
    fontFamily: 'mr_ReaverockG',
    textShadowColor: 'orange',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 3,
  },
  ring: {
    height: 80,
    width: 80,
    marginTop: -6,
    marginLeft: -7,
  },
  label: {
    height: 30,
    width: 80,
    marginLeft: -7.5,
  },
});
