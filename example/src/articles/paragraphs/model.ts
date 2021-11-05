import { Model } from '@cezembre/fronts';
import { RawDraftContentState } from 'draft-js';
import Type from './types';
import Size from './sizes';

export default interface Paragraph extends Model {
  article?: string;
  type?: Type;
  size?: Size;
  style?: string;
  content?: string | RawDraftContentState;
  position?: number;
}
