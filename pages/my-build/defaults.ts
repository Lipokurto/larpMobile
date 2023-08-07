import bench from '../../assets/build_scheme/bench_typ_a.png';
import table from '../../assets/build_scheme/table_type_b.png';

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
    img: table,
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
];
