import { cli } from '@carnesen/cli';
import { root } from './root';

if (module === require.main) {
  cli(root)();
}
