/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Dimensions } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ImageBackground,
  Image,
} from 'react-native';

import none from '../../assets/armor-material/none.jpg';
import heart from '../../assets/health/heart.png';
import shield from '../../assets/health/shield.png';
import scroll from '../../assets/main-menu-icons/scroll.png';
import flag from '../../assets/hit_icons/flag.png';
import flagY from '../../assets/hit_icons/flagY.png';
import flagB from '../../assets/hit_icons/flagB.png';
import clearIcon from '../../assets/hit_icons/clearIcon.png';
import closeButton from '../../assets/hit_icons/closeButton.png';
import body from '../../assets/hit_icons/body.png';
import helmet from '../../assets/armor-material/helmet.png';

import { ArmorItem, Armor } from './type';
import { resolvePath } from '../../utils/resolve-path';
import WoodBG from '../../utils/woodBG';
import ItemContainer from './item-container';

import { myHitsStyle } from './my-hits-style';
import { armor, defaultArmor } from './defaults';
import { breakPoints } from '../../utils/break-points';
import PaperBG from '../../utils/paperBG';
import ItemListContainer from './item-list-container';

const windowWidth = Dimensions.get('window').width;

export default function MyHits(): JSX.Element {
  const [isVisibleModal, setIsVisibleModal] = React.useState<boolean>(false);

  const [currentArmor, setCurrentArmor] = React.useState<Armor[]>(defaultArmor);
  const [hits, setHits] = React.useState<number>(1);
  const [currentLimb, setCurrentLimb] = React.useState<string>('');
  const [hasHelmet, setHasHelmet] = React.useState<boolean>(false);
  const [hasBack, setHasBack] = React.useState<boolean>(false);

  const toast = useToast();

  React.useEffect(() => {
    const totalHits = currentArmor.reduce((acc, p) => acc + p.hits, 1);

    if (
      !isVisibleModal &&
      totalHits !== hits &&
      totalHits > 1 &&
      !hasHelmet &&
      currentLimb !== 'back' &&
      currentLimb !== 'head'
    ) {
      toast.show('Без шлема хиты за броню не считаются - наденьте шлем', {
        animationType: 'zoom-in',
        textStyle: style.toastText,
      });

      return;
    }

    setHits(hasHelmet ? Math.round(totalHits) : 1);
  }, [
    hits,
    currentArmor,
    hasHelmet,
    hasBack,
    toast,
    currentLimb,
    isVisibleModal,
  ]);

  const renderHealth = React.useMemo(() => {
    const shields = Array(Math.round(hits)).fill(resolvePath(shield));
    shields[0] = resolvePath(heart);

    return (
      <View style={style.healthRow}>
        {hasHelmet ? (
          shields.map((p, i) => {
            return (
              <Image
                source={{ uri: p }}
                key={p + i}
                style={{ width: 30, height: 30 }}
              />
            );
          })
        ) : (
          <Image
            source={{ uri: shields[0] }}
            style={{ width: 30, height: 30 }}
          />
        )}
      </View>
    );
  }, [hasHelmet, hits]);

  const handleArmorChange = React.useCallback(
    (name: string) => {
      setIsVisibleModal(!isVisibleModal);
      setCurrentLimb(name);
    },
    [isVisibleModal],
  );

  const calculateArmor = React.useCallback(
    (armorClass: number) => {
      if (currentLimb === 'torso') {
        if (hasBack) {
          return armorClass;
        } else {
          return armorClass / 2;
        }
      }

      return armorClass / 4;
    },
    [hasBack, currentLimb],
  );

  const handleSetArmor = React.useCallback(
    (correctArmor: ArmorItem) => {
      const constArmor = currentArmor.map(p => {
        if (p.limb === currentLimb) {
          return {
            ...p,
            hits: calculateArmor(correctArmor.value.armorClass),
            img: correctArmor.img,
          };
        }

        return p;
      });

      setCurrentArmor(constArmor);
      setIsVisibleModal(!isVisibleModal);
    },
    [currentArmor, isVisibleModal, currentLimb, calculateArmor],
  );

  const handleReset = React.useCallback(() => {
    setCurrentArmor(defaultArmor);
    setHits(1);
    setHasHelmet(false);
    setHasBack(false);
  }, []);

  const helmBackChange = React.useCallback(
    (type: string, answer: boolean) => {
      if (type === 'head') {
        setHasHelmet(answer);
      }

      if (type === 'back') {
        if (currentArmor[2].hits === 0 && answer) {
          toast.show('Сначала оденьте броню на тело', {
            animationType: 'zoom-in',
            textStyle: style.toastText,
          });

          return;
        }

        if (answer && hasBack) {
          setIsVisibleModal(false);
          return;
        }

        setHasBack(answer);

        const correctArmor = currentArmor.map(p => {
          if (p.limb === 'torso') {
            return {
              ...p,
              hits: answer ? p.hits * 2 : p.hits / 2,
            };
          }

          return p;
        });

        setCurrentArmor(correctArmor);
      }

      setIsVisibleModal(false);
    },
    [currentArmor, hasBack, toast],
  );

  const renderAskButton = React.useCallback(
    (answer: string) => {
      return (
        <ImageBackground
          source={{ uri: resolvePath(flagB) }}
          imageStyle={{
            width: 60,
            height: 80,
            marginLeft: -5,
            marginTop: -5,
          }}
          resizeMode="stretch"
          style={{ width: 50 }}>
          <TouchableOpacity
            onPress={() => helmBackChange(currentLimb, answer === 'ДА')}
            style={{ height: 60 }}>
            <Text style={style.askButtonText}>{answer}</Text>
          </TouchableOpacity>
        </ImageBackground>
      );
    },
    [currentLimb, helmBackChange],
  );

  const modalInternals = React.useMemo(() => {
    if (currentLimb === 'head') {
      return (
        <View style={style.modalButtons}>
          {renderAskButton('ДА')}

          {renderAskButton('НЕТ')}
        </View>
      );
    }

    if (currentLimb === 'back') {
      return (
        <View style={style.modalButtons}>
          {renderAskButton('ДА')}

          {renderAskButton('НЕТ')}
        </View>
      );
    }

    return (
      <View style={style.itemsListContainer}>
        {armor.map(p => {
          return (
            <View key={p.value.type}>
              <TouchableOpacity
                onPress={() => handleSetArmor(p)}
                style={style.itemList}>
                <ItemListContainer name={p.label} img={p.img} />
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    );
  }, [currentLimb, renderAskButton, handleSetArmor]);

  const listText = React.useMemo(() => {
    if (currentLimb === 'head') {
      return 'Одеть шлем?';
    }

    if (currentLimb === 'back') {
      return 'Спина закрыта доспехом?';
    }

    return currentArmor.find(p => p.limb === currentLimb)?.name;
  }, [currentArmor, currentLimb]);

  const handleCloseModal = React.useCallback(() => {
    setIsVisibleModal(false);
  }, []);

  const renderModal = React.useMemo(() => {
    const isNotHeadOrBack = currentLimb !== 'head' && currentLimb !== 'back';

    return (
      <Modal visible={isVisibleModal} animationType="slide" transparent>
        <PaperBG>
          <View>
            <ImageBackground
              source={{ uri: resolvePath(scroll) }}
              imageStyle={{
                height: 80,
                marginTop: -30,
              }}
              style={style.descTextModal}>
              <Text style={style.listText}>{listText}</Text>
            </ImageBackground>

            {modalInternals}

            {isNotHeadOrBack && (
              <TouchableOpacity
                onPress={() => handleCloseModal()}
                style={{ width: '100%', alignItems: 'center' }}>
                <ImageBackground
                  source={{ uri: resolvePath(closeButton) }}
                  resizeMode="stretch"
                  imageStyle={{
                    height: 40,
                    width: 150,
                  }}
                  style={{ width: 150 }}>
                  <Text style={style.closeText}>Закрыть</Text>
                </ImageBackground>
              </TouchableOpacity>
            )}
          </View>
        </PaperBG>
      </Modal>
    );
  }, [currentLimb, handleCloseModal, isVisibleModal, listText, modalInternals]);

  return (
    <WoodBG>
      <ImageBackground
        source={{ uri: resolvePath(body) }}
        resizeMode="contain"
        imageStyle={{
          opacity: 0.3,
          marginTop: 50,
        }}>
        <View style={myHitsStyle.container}>
          {isVisibleModal && renderModal}

          <ImageBackground
            source={{ uri: resolvePath(scroll) }}
            imageStyle={{ width: '100%', marginTop: -20, height: 60 }}
            style={{
              height: 30,
              display: 'flex',
              alignSelf: 'stretch',
              marginTop: 5,
              marginBottom: 10,
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <ImageBackground
                source={{ uri: resolvePath(flag) }}
                imageStyle={{ width: 50, height: 80, marginTop: -10 }}
                style={{ width: 50 }}>
                <Text style={style.hitText}>{hits}</Text>
              </ImageBackground>

              {renderHealth}

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
          </ImageBackground>

          <TouchableOpacity
            onPress={() => handleArmorChange(currentArmor[0].limb)}
            style={style.headItem}>
            <ItemContainer
              name={currentArmor[0].name}
              img={resolvePath(hasHelmet ? helmet : none)}
            />
          </TouchableOpacity>

          <View style={style.body}>
            <TouchableOpacity
              onPress={() => handleArmorChange(currentArmor[1].limb)}
              style={style.item}>
              <ItemContainer
                name={currentArmor[1].name}
                img={currentArmor[1].img}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleArmorChange(currentArmor[2].limb)}
              style={style.item}>
              <ItemContainer
                name={currentArmor[2].name}
                img={currentArmor[2].img}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleArmorChange(currentArmor[3].limb)}
              style={style.item}>
              <ItemContainer
                name={currentArmor[3].name}
                img={currentArmor[3].img}
              />
            </TouchableOpacity>
          </View>

          <View style={style.body}>
            <TouchableOpacity
              onPress={() => handleArmorChange(currentArmor[4].limb)}
              style={style.item}>
              <ItemContainer
                name={currentArmor[4].name}
                img={currentArmor[4].img}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleArmorChange(currentArmor[5].limb)}
              style={style.item}>
              <ItemContainer
                name={currentArmor[5].name}
                img={hasBack ? currentArmor[2].img : resolvePath(none)}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleArmorChange(currentArmor[6].limb)}
              style={style.item}>
              <ItemContainer
                name={currentArmor[6].name}
                img={currentArmor[6].img}
              />
            </TouchableOpacity>
          </View>

          <View style={style.body}>
            <TouchableOpacity
              onPress={() => handleArmorChange(currentArmor[7].limb)}
              style={style.item}>
              <ItemContainer
                name={currentArmor[7].name}
                img={currentArmor[7].img}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleArmorChange(currentArmor[8].limb)}
              style={style.item}>
              <ItemContainer
                name={currentArmor[8].name}
                img={currentArmor[8].img}
              />
            </TouchableOpacity>
          </View>

          <View style={style.body}>
            <TouchableOpacity
              onPress={() => handleArmorChange(currentArmor[9].limb)}
              style={style.item}>
              <ItemContainer
                name={currentArmor[9].name}
                img={currentArmor[9].img}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleArmorChange(defaultArmor[10].limb)}
              style={style.item}>
              <ItemContainer
                name={currentArmor[10].name}
                img={currentArmor[10].img}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </WoodBG>
  );
}

const style = StyleSheet.create({
  header: {
    marginBottom: 30,
  },
  body: {
    display: 'flex',
    flexDirection: 'row',
  },
  item: {
    width: windowWidth >= breakPoints.xs ? 90 : 65,
    height: windowWidth >= breakPoints.xs ? 90 : 65,
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: 10,
    marginBottom: 10,
  },
  headItem: {
    width: windowWidth >= breakPoints.xs ? 90 : 65,
    height: windowWidth >= breakPoints.xs ? 90 : 65,
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '7%',
    marginBottom: 10,
  },
  itemsListImageBackground: {
    minHeight: 65,
    borderRadius: 100,
  },
  itemsListContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginLeft: '7.5%',
  },
  itemList: {
    height: 100,
    width: 100,
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '10%',
  },
  modalText: {
    color: '#ffffff',
    margin: 10,
    alignItems: 'center',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'mr_ReaverockG',
  },
  modalButtons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: 'auto',
    margin: 10,
  },
  healthRow: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  hitText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 40,
    height: 60,
    fontFamily: 'mr_ReaverockG',
  },
  descTextModal: {
    alignItems: 'center',
    marginBottom: '10%',
  },
  listText: {
    fontSize: 23,
    color: '#000000',
    fontFamily: 'mr_ReaverockG',
    marginTop: 3,
  },
  askButtonText: {
    fontSize: 23,
    color: '#ffffff',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 15,
    fontFamily: 'mr_ReaverockG',
  },
  closeText: {
    fontSize: 17,
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'mr_ReaverockG',
  },
  toastText: {
    fontSize: 15,
    textAlign: 'center',
  },
});
