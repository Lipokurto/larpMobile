export type Armor = {
  name: string;
  limb: string;
  hits: number;
  img: string;
};

export type ArmorItem = {
  value: {
    type: string;
    armorClass: number;
  };
  label: string;
  img: string;
};

export type HandleArmor = {
  name: string;
  option: ArmorItem;
};
