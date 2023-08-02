import React from 'react';
import { Text, ImageBackground, StyleSheet } from 'react-native';

import metalRing from '../../assets/hit_icons/metalRing.png';
import labelPlate from '../../assets/hit_icons/labelPlate.png';

import { resolvePath } from '../../utils/resolve-path';

type Props = {
  name: string;
  img: string;
};

export default function ItemListContainer(props: Props): JSX.Element {
  return (
    <ImageBackground
      source={{ uri: props.img }}
      resizeMode="stretch"
      imageStyle={style.itemImageBackground}>
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
    </ImageBackground>
  );
}

const style = StyleSheet.create({
  text: {
    fontSize: 18,
    color: '#000000',
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: '500',
    fontFamily: 'mr_ReaverockG',
    marginLeft: -8,
  },
  ring: {
    height: 100,
    width: 100,
    marginTop: -6,
    marginLeft: -5,
  },
  label: {
    height: 30,
    width: 100,
    marginLeft: -6,
  },
  itemImageBackground: {
    height: 80,
    width: 85,
  },
});
