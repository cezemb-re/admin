import { DateTime } from 'luxon';
import { Model, Image } from '@cezembre/fronts';
import Paragraph from './paragraphs/model';

export default interface Article extends Model {
  publication?: DateTime;
  is_published?: boolean;
  type?: string;
  author?: string;
  title?: string;
  slug?: string;
  refs?: string[];
  tags?: string[];
  description?: string;
  keywords?: string[];
  language?: string;
  position?: number;
  illustration?: Image;
  paragraphs?: Paragraph[];
  locale?: string;
}
