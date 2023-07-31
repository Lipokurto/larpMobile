import React from 'react';

import {
  FlatList,
  TouchableOpacity,
  Text,
  View,
  Image,
  StyleSheet,
} from 'react-native';

import barbute from '../../assets/main-menu-icons/barbute.png';
import book from '../../assets/main-menu-icons/book.png';

import { mainStyle } from './main-style';
import { resolvePath } from '../../utils/resolve-path';

type Service = {
  name: string;
  description: string;
  key: number;
  img: string;
};

const service: Service[] = [
  {
    name: 'Мои хиты',
    description: 'Рассчитай свои хиты',
    key: 1,
    img: resolvePath(barbute),
  },
  {
    name: 'Правила',
    description: 'Полный текст правил',
    key: 2,
    img: resolvePath(book),
  },
];

export default function Main({ navigation }: any): JSX.Element {
  return (
    <View style={mainStyle.container}>
      <Text style={[mainStyle.text, style.header]}>Темные века</Text>

      <FlatList
        data={service}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('MyHits', item)}
              style={style.item}>
              <Image
                source={{
                  width: 50,
                  height: 50,
                  uri: item.img,
                }}
              />

              <View style={style.text}>
                <Text style={style.title}>{item.name}</Text>
                <Text style={style.description}>{item.description}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const style = StyleSheet.create({
  header: {
    marginBottom: 30,
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    padding: 10,
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 10,
  },
  text: {
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  title: {
    fontWeight: '500',
    fontSize: 22,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 5,
  },
});
