import flagVn from '../../assets/icon/flag-vn.svg';
import flagEng from '../../assets/icon/flag-eng.svg';

export enum LangType {
  en = 'en',
  vn = 'vn',
}

const ArrayFlag = [
  {
    name: 'English',
    icon: flagEng,
    type: LangType.en,
    value: 'en',
  },
  {
    name: 'Vietnam',
    icon: flagVn,
    type: LangType.vn,
    value: 'vi',
  },
];

export { ArrayFlag };
