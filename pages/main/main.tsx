import React from 'react';

import {
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  View,
  Linking,
} from 'react-native';

import scroll from '../../assets/main-menu-icons/scroll.png';
import logo from '../../assets/logo/logo_EMPTY_BACK_2025.png';

import { resolvePath } from '../../utils/resolve-path';
import WoodBG from '../../utils/woodBG';

type Service = {
  name: string;
  description: string;
  service: string;
  key: number;
};

const service: Service[] = [
  {
    name: 'Мои хиты',
    description: 'Рассчитай свои хиты',
    service: 'MyHits',
    key: 1,
  },
  {
    name: 'Мое время',
    description: 'Поставь таймер статуса',
    service: 'MyTime',
    key: 2,
  },
  {
    name: 'Мой строяк',
    description: 'Рассчитай стоимость доски',
    service: 'MyBuild',
    key: 3,
  },
];

export default function Main({ navigation }: any): JSX.Element {
  const link = 'http://larpdarkage.ru/';
  const openLink = React.useCallback(() => {
    Linking.openURL(link);
  }, []);

  return (
    <WoodBG>
      <View>
        <TouchableOpacity onPress={openLink}>
          <Image
            style={style.logo}
            source={{
              height: 200,
              width: 200,
              uri: resolvePath(logo),
            }}
          />
        </TouchableOpacity>

        <FlatList
          data={service}
          renderItem={({ item }) => {
            return (
              <ImageBackground
                source={{ uri: resolvePath(scroll) }}
                resizeMode="stretch">
                <TouchableOpacity
                  onPress={() => navigation.navigate(item.service, item)}
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
    padding: 5,
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    fontFamily: 'mr_ReaverockG',
    color: '#000000',
  },
  description: {
    fontSize: 15,
    color: '#000000',
    textAlign: 'center',
    fontFamily: 'mr_ReaverockG',
  },
  logo: {
    alignSelf: 'center',
    margin: 10,
    marginTop: 30,
  },
});
