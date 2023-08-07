/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Dimensions,
  ImageBackground,
  Text,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Modal,
} from 'react-native';

import branch from '../../../assets/build_scheme/icons/branch.png';
import ropeHole from '../../../assets/build_scheme/icons/ropeHole.png';
import nail from '../../../assets/build_icons/nail.png';
import closeButton from '../../../assets/hit_icons/closeButton.png';

import { defaultItems, defaultPrice } from '../defaults';
import WoodBG from '../../../utils/woodBG';
import { resolvePath } from '../../../utils/resolve-path';
import { Item } from '../type';
import PaperBG from '../../../utils/paperBG';

const windowWidth = Dimensions.get('window').width;

export default function MySchemes(props: any): JSX.Element {
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
  const [currentName, setCurrentName] = React.useState<string>('');

  const { globalPrice } = props.route.params.params;

  const renderNail = React.useMemo(
    () => (
      <Image
        source={{
          uri: resolvePath(nail),
          width: 3,
          height: 10,
        }}
        style={style.nail}
      />
    ),
    [],
  );

  const renderItemLabel = React.useCallback(
    (label: string) => {
      const shredLabel = label.split('*');
      return (
        <View style={{ flexDirection: 'row' }}>
          <Text style={style.textList}>{shredLabel[0]}</Text>

          {renderNail}

          <Text style={style.textList}>{shredLabel[1]}</Text>

          {renderNail}

          <Text style={style.textList}>{shredLabel[2]}</Text>
        </View>
      );
    },
    [renderNail],
  );

  const handleCloseModal = React.useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const handleSchemeChange = React.useCallback((name: string) => {
    setCurrentName(name);
    setIsModalVisible(true);
  }, []);

  const renderModal = React.useMemo(() => {
    const currentItem = defaultItems.find(p => p.name === currentName);

    if (currentItem) {
      return (
        <Modal visible={isModalVisible} animationType="slide" transparent>
          <PaperBG>
            <View>
              <Text>{currentName}</Text>

              <Image
                source={{
                  uri: resolvePath(currentItem.img),
                  width: windowWidth,
                  height: 200,
                }}
              />

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
            </View>
          </PaperBG>
        </Modal>
      );
    }

    return null;
  }, [currentName, handleCloseModal, isModalVisible]);

  const renderList = React.useMemo(() => {
    function calculateItemPrice(woods: Item[]) {
      const correctWoodsPrice = woods.map(p => {
        const correctPrices = defaultPrice.map(p => {
          return {
            ...p,
            price: globalPrice / p.countInCube,
          };
        });

        return {
          ...p,
          price:
            correctPrices.filter(pp => pp.item === p.label)[0].price * p.count,
        };
      });

      const calcGlobalWoodsPrice = correctWoodsPrice.map(p => p.price);
      return calcGlobalWoodsPrice.reduce((akk, p) => akk + p);
    }

    const currentItems = defaultItems.map(p => {
      return {
        ...p,
        price: calculateItemPrice(p.wood).toFixed(2) || '-',
      };
    });

    return currentItems.map(p => {
      return (
        <TouchableOpacity onPress={() => handleSchemeChange(p.name)}>
          <ImageBackground
            source={{ uri: resolvePath(branch) }}
            key={p.name}
            resizeMode="stretch"
            imageStyle={{ height: 50 }}
            style={{
              flexDirection: 'row',
              height: 50,
              width: windowWidth,
              marginBottom: 3,
            }}>
            <Text style={[style.textList, { width: '30%' }]}>{p.name}</Text>

            <Image
              source={{
                uri: resolvePath(ropeHole),
                height: 35,
                width: 5,
              }}
              style={{ marginTop: 7 }}
            />

            <Text style={[style.textList, { width: '40%' }]}>
              {renderItemLabel(p.size)}
            </Text>

            <Image
              source={{
                uri: resolvePath(ropeHole),
                height: 35,
                width: 5,
              }}
              style={{ marginTop: 7 }}
            />

            <Text style={[style.textList, { width: '30%' }]}>{p.price}</Text>
          </ImageBackground>
        </TouchableOpacity>
      );
    });
  }, [globalPrice, handleSchemeChange, renderItemLabel]);

  return (
    <WoodBG>
      <View>
        {isModalVisible && renderModal}
        {renderList}
      </View>
    </WoodBG>
  );
}

const style = StyleSheet.create({
  textList: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#ffffff',
  },
  nail: {
    marginTop: 5,
    height: 8,
    width: 10,
    marginLeft: 2,
    marginRight: 2,
  },
  closeText: {
    fontSize: 17,
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'mr_ReaverockG',
  },
});
