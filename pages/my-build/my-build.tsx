/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {
  NativeSyntheticEvent,
  TextInput,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  Dimensions,
  Text,
} from 'react-native';

import flagY from '../../assets/hit_icons/flagY.png';
import flagHorizontal from '../../assets/hit_icons/flagHorizontal.png';
import clearIcon from '../../assets/hit_icons/clearIcon.png';
import buildScroll from '../../assets/build_icons/calc-scroll.png';

import WoodBG from '../../utils/woodBG';
import PicePrices from './pice-prices';
import { resolvePath } from '../../utils/resolve-path';

const windowWidth = Dimensions.get('window').width;

export default function MyBuild(): JSX.Element {
  const [globalPrice, setGlobalPrice] = React.useState<number | null>(null);

  const handleChangePrice = React.useCallback(
    (e: NativeSyntheticEvent<{ text: string }>) => {
      const currentPrice = Number(e.nativeEvent.text.replace(/[^0-9]/g, ''));

      setGlobalPrice(currentPrice);
    },
    [],
  );

  const handleReset = React.useCallback(() => {
    setGlobalPrice(null);
  }, []);

  return (
    <WoodBG>
      <View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
          <ImageBackground
            source={{ uri: resolvePath(flagHorizontal) }}
            imageStyle={{ width: 50, height: 80, marginTop: -10 }}
            style={{ width: 50 }}>
            <Text style={style.leftText}>Цена</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={style.leftText}>за 1 м</Text>
              <Text
                style={[
                  style.leftText,
                  { fontSize: 10, textAlignVertical: 'top', marginLeft: 0 },
                ]}>
                3
              </Text>
            </View>
            <Text style={style.leftText}>леса</Text>
          </ImageBackground>

          <ImageBackground
            source={{ uri: resolvePath(buildScroll) }}
            resizeMode="stretch">
            <TextInput
              style={style.mainInput}
              autoFocus
              onChange={handleChangePrice}
              value={globalPrice?.toString()}
              inputMode="decimal"
              keyboardType="number-pad"
            />
          </ImageBackground>

          <ImageBackground
            source={{ uri: resolvePath(flagY) }}
            imageStyle={{ width: 50, height: 80, marginTop: -10 }}
            style={{ width: 50 }}>
            <TouchableOpacity onPress={() => handleReset()}>
              <Image
                source={{
                  uri: resolvePath(clearIcon),
                  height: 30,
                  width: 30,
                }}
                style={{ alignSelf: 'center', marginTop: 10, opacity: 0.5 }}
              />
            </TouchableOpacity>
          </ImageBackground>
        </View>

        <PicePrices globalPrice={globalPrice} />
      </View>
    </WoodBG>
  );
}

const style = StyleSheet.create({
  mainInput: {
    borderWidth: 2,
    fontSize: 20,
    textAlign: 'center',
    width: windowWidth - 100,
  },
  leftText: {
    fontSize: 16,
    color: '#ffffff',
    fontFamily: 'mr_ReaverockG',
    // textAlign: 'center',
    marginLeft: 5,
  },
});
