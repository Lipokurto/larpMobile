import bench from '../../assets/build_scheme/bench_typ_a.png';
import tableA from '../../assets/build_scheme/table_type_b.png';
import tableB from '../../assets/build_scheme/table_type_c.png';
import torch from '../../assets/build_scheme/torch_type_a.png';
import dosp from '../../assets/build_scheme/dosp_type_c.png';
import straite from '../../assets/build_scheme/straite_type_b.png';
import skaf from '../../assets/build_scheme/skaf.png';

import { ItemPrice, WoodItem } from './type';

export const defaultPrice: ItemPrice[] = [
  { item: '50*50*6000', price: 0, countInCube: 66 },
  { item: '50*50*3000', price: 0, countInCube: 132 },
  { item: '25*100*6000', price: 0, countInCube: 66 },
  { item: '25*150*6000', price: 0, countInCube: 44 },
  { item: '50*100*6000', price: 0, countInCube: 33 },
  { item: '100*100*6000', price: 0, countInCube: 16 },
];

export const defaultItems: WoodItem[] = [
  {
    name: 'Скамейка',
    size: '1500*200*500',
    price: '-',
    img: bench,
    wood: [
      { label: '25*100*6000', count: 1 },
      { label: '50*50*6000', count: 1 },
    ],
    saw: [
      { label: '25*100*1500', count: 2 },
      { label: '25*100*300', count: 3 },
      { label: '25*100*500', count: 4 },
      { label: '50*50*200', count: 2 },
      { label: '50*50*500', count: 2 },
    ],
    rest: [
      { label: '25*100*100', count: 1 },
      { label: '50*50*4600', count: 1 },
    ],
  },
  {
    name: 'Стол',
    size: '2000*600*750',
    price: '-',
    img: tableA,
    wood: [
      { label: '25*150*6000', count: 2 },
      { label: '25*100*6000', count: 1 },
      { label: '50*50*6000', count: 1 },
    ],
    saw: [
      { label: '25*150*2000', count: 4 },
      { label: '25*100*750', count: 4 },
      { label: '25*100*500', count: 3 },
      { label: '50*50*750', count: 2 },
      { label: '50*50*500', count: 2 },
    ],
    rest: [
      { label: '25*150*4000', count: 1 },
      { label: '25*100*1500', count: 1 },
      { label: '50*50*3500', count: 1 },
    ],
  },
  {
    name: 'Стол',
    size: '1500*600*750',
    price: '-',
    img: tableB,
    wood: [
      { label: '25*150*6000', count: 1 },
      { label: '25*100*6000', count: 1 },
      { label: '50*50*6000', count: 1 },
    ],
    saw: [
      { label: '25*150*1500', count: 4 },
      { label: '25*100*750', count: 4 },
      { label: '25*100*500', count: 3 },
      { label: '50*50*750', count: 2 },
      { label: '50*50*500', count: 2 },
    ],
    rest: [
      { label: '25*100*1500', count: 1 },
      { label: '50*50*3500', count: 1 },
    ],
  },
  {
    name: 'Полки',
    size: '750*300*1500',
    price: '-',
    img: skaf,
    wood: [
      { label: '25*150*6000', count: 2 },
      { label: '50*50*6000', count: 1 },
    ],
    saw: [
      { label: '25*150*1500', count: 4 },
      { label: '25*150*750', count: 8 },
      { label: '50*50*300', count: 10 },
    ],
    rest: [{ label: '50*50*3000', count: 1 }],
  },
  {
    name: 'Костровище',
    size: '2000*2000*450',
    price: '-',
    img: torch,
    wood: [
      { label: '25*150*6000', count: 4 },
      { label: '50*50*6000', count: 1 },
    ],
    saw: [
      { label: '25*150*2000', count: 12 },
      { label: '50*50*500', count: 4 },
    ],
    rest: [{ label: '50*50*4000', count: 1 }],
  },
  {
    name: 'Стойка для доспеха',
    size: '2000*1000*1000',
    price: '-',
    img: dosp,
    wood: [
      { label: '25*100*6000', count: 1 },
      { label: '50*50*6000', count: 1 },
    ],
    saw: [
      { label: '25*100*1000', count: 5 },
      { label: '25*100*500', count: 2 },
      { label: '50*50*1000', count: 2 },
      { label: '50*50*500', count: 2 },
      { label: '50*50*2000', count: 1 },
    ],
  },
  {
    name: 'Стойка для оружия',
    size: '2000*2000*1000',
    price: '-',
    img: straite,
    wood: [
      { label: '25*100*6000', count: 3 },
      { label: '50*50*6000', count: 1 },
    ],
    saw: [
      { label: '25*100*2000', count: 7 },
      { label: '25*100*1000', count: 4 },
    ],
  },
];
