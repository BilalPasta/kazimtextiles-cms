import * as migration_20261024_201754_initial from './20261024_201754_initial';

export const migrations = [
  {
    up: migration_20261024_201754_initial.up,
    down: migration_20261024_201754_initial.down,
    name: '20261024_201754_initial'
  },
];
