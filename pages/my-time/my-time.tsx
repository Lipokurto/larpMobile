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
import deadIcon from '../../assets/timer/icons/scull.png';
import planIcon from '../../assets/timer/icons/mine.png';
import tradeIcon from '../../assets/timer/icons/trade.png';

import WoodBG from '../../utils/woodBG';
import { resolvePath } from '../../utils/resolve-path';

const timers = [
  { type: 'heal', name: 'Лечение', time: [0, 15, 0], icon: healIcon },
  { type: 'repair', name: 'Ремонт', time: [0, 15, 0], icon: repairIcon },
  { type: 'heavy', name: 'Тяжелое ранение', time: [0, 15, 0], icon: heavyIcon },
  { type: 'dead', name: 'Мертвяк', time: [2, 0, 0], icon: deadIcon },
  { type: 'plan', name: 'План работ', time: [2, 0, 0], icon: planIcon },
  { type: 'trade', name: 'Снабжение', time: [2, 0, 0], icon: tradeIcon },
];

export default function MyTime({ navigation }: any): JSX.Element {
  const renderButtons = React.useMemo(
    () =>
      timers.map(e => {
        return (
          <ImageBackground
            source={{ uri: resolvePath(stripe) }}
            resizeMode="stretch"
            key={e.name}>
            <TouchableOpacity
              style={style.item}
              onPress={() =>
                navigation.navigate('MyTimer', {
                  params: {
                    timer: e.time,
                    type: e.type,
                  },
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
                // eslint-disable-next-line react-native/no-inline-styles
                style={{ marginTop: 3 }}
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
    marginLeft: 10,
  },
  time: {
    fontSize: 20,
    width: '20%',
    textAlign: 'right',
    textAlignVertical: 'center',
    color: 'wheat',
    fontFamily: 'mr_ReaverockG',
    textShadowColor: '#000000',
    textShadowRadius: 10,
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
    textShadowColor: '#ffffff',
    textShadowRadius: 10,
  },
});
