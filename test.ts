import { parse } from './index';

try {
  console.dir(parse('M10 20 L20 20 h10 Z'));
} catch (e) {
  console.dir(e);
}
