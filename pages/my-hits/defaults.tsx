import leather from '../../assets/armor-material/leather.jpg';
import chainmail from '../../assets/armor-material/chainmail.jpg';
import lamelar from '../../assets/armor-material/lamelar.jpg';
import briga from '../../assets/armor-material/briga.jpg';
import none from '../../assets/armor-material/none.jpg';
import steel from '../../assets/armor-material/steel.jpg';

import { resolvePath } from '../../utils/resolve-path';
import { Armor, ArmorItem } from './type';

export const armor: ArmorItem[] = [
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

export const defaultArmor: Armor[] = [
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
