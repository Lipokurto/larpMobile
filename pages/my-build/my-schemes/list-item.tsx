/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ImageBackground, Text, View, StyleSheet } from 'react-native';

import paper from '../../../assets/build_scheme/icons/paper.png';
import labelPaper from '../../../assets/build_scheme/icons/labelPaper.png';

import { resolvePath } from '../../../utils/resolve-path';
import { Item } from '../type';

type Props = {
  label: string;
  items: Item[];
};

export default function ListItem(props: Props): JSX.Element {
  return (
    <ImageBackground
      source={{ uri: resolvePath(paper) }}
      imageStyle={{
        marginLeft: -7,
        marginRight: -7,
        marginBottom: -10,
      }}
      resizeMode="stretch"
      style={{ marginBottom: props.label === 'Нужно' ? 25 : 5 }}>
      <ImageBackground
        source={{ uri: resolvePath(labelPaper) }}
        imageStyle={{
          height: 50,
          width: 150,
          marginLeft: -15,
          marginTop: -15,
        }}
        style={{ marginBottom: 10 }}>
        <Text style={{ textAlign: 'center', marginTop: -5 }}>
          {props.label}
        </Text>
      </ImageBackground>
      {props.items.map(p => {
        return (
          <View style={style.modalList} key={p.label}>
            <Text>{p.label}</Text>
            <Text>{p.count}</Text>
          </View>
        );
      })}
    </ImageBackground>
  );
}

const style = StyleSheet.create({
  modalList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: '5%',
    marginRight: '5%',
    borderColor: 'brown',
    borderBottomWidth: 2,
  },
});
