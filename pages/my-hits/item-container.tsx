import React from 'react';
import { Text, ImageBackground, StyleSheet, Dimensions } from 'react-native';

import metalRing from '../../assets/hit_icons/bronzeRing.png';
import labelPlate from '../../assets/hit_icons/labelPlate.png';

import { resolvePath } from '../../utils/resolve-path';
import { breakPoints } from '../../utils/break-points';

type Props = {
  name: string;
  img: string;
};

const windowWidth = Dimensions.get('window').width;

export default function ItemContainer(props: Props): JSX.Element {
  return (
    <ImageBackground
      source={{ uri: props.img }}
      resizeMode={props.name === 'Голова' ? 'cover' : 'stretch'}
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
  },
  ring: {
    height: windowWidth >= breakPoints.xs ? 100 : 80,
    width: windowWidth >= breakPoints.xs ? 100 : 80,
    marginTop: -6,
    marginLeft: windowWidth >= breakPoints.xs ? -5 : -7,
  },
  label: {
    height: 30,
    width: windowWidth >= breakPoints.xs ? 100 : 80,
    marginLeft: windowWidth >= breakPoints.xs ? -5 : -7.5,
  },
  itemImageBackground: {
    minHeight: windowWidth >= breakPoints.xs ? 80 : 65,
    borderRadius: 30,
  },
});
