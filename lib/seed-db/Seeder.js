import _ from 'lodash';
import mongoose from 'mongoose';
import connectToDB from '../connectToDB';
import Faker from './Faker';

import Seed from './Seed';

class Seeder {
  constructor({ models, opts }) {
    this.models = models;
    this.count = opts.count;
    this.globalOpts = opts.global;
    this.seeds = [];
    this.pools = [];
  }

  dropCollection(model) {
    console.log(`WARNING:: Dropping all ${model.collection.name} documents from DB`);
  }

  createOptsConfig(opts) {
    const res = {};
    const { ignore = [], force = {}, count } = opts;
    const { ignore: gIgnore = [], force: gForce = {}, count: gCount } = this.globalOpts;
    res.force = Object.assign(gForce, force);
    res.ignore = [...gIgnore, ...ignore];
    let c;
    if (count) {
      c = count;
    } else {
      c = gCount;
    }

    console.log(c);
    if (c) {
      if (Array.isArray(c)) {
        console.log('is array');
        res.count = _.random(c[0], c[1]);
      } else if (Number.isInteger(c)) {
        console.log('is num');

        res.count = c;
      } else {
        console.log('defaulting');
        res.count = 25;
      }
    }

    return res;
  }

  createSeedSchema() {
    const newSeeds = [];
    this.models.forEach(modelConfig => {
      const [model, opts = {}] = modelConfig;
      // merge model and global options
      const seedOpts = this.createOptsConfig(opts);
      const seed = new Seed(model, seedOpts);
      newSeeds.push(seed);
    });
    this.seeds = [...this.seeds, ...newSeeds];
    return newSeeds;
  }

  createIdPools(seeds) {
    seeds.forEach(seed => {
      const pools = {};
      pools[seed.name] = [];
      for (let i = 0; i < this.count; i++) {
        pools[seed.name].push(mongoose.Types.ObjectId().toString());
      }
      this.pools = Object.assign(this.pools, { ...pools });
      return pools;
    });
  }

  fillSeeds(pools) {
    const gen = {};
    this.seeds.forEach(seed => {
      seed.fill(pools);
    });
  }

  seed() {
    const seeds = this.createSeedSchema();
    const pools = this.createIdPools(seeds);
    this.fillSeeds(pools);
  }
}

export default Seeder;
