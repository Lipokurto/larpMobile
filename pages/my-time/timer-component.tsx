/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  View,
  Image,
} from 'react-native';

import ropeH from '../../assets/timer/ropeHorisontal.png';
import redButton from '../../assets/hit_icons/closeButton.png';
import healStatus from '../../assets/timer/status/heal-stripe.png';
import repairStatus from '../../assets/timer/status/repair-stripe.png';
import deadStatus from '../../assets/timer/status/dead-status.png';
import WoodBG from '../../utils/woodBG';
import { resolvePath } from '../../utils/resolve-path';

export default function TimerComponent(props: any): JSX.Element {
  const [hasMark, setHasMark] = React.useState<boolean>(false);
  const [isOver, setIsOver] = React.useState<boolean>(false);
  const [isStart, setIsStart] = React.useState<boolean>(false);
  const [[h, m, s], setTime] = React.useState(props.route.params.params.timer);

  const handleStart = React.useCallback(() => {
    setIsStart(true);
  }, []);

  const handleHasMark = React.useCallback(() => {
    setHasMark(true);
    setTime([1, 0, 0]);
  }, []);

  const handleNoMark = React.useCallback(() => {
    setHasMark(false);
    setTime([2, 0, 0]);
  }, []);

  const renderStartButton = React.useMemo(() => {
    return (
      <TouchableOpacity
        onPress={() => handleStart()}
        disabled={isStart}
        style={{
          width: '100%',
          alignItems: 'center',
          opacity: isStart ? 0.5 : 1,
          marginTop: 10,
        }}>
        <ImageBackground
          source={{ uri: resolvePath(redButton) }}
          resizeMode="stretch"
          imageStyle={{
            height: 40,
            width: 150,
          }}
          style={{ width: 150, marginBottom: 10 }}>
          <Text style={style.buttonText}>
            {isStart ? 'Теперь ждите...' : 'Начать'}
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  }, [handleStart, isStart]);

  const tick = React.useCallback(() => {
    if (isOver) {
      return;
    }

    if (h === 0 && m === 0 && s === 0) {
      setIsOver(true);
      return;
    }

    if (m === 0 && s === 0) {
      setTime([h - 1, 59, 59]);
      return;
    }

    if (s === 0) {
      setTime([h, m - 1, 59]);
      return;
    }

    setTime([h, m, s - 1]);
  }, [h, isOver, m, s]);

  React.useEffect(() => {
    if (isStart) {
      const timerID = setInterval(() => tick(), 1000);
      return () => clearInterval(timerID);
    }
  }, [isStart, tick]);

  const renderTime = React.useMemo(() => {
    const hh = h.toString().padStart(2, '0');
    const mm = m.toString().padStart(2, '0');
    const ss = s.toString().padStart(2, '0');

    return <Text>{`${hh}:${mm}:${ss}`}</Text>;
  }, [h, m, s]);

  const renderTimer = React.useMemo(() => {
    return (
      <View>
        {renderStartButton}
        <Text style={style.timerContainer}>{renderTime}</Text>
      </View>
    );
  }, [renderStartButton, renderTime]);

  const renderRopeDivider = React.useMemo(() => {
    return <Image style={style.rope} source={{ uri: resolvePath(ropeH) }} />;
  }, []);

  const renderMarkChoose = React.useMemo(() => {
    return (
      <View style={style.buttonsGroup}>
        <TouchableOpacity
          onPress={() => handleHasMark()}
          style={{
            opacity: hasMark ? 1 : 0.5,
            marginTop: 10,
          }}>
          <ImageBackground
            source={{ uri: resolvePath(redButton) }}
            resizeMode="stretch"
            imageStyle={{
              height: 40,
              width: 75,
            }}
            style={{ width: 75, marginBottom: 10 }}>
            <Text style={style.buttonText}>Да</Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleNoMark()}
          style={{
            opacity: !hasMark ? 1 : 0.5,
            marginTop: 10,
          }}>
          <ImageBackground
            source={{ uri: resolvePath(redButton) }}
            resizeMode="stretch"
            imageStyle={{
              height: 40,
              width: 75,
            }}
            style={{ width: 75, marginBottom: 10 }}>
            <Text style={style.buttonText}>Нет</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  }, [handleHasMark, handleNoMark, hasMark]);

  const renderInfo = React.useMemo(() => {
    const { type } = props.route.params.params;

    if (type === 'heal') {
      if (!isOver) {
        return (
          <View>
            <View style={style.block}>
              <Text style={style.text}>
                <Text style={{ color: 'white', fontSize: 25 }}>1.</Text>{' '}
                Используйте медкомплект или договоритесь о лечении в госпитале
              </Text>
            </View>
            {renderRopeDivider}

            <View style={style.block}>
              <Text style={style.text}>
                <Text style={{ color: 'white', fontSize: 25 }}>2.</Text>{' '}
                Наденьте повязку
              </Text>
              <Image
                style={style.stripe}
                source={{
                  uri: resolvePath(healStatus),
                  height: 50,
                  width: 50,
                }}
              />
            </View>
            {renderRopeDivider}

            <View style={style.block}>
              <Text style={style.text}>
                <Text style={{ color: 'white', fontSize: 25 }}>3.</Text>{' '}
                Запустите таймер
              </Text>
              {renderTimer}
              <Text style={style.text2}>
                Не уходите далеко от места лечения
              </Text>
            </View>
            {renderRopeDivider}

            <View style={style.block}>
              <Text style={style.text}>
                <Text style={{ color: 'white', fontSize: 25 }}>4.</Text>{' '}
                Дождитесь окончания лечения
              </Text>
            </View>
          </View>
        );
      }

      return (
        <View style={style.final}>
          <Text style={[style.timerContainer, { marginBottom: 20 }]}>
            Вы излечены!
          </Text>
          <Text style={style.text}>Вы восстановили все живые хиты</Text>
          <Text style={style.text}>Снимите повязку</Text>
        </View>
      );
    }

    if (type === 'repair') {
      if (!isOver) {
        return (
          <View>
            <View style={style.block}>
              <Text style={style.text}>
                <Text style={{ color: 'white', fontSize: 25 }}>1.</Text>{' '}
                Используйте ремкомплект или договоритесь о ремонте в кузнице
              </Text>
            </View>
            {renderRopeDivider}

            <View style={style.block}>
              <Text style={style.text}>
                <Text style={{ color: 'white', fontSize: 25 }}>2.</Text>{' '}
                Наденьте повязку
              </Text>
              <Image
                style={style.stripe}
                source={{
                  uri: resolvePath(repairStatus),
                  height: 50,
                  width: 50,
                }}
              />
            </View>
            {renderRopeDivider}

            <View style={style.block}>
              <Text style={style.text}>
                <Text style={{ color: 'white', fontSize: 25 }}>3.</Text>{' '}
                Запустите таймер
              </Text>
              {renderTimer}
              <Text style={style.text2}>
                Не уходите далеко от места ремонта
              </Text>
            </View>
            {renderRopeDivider}

            <View style={style.block}>
              <Text style={style.text}>
                <Text style={{ color: 'white', fontSize: 25 }}>4.</Text>{' '}
                Дождитесь окончания ремонта
              </Text>
            </View>
          </View>
        );
      }

      return (
        <View style={style.final}>
          <Text style={[style.timerContainer, { marginBottom: 20 }]}>
            Ваше снаряжение отремонтировано!
          </Text>
          <Text style={style.text}>Вы восстановили все броневые хиты</Text>
          <Text style={style.text}>Снимите повязку</Text>
        </View>
      );
    }

    if (type === 'heavy') {
      if (!isOver) {
        return (
          <View>
            <View style={style.block}>
              <Text style={style.text}>
                Вы истекаете кровью, поторопитесь найти помощь
              </Text>
            </View>
            {renderRopeDivider}

            <View style={style.block}>
              <Text style={style.text}>Запустите таймер</Text>
              {renderTimer}
              <Text style={style.text2}>
                Вы можете медленно передвигаться и звать на помощь
              </Text>
            </View>
            {renderRopeDivider}

            <View style={style.block}>
              <Text style={style.text}>
                Если вам не оказали помощь вы умираете
              </Text>
            </View>
          </View>
        );
      }

      return (
        <View style={style.final}>
          <Text style={[style.timerContainer, { marginBottom: 20 }]}>
            Вы умерли от полученных ран!
          </Text>

          <View style={style.block}>
            <Image
              style={style.stripe}
              source={{
                uri: resolvePath(deadStatus),
                height: 50,
                width: 50,
              }}
            />
          </View>

          <Text style={style.text}>Наденьте повязку</Text>

          <Text style={style.text}>Ближайшим путем проследуйте в мертвяк</Text>
        </View>
      );
    }

    if (type === 'dead') {
      if (!isOver) {
        return (
          <View>
            <View style={style.block}>
              <Text style={style.text}>
                <Text style={{ color: 'white', fontSize: 25 }}>1.</Text> Найдите
                интенданта своего лагеря или мастера по мертвяку
              </Text>
            </View>
            {renderRopeDivider}

            {!isStart && (
              <View style={style.block}>
                <Text style={style.text}>Принимаете метку жертвы?</Text>
                <Text style={style.text2}>
                  Если она у вас уже есть то пропускайте этот шаг
                </Text>
                {renderMarkChoose}
              </View>
            )}
            {!isStart ? renderRopeDivider : null}

            <View style={style.block}>
              <Text style={style.text}>
                <Text style={{ color: 'white', fontSize: 25 }}>2.</Text>{' '}
                Наденьте повязку
              </Text>
              <Image
                style={style.stripe}
                source={{
                  uri: resolvePath(deadStatus),
                  height: 50,
                  width: 50,
                }}
              />
            </View>
            {renderRopeDivider}

            <View style={style.block}>
              <Text style={style.text}>
                <Text style={{ color: 'white', fontSize: 25 }}>3.</Text>{' '}
                Запустите таймер
              </Text>
              {renderTimer}
              <Text style={style.text2}>Не уходите далеко от мертвяка</Text>
            </View>
            {renderRopeDivider}

            <View style={style.block}>
              <Text style={style.text}>
                <Text style={{ color: 'white', fontSize: 25 }}>4.</Text>{' '}
                Дождитесь окончания мертвяка
              </Text>
            </View>
          </View>
        );
      }

      return (
        <View style={style.final}>
          <Text style={[style.timerContainer, { marginBottom: 20 }]}>
            Ваше мертвяк окончен!
          </Text>
          <Text style={style.text}>Снимите повязку</Text>
          <Text style={style.text}>У вас восстанавливаются все хиты</Text>
          <Text style={style.text}>Психозы и метка жертвы остаются с вами</Text>
        </View>
      );
    }

    if (type === 'plan') {
      if (!isOver) {
        return (
          <View>
            <View style={style.block}>
              <Text style={style.text}>
                Ваше предприятие приступило к активной добыче ресурсов
              </Text>
            </View>
            {renderRopeDivider}

            <View style={style.block}>
              <Text style={style.text}>Запустите таймер</Text>
              {renderTimer}
              <Text style={style.text2}>
                В локации должны находится работники
              </Text>

              <Text style={style.text2}>Бригадир не должен покидать город</Text>
            </View>
            {renderRopeDivider}

            <View style={style.block}>
              <Text style={style.text}>Дождитесь окончания периода добычи</Text>
            </View>
          </View>
        );
      }

      return (
        <View style={style.final}>
          <Text style={[style.timerContainer, { marginBottom: 20 }]}>
            Вы добыли ресурсы!
          </Text>

          <Text style={style.text}>
            Бригадир может запросить у мастерского торговца ресурсы
          </Text>
        </View>
      );
    }

    if (type === 'trade') {
      if (!isOver) {
        return (
          <View>
            <View style={style.block}>
              <Text style={style.text}>
                <Text style={{ color: 'white', fontSize: 25 }}>1.</Text> Найдите
                интенданта своего лагеря
              </Text>
            </View>
            {renderRopeDivider}

            <View style={style.block}>
              <Text style={style.text}>
                <Text style={{ color: 'white', fontSize: 25 }}>2.</Text>{' '}
                Составьте список необходимых ресурсов
              </Text>
            </View>
            {renderRopeDivider}

            <View style={style.block}>
              <Text style={style.text}>
                <Text style={{ color: 'white', fontSize: 25 }}>3.</Text>{' '}
                Оплатите ресурсы заказанные ресурсы и поставьте печать лагеря
              </Text>
            </View>
            {renderRopeDivider}

            <View style={style.block}>
              <Text style={style.text}>
                <Text style={{ color: 'white', fontSize: 25 }}>3.</Text>{' '}
                Запустите таймер
              </Text>
              {renderTimer}
            </View>
            {renderRopeDivider}

            <View style={style.block}>
              <Text style={style.text}>
                <Text style={{ color: 'white', fontSize: 25 }}>4.</Text>{' '}
                Дождитесь когда ресурсы смогут прибыть в лагерь
              </Text>
            </View>
          </View>
        );
      }

      return (
        <View style={style.final}>
          <Text style={[style.timerContainer, { marginBottom: 20 }]}>
            Ресурсы прибыли!
          </Text>
          <Text style={style.text}>Получите заказанные ресурсы</Text>
          <Text style={style.text}>
            Можете составить новую заявку на снабжение
          </Text>
        </View>
      );
    }

    return <></>;
  }, [
    isOver,
    isStart,
    props.route.params.params,
    renderMarkChoose,
    renderRopeDivider,
    renderTimer,
  ]);

  return <WoodBG>{renderInfo}</WoodBG>;
}

const style = StyleSheet.create({
  buttonsGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  final: {
    marginTop: '40%',
  },
  rope: {
    width: '100%',
    height: 10,
    resizeMode: 'repeat',
  },
  block: {
    margin: 10,
    justifyContent: 'flex-start',
  },
  timerContainer: {
    fontSize: 50,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#ffffff',
    fontFamily: 'mr_ReaverockG',
  },
  buttonText: {
    fontSize: 17,
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'mr_ReaverockG',
  },
  text: {
    fontSize: 20,
    marginLeft: 20,
    marginRight: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'wheat',
    fontFamily: 'mr_ReaverockG',
  },
  text2: {
    fontSize: 15,
    marginLeft: 20,
    marginRight: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
    fontFamily: 'mr_ReaverockG',
  },
  stripe: {
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'gray',
  },
});
