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

  createOptsConfig(opts) {
    const res = {};
    const { ignore = [], force = {} } = opts;
    const { ignore: gIgnore = [], force: gForce = {} } = this.globalOpts;
    res.force = Object.assign(gForce, force);
    res.ignore = [...gIgnore, ...ignore];
    return res;
  }

  createSeedSchema() {
    const newSeeds = [];
    this.models.forEach(modelConfig => {
      const [model, opts = {}] = modelConfig;
      const seedOpts = this.createOptsConfig(opts);
      const seed = new Seed(model, seedOpts);
      newSeeds.push(seed);
    });
    this.seeds = [...this.seeds, ...newSeeds];
    return newSeeds;
  }

  checkIgnored() {}

  checkForced() {}

  checkCustom() {}

  buildField(fieldName, fieldProps, pools) {}

  applyFilters() {}

  fillSeeds(seeds, pools) {
    const gen = {};
    seeds.forEach(seed => {
      Object.keys(seed.schema).forEach(fieldName => {
        const fieldProps = seed.schema[fieldName];
        gen[fieldName] = this.checkIgnored() || this.checkForced() || this.checkCustom();
        gen[fieldName] = this.buildField(fieldName, fieldProps, pools);
        this.applyFilters();
      });
    });
  }

  seed() {
    const seeds = this.createSeedSchema();
    const pools = this.createIdPools(seeds);
    this.fillSeeds(seeds, pools);
  }
}

export default Seeder;
