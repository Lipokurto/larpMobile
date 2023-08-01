import React from 'react';

import {
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  View,
} from 'react-native';

import barbute from '../../assets/main-menu-icons/barbute.png';
import book from '../../assets/main-menu-icons/book.png';
import scroll from '../../assets/main-menu-icons/scroll.png';
import logo from '../../assets/logo/logo_EMPTY_BACK_2024.png';

import { resolvePath } from '../../utils/resolve-path';
import WoodBG from '../../utils/woodBG';

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
    <WoodBG>
      <View>
        <Image
          style={style.logo}
          source={{
            height: 200,
            width: 200,
            uri: resolvePath(logo),
          }}
        />
        <FlatList
          data={service}
          renderItem={({ item }) => {
            return (
              <ImageBackground
                source={{ uri: resolvePath(scroll) }}
                resizeMode="stretch">
                <TouchableOpacity
                  onPress={() => navigation.navigate('MyHits', item)}
                  style={style.item}>
                  <Text style={style.title}>{item.name}</Text>
                  <Text style={style.description}>{item.description}</Text>
                </TouchableOpacity>
              </ImageBackground>
            );
          }}
        />
      </View>
    </WoodBG>
  );
}

const style = StyleSheet.create({
  header: {
    marginBottom: 30,
  },
  item: {
    marginBottom: 20,
    justifyContent: 'center',
    padding: 10,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    fontFamily: 'mr_ReaverockG',
    color: 'black',

    textShadowColor: 'white',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 3,
  },
  description: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 5,
    fontFamily: 'mr_ReaverockG',
  },
  logo: {
    alignSelf: 'center',
    margin: 10,
    marginTop: 30,
  },
});