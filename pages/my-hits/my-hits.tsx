/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Dimensions } from 'react-native';

import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Button,
  ImageBackground,
  Image,
} from 'react-native';

import none from '../../assets/armor-material/none.jpg';
import steel from '../../assets/armor-material/steel.jpg';

import heart from '../../assets/health/heart.png';
import shield from '../../assets/health/shield.png';
import scroll from '../../assets/main-menu-icons/scroll.png';
import flag from '../../assets/hit_icons/flag.png';
import flagY from '../../assets/hit_icons/flagY.png';
import clearIcon from '../../assets/hit_icons/clearIcon.png';

import { ArmorItem, Armor } from './type';
import { resolvePath } from '../../utils/resolve-path';
import WoodBG from '../../utils/woodBG';
import ItemContainer from './item-container';

import { myHitsStyle } from './my-hits-style';
import { armor, defaultArmor } from './defaults';
import { breakPoints } from '../../utils/break-points';

const windowWidth = Dimensions.get('window').width;

export default function MyHits(): JSX.Element {
  const [isVisibleModal, setIsVisibleModal] = React.useState<boolean>(false);

  const [currentArmor, setCurrentArmor] = React.useState<Armor[]>(defaultArmor);
  const [hits, setHits] = React.useState<number>(1);
  const [currentLimb, setCurrentLimb] = React.useState<string>('');
  const [hasHelmet, setHasHelmet] = React.useState<boolean>(false);
  const [hasBack, setHasBack] = React.useState<boolean>(false);

  React.useEffect(() => {
    const totalHits = currentArmor.reduce((acc, p) => acc + p.hits, 1);
    setHits(hasHelmet ? Math.round(totalHits) : 1);
  }, [hits, currentArmor, hasHelmet, hasBack]);

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
    [currentArmor],
  );

  const modalInternals = React.useMemo(() => {
    if (currentLimb === 'head') {
      return (
        <View style={{ backgroundColor: 'wheat' }}>
          <Text style={style.modalText}>Вы хотите одеть шлем?</Text>

          <View style={style.modalButtons}>
            <Button
              onPress={() => helmBackChange(currentLimb, true)}
              title="Да!"
            />

            <Button
              onPress={() => helmBackChange(currentLimb, false)}
              title="Нет"
            />
          </View>
        </View>
      );
    }

    if (currentLimb === 'back') {
      return (
        <View style={{ backgroundColor: 'wheat' }}>
          <Text style={style.modalText}>
            У вашего доспеха есть броня на спине?
          </Text>

          <View style={style.modalButtons}>
            <Button
              onPress={() => helmBackChange(currentLimb, true)}
              title="Да"
            />

            <Button
              onPress={() => helmBackChange(currentLimb, false)}
              title="Нет"
            />
          </View>
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
                <ImageBackground
                  source={{ uri: p.img }}
                  resizeMode="stretch"
                  imageStyle={style.itemsListImageBackground}>
                  <Text style={style.listItemText}>{p.label}</Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    );
  }, [currentLimb, helmBackChange, handleSetArmor]);

  const renderModal = React.useMemo(() => {
    return (
      <Modal visible={isVisibleModal} animationType="slide" transparent>
        {modalInternals}

        <Button
          onPress={() => setIsVisibleModal(!isVisibleModal)}
          title="Закрыть"
        />
      </Modal>
    );
  }, [isVisibleModal, modalInternals]);

  return (
    <WoodBG>
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
          style={style.item}>
          <ItemContainer
            name={currentArmor[0].name}
            img={resolvePath(hasHelmet ? steel : none)}
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
  itemsListImageBackground: {
    minHeight: 65,
    borderRadius: 100,
  },
  itemsListContainer: {
    backgroundColor: 'wheat',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  itemList: {
    height: 60,
    margin: 10,
    elevation: 5,
  },
  listItemText: {
    backgroundColor: 'black',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 0,
    color: 'white',
    width: 120,
    height: 30,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  modalText: {
    margin: 10,
    alignItems: 'center',
    fontSize: 20,
    textAlign: 'center',
    elevation: 25,
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
    color: 'white',
    textAlign: 'center',
    fontSize: 40,
    height: 60,
    fontFamily: 'mr_ReaverockG',
  },
});
