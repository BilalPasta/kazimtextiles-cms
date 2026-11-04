import * as migration_20261024_201754_initial from './20261024_201754_initial';
import * as migration_20261031_221153_catalog_hidden_and_posts from './20261031_221153_catalog_hidden_and_posts';
import * as migration_20261102_192315_sourcing_catalog from './20261102_192315_sourcing_catalog';
import * as migration_20261104_071150_post_tag_and_caption from './20261104_071150_post_tag_and_caption';

export const migrations = [
  {
    up: migration_20261024_201754_initial.up,
    down: migration_20261024_201754_initial.down,
    name: '20261024_201754_initial',
  },
  {
    up: migration_20261031_221153_catalog_hidden_and_posts.up,
    down: migration_20261031_221153_catalog_hidden_and_posts.down,
    name: '20261031_221153_catalog_hidden_and_posts',
  },
  {
    up: migration_20261102_192315_sourcing_catalog.up,
    down: migration_20261102_192315_sourcing_catalog.down,
    name: '20261102_192315_sourcing_catalog',
  },
  {
    up: migration_20261104_071150_post_tag_and_caption.up,
    down: migration_20261104_071150_post_tag_and_caption.down,
    name: '20261104_071150_post_tag_and_caption'
  },
];
