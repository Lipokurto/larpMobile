/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';

import board from '../../assets/build_icons/board.png';

import rope from '../../assets/build_icons/rope.png';
import nail from '../../assets/build_icons/nail.png';

import { defaultPrice } from './defaults';
import { ItemPrice } from './type';
import { resolvePath } from '../../utils/resolve-path';

type Props = {
  globalPrice: number | null;
};

export default function PicePrices(props: Props): JSX.Element {
  const currentItemPrice: ItemPrice[] = defaultPrice.map(p => {
    return {
      ...p,
      price:
        props.globalPrice !== null
          ? Number((props.globalPrice / p.countInCube).toFixed(2))
          : 0,
    };
  });

  const renderDecryption = React.useMemo(() => {
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: 10,
        }}>
        <Text style={{ fontSize: 12, color: '#000000' }}>шт/м</Text>
        <Text style={{ fontSize: 10, textAlignVertical: 'top' }}>3</Text>
      </View>
    );
  }, []);

  const renderNail = React.useMemo(
    () => (
      <Image
        source={{
          uri: resolvePath(nail),
          width: 3,
          height: 10,
        }}
        style={{
          marginTop: 8,
          height: 10,
          width: 10,
          marginLeft: 2,
          marginRight: 2,
        }}
      />
    ),
    [],
  );

  const renderRope = React.useMemo(
    () => (
      <Image
        source={{
          uri: resolvePath(rope),
          width: 3,
          height: 29,
        }}
        style={{
          height: 29,
          width: 10,
        }}
      />
    ),
    [],
  );

  const renderItemLabel = React.useCallback(
    (label: string) => {
      const shredLabel = label.split('*');
      return (
        <View style={{ flexDirection: 'row' }}>
          <Text style={style.textPrice}>{shredLabel[0]}</Text>

          {renderNail}

          <Text style={style.textPrice}>{shredLabel[1]}</Text>

          {renderNail}

          <Text style={style.textPrice}>{shredLabel[2]}</Text>
        </View>
      );
    },
    [renderNail],
  );

  return (
    <View style={{ marginTop: 5 }}>
      {currentItemPrice.map(p => (
        <ImageBackground
          source={{ uri: resolvePath(board) }}
          resizeMode="stretch"
          imageStyle={{ marginLeft: '-3%', marginTop: 2, marginBottom: 2 }}
          key={p.item}
          style={style.itemPrice}>
          <Text style={{ width: '40%' }}>{renderItemLabel(p.item)}</Text>

          {renderRope}

          <Text
            style={[
              style.textPrice,
              {
                width: '25%',
                textAlign: 'center',
                height: 25,
                marginBottom: 2,
              },
            ]}>
            {p.countInCube} {renderDecryption}
          </Text>

          {renderRope}

          <Text
            style={[style.textPrice, { width: '25%', textAlign: 'center' }]}>
            {p.price}
          </Text>
        </ImageBackground>
      ))}
    </View>
  );
}

const style = StyleSheet.create({
  itemPrice: {
    flexDirection: 'row',
    width: '100%',
    marginLeft: '3%',
    marginRight: '7%',
    marginTop: '2%',
  },
  textPrice: {
    color: '#000000',
    fontSize: 16,
    textAlignVertical: 'center',
    marginTop: 3,
  },
});
