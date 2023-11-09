import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
} from 'react-native';

import rope from '../../assets/timer/rope.png';
import stripe from '../../assets/timer/stripe.png';
import healIcon from '../../assets/timer/icons/heal.png';
import repairIcon from '../../assets/timer/icons/repair.png';
import heavyIcon from '../../assets/timer/icons/heavy.png';
import lootIcon from '../../assets/timer/icons/loot.png';
import deadIcon from '../../assets/timer/icons/scull.png';
import victimIcon from '../../assets/timer/icons/mark.png';
import prayIcon from '../../assets/timer/icons/pray.png';
import eatIcon from '../../assets/timer/icons/eat.png';
import executionIcon from '../../assets/timer/icons/execution.png';

import WoodBG from '../../utils/woodBG';
import { resolvePath } from '../../utils/resolve-path';

const timers = [
  { type: 'heal', name: 'Лечение', time: [0, 15, 0], icon: healIcon },
  { type: 'repair', name: 'Ремонт', time: [0, 15, 0], icon: repairIcon },
  { type: 'heavy', name: 'Тяжелое ранение', time: [0, 15, 0], icon: heavyIcon },
  { type: 'loot', name: 'Полный обыск', time: [0, 5, 0], icon: lootIcon },

  { type: 'dead', name: 'Мертвяк', time: [2, 0, 0], icon: deadIcon },
  {
    type: 'victimDead',
    name: 'Метка жертвы',
    time: [1, 0, 0],
    icon: victimIcon,
  },

  { type: 'pray', name: 'Молитва', time: [0, 10, 0], icon: prayIcon },
  { type: 'eat', name: 'Пожирание', time: [0, 15, 0], icon: eatIcon },
  { type: 'execution', name: 'Казнь', time: [0, 5, 0], icon: executionIcon },
];

export default function MyTime({ navigation }: any): JSX.Element {
  const renderButtons = React.useMemo(
    () =>
      timers.map(e => {
        return (
          <ImageBackground
            source={{ uri: resolvePath(stripe) }}
            resizeMode="stretch">
            <TouchableOpacity
              style={style.item}
              onPress={() =>
                navigation.navigate('MyTimer', {
                  params: { timer: e.time },
                })
              }>
              <Image
                source={{
                  height: 50,
                  width: 50,
                  uri: resolvePath(e.icon),
                }}
              />

              <Text style={style.text}>{e.name}</Text>

              <Image
                source={{
                  height: 45,
                  width: 15,
                  uri: resolvePath(rope),
                }}
              />

              <Text style={style.time}>{`${e.time[0]
                .toString()
                .padStart(2, '0')}:${e.time[1]
                .toString()
                .padStart(2, '0')}:${e.time[2]
                .toString()
                .padStart(2, '0')}`}</Text>
            </TouchableOpacity>
          </ImageBackground>
        );
      }),
    [navigation],
  );

  return (
    <WoodBG>
      <View style={style.container}>{renderButtons}</View>
    </WoodBG>
  );
}

const style = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  item: {
    height: 50,
    display: 'flex',
    flexDirection: 'row',
  },
  time: {
    fontSize: 20,
    width: '20%',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#000000',
    fontFamily: 'mr_ReaverockG',
  },
  text: {
    fontSize: 20,
    marginLeft: 20,
    marginRight: 20,
    width: '40%',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#000000',
    fontFamily: 'mr_ReaverockG',
  },
});
