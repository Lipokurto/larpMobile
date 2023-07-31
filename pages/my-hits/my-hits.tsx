/* eslint-disable react-native/no-inline-styles */
import React from 'react';

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
import leather from '../../assets/armor-material/leather.jpg';
import chainmail from '../../assets/armor-material/chainmail.jpg';
import lamelar from '../../assets/armor-material/lamelar.jpg';
import briga from '../../assets/armor-material/briga.jpg';
import steel from '../../assets/armor-material/steel.jpg';

import heart from '../../assets/health/heart.png';
import shield from '../../assets/health/shield.png';

import { myHitsStyle } from './my-hits-style';
import { ArmorItem, Armor } from './type';
import { resolvePath } from '../../utils/resolve-path';

const armor: ArmorItem[] = [
  {
    value: { type: 'no_armor', armorClass: 0 },
    label: 'Нет брони',
    img: resolvePath(none),
  },
  {
    value: { type: 'leather', armorClass: 0.5 },
    label: 'Кожанка',
    img: resolvePath(leather),
  },
  {
    value: { type: 'chain', armorClass: 0.75 },
    label: 'Кольчуга',
    img: resolvePath(chainmail),
  },
  {
    value: { type: 'brigant', armorClass: 1 },
    label: 'Бригантина',
    img: resolvePath(briga),
  },
  {
    value: { type: 'lamelar', armorClass: 1 },
    label: 'Ламяляр',
    img: resolvePath(lamelar),
  },
  {
    value: { type: 'plate', armorClass: 1.25 },
    label: 'Латы',
    img: resolvePath(steel),
  },
];

const defaultArmor: Armor[] = [
  { name: 'Голова', limb: 'head', hits: 0, img: resolvePath(none) },
  { name: 'Л. Плечо', limb: 'leftShoulder', hits: 0, img: resolvePath(none) },
  { name: 'Тело', limb: 'torso', hits: 0, img: resolvePath(none) },
  { name: 'П. Плечо', limb: 'rightShoulder', hits: 0, img: resolvePath(none) },
  { name: 'Л. Рука', limb: 'leftArm', hits: 0, img: resolvePath(none) },
  { name: 'Спина', limb: 'back', hits: 0, img: resolvePath(none) },
  { name: 'П. Рука', limb: 'rightArm', hits: 0, img: resolvePath(none) },
  { name: 'Л. Бедро', limb: 'leftHip', hits: 0, img: resolvePath(none) },
  { name: 'П. Бедро', limb: 'rightHip', hits: 0, img: resolvePath(none) },
  { name: 'Л. Нога', limb: 'leftLeg', hits: 0, img: resolvePath(none) },
  { name: 'П. Нога', limb: 'rightLeg', hits: 0, img: resolvePath(none) },
];

export default function MyHits(): JSX.Element {
  const [isVisibleModal, setIsVisibleModal] = React.useState<boolean>(false);

  const [currentArmor, setCurrentArmor] = React.useState<Armor[]>(defaultArmor);
  const [hits, setHits] = React.useState<number>(1);
  const [currentLimb, setCurrentLimb] = React.useState<string>('');
  const [hasHelmet, setHasHelmet] = React.useState<boolean>(false);
  const [hasBack, setHasBack] = React.useState<boolean>(false);

  React.useEffect(() => {
    const totalHits = currentArmor.reduce((acc, p) => acc + p.hits, 1);
    setHits(hasHelmet ? totalHits : 1);
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
                style={{ width: 20, height: 20 }}
              />
            );
          })
        ) : (
          <Image
            source={{ uri: shields[0] }}
            style={{ width: 20, height: 20 }}
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
    <View style={myHitsStyle.container}>
      {isVisibleModal && renderModal}

      <Text>{hits}</Text>
      {renderHealth}

      <TouchableOpacity
        onPress={() => handleArmorChange(currentArmor[0].limb)}
        style={style.item}>
        <ImageBackground
          source={{ uri: resolvePath(hasHelmet ? steel : none) }}
          resizeMode="stretch"
          imageStyle={style.itemImageBackground}>
          <Text style={style.text}>{currentArmor[0].name}</Text>
        </ImageBackground>
      </TouchableOpacity>

      <View style={style.body}>
        <TouchableOpacity
          onPress={() => handleArmorChange(currentArmor[1].limb)}
          style={style.item}>
          <ImageBackground
            source={{ uri: currentArmor[1].img }}
            resizeMode="stretch"
            imageStyle={style.itemImageBackground}>
            <Text style={style.text}>{currentArmor[1].name}</Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleArmorChange(currentArmor[2].limb)}
          style={style.item}>
          <ImageBackground
            source={{ uri: currentArmor[2].img }}
            resizeMode="stretch"
            imageStyle={style.itemImageBackground}>
            <Text style={style.text}>{currentArmor[2].name}</Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleArmorChange(currentArmor[3].limb)}
          style={style.item}>
          <ImageBackground
            source={{ uri: currentArmor[3].img }}
            resizeMode="stretch"
            imageStyle={style.itemImageBackground}>
            <Text style={style.text}>{currentArmor[3].name}</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>

      <View style={style.body}>
        <TouchableOpacity
          onPress={() => handleArmorChange(currentArmor[4].limb)}
          style={style.item}>
          <ImageBackground
            source={{ uri: currentArmor[4].img }}
            resizeMode="stretch"
            imageStyle={style.itemImageBackground}>
            <Text style={style.text}>{currentArmor[4].name}</Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleArmorChange(currentArmor[5].limb)}
          style={style.item}>
          <ImageBackground
            source={{ uri: hasBack ? currentArmor[2].img : resolvePath(none) }}
            resizeMode="stretch"
            imageStyle={style.itemImageBackground}>
            <Text style={style.text}>{currentArmor[5].name}</Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleArmorChange(currentArmor[6].limb)}
          style={style.item}>
          <ImageBackground
            source={{ uri: currentArmor[6].img }}
            resizeMode="stretch"
            imageStyle={style.itemImageBackground}>
            <Text style={style.text}>{currentArmor[6].name}</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>

      <View style={style.body}>
        <TouchableOpacity
          onPress={() => handleArmorChange(currentArmor[7].limb)}
          style={style.item}>
          <ImageBackground
            source={{ uri: currentArmor[7].img }}
            resizeMode="stretch"
            imageStyle={style.itemImageBackground}>
            <Text style={style.text}>{currentArmor[7].name}</Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleArmorChange(currentArmor[8].limb)}
          style={style.item}>
          <ImageBackground
            source={{ uri: currentArmor[8].img }}
            resizeMode="stretch"
            imageStyle={style.itemImageBackground}>
            <Text style={style.text}>{currentArmor[8].name}</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>

      <View style={style.body}>
        <TouchableOpacity
          onPress={() => handleArmorChange(currentArmor[9].limb)}
          style={style.item}>
          <ImageBackground
            source={{ uri: currentArmor[9].img }}
            resizeMode="stretch"
            imageStyle={style.itemImageBackground}>
            <Text style={style.text}>{currentArmor[9].name}</Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleArmorChange(defaultArmor[10].limb)}
          style={style.item}>
          <ImageBackground
            source={{ uri: currentArmor[10].img }}
            resizeMode="stretch"
            imageStyle={style.itemImageBackground}>
            <Text style={style.text}>{currentArmor[10].name}</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>

      <Button title="Сброс" onPress={() => handleReset()} />
    </View>
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
    width: 80,
    height: 50,
    margin: 5,
  },
  itemImageBackground: {
    flex: 1,
    minWidth: 80,
    minHeight: 55,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
  },
  itemsListImageBackground: {
    minHeight: 65,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
  },
  text: {
    flex: 0,
    fontSize: 13,
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: '500',
    backgroundColor: 'black',
    color: 'white',
    width: 80,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
