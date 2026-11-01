import * as migration_20261024_201754_initial from './20261024_201754_initial';
import * as migration_20261031_221153_catalog_hidden_and_posts from './20261031_221153_catalog_hidden_and_posts';

export const migrations = [
  {
    up: migration_20261024_201754_initial.up,
    down: migration_20261024_201754_initial.down,
    name: '20261024_201754_initial',
  },
  {
    up: migration_20261031_221153_catalog_hidden_and_posts.up,
    down: migration_20261031_221153_catalog_hidden_and_posts.down,
    name: '20261031_221153_catalog_hidden_and_posts'
  },
];
