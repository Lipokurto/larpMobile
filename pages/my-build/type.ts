import { ImageSourcePropType } from 'react-native';

export type ItemPrice = {
  item: string;
  price: number;
  countInCube: number;
};

export type Item = {
  label: string;
  count: number;
};

export type WoodItem = {
  name: string;
  size: string;
  price: string;
  img: ImageSourcePropType;
  wood: Item[];
  saw: Item[];
  rest?: Item[];
};
