import _ from 'lodash';
import mongoose from 'mongoose';
import connectToDB from '../connectToDB';
import Faker from './DataFaker';
import { random } from "./funcs"
import Seed from './Seed';
import { writeObjToFile } from "./funcs"
class Seeder {
  constructor ({ models, opts }) {
    this.models = models;
    this.count = opts.count;
    this.globalOpts = opts.global;
    this.seeds = [];
    this.dataFaker = new Faker();
    this.pools = {}
    this.temp = {}
    this.tree = {}
  }

  dropCollection(model) {
    console.log(`WARNING:: Dropping all ${model.collection.name} documents from DB`);
  }

  getCount(count, gCount) {
    let c;
    let res = 25;

    if (count) {
      c = count;
    } else {
      c = gCount;
    }

    if (c) {
      if (Array.isArray(c)) {
        res = random.number(c[0], c[1]);
      } else if (Number.isInteger(c)) {
        res = c;
      } else {
        res = 25;
      }
    }
    return res;
  }

  createOptsConfig(opts) {
    const res = {};
    const { ignore = [], force = {}, count } = opts;
    const { ignore: gIgnore = [], force: gForce = {}, count: gCount } = this.globalOpts;
    res.force = Object.assign(gForce, force);
    res.ignore = [...gIgnore, ...ignore];
    res.count = this.getCount(count, gCount);
    return res;
  }

  getRefs(seed) {
    let refs = {}
    const seedFields = Object.keys(seed.schema)

    seedFields.forEach(field => {
      const fieldProps = seed.schema[field]
      let modelRef;
      let message;
      let isArray = false;
      let temp = {}
      if (fieldProps.ref) {
        modelRef = fieldProps.ref
        message = console.log(`SEEDNAME:${seed.name} uses MODELREF: ${modelRef} Id for FIELD${field} `)
      }

      if (fieldProps.arrayDefinition) {
        modelRef = fieldProps.arrayDefinition.ref.toLowerCase()
        isArray = true;

        console.log(`SEEDNAME:${seed.name} uses array of MODELREF:${modelRef} Ids for FIELD:${field} `)
      }

      modelRef && message
      const newIds = (limit) => new Array(limit).fill(mongoose.Types.ObjectId().toString())
      if (isArray) {
        const limit = this.tree[seed.name].opts.count
        const idBatch = newIds(limit)
        temp[seed.name] = {}
        temp[seed.name]._id = [newIds(1)]
        temp[seed.name][field] = [...idBatch]
      }

      temp[seed.name]._id = newIds(1)

      refs = Object.assign(refs, temp)
    });

    writeObjToFile("temp", refs)
  }

  createSeedSchema() {
    const newSeeds = [];
    const seedObj = {}
    this.models.forEach((modelConfig) => {
      const [model, opts = {}] = modelConfig;
      // merge model and global options
      const seedOpts = this.createOptsConfig(opts);
      const seed = new Seed(model, seedOpts);
      const modelName = model.collection.collectionName
      //this.getRefs(seed)
      newSeeds.push(seed);
      seedObj[modelName] = seed
    });
    this.tree = Object.assign(this.tree, seedObj)

    this.seeds = [...this.seeds, ...newSeeds];
    return newSeeds;
  }

  // create an ID pool for each model to be used for relations between model and ref fields
  createIdPools(seeds) {
    seeds.forEach((seed) => {
      const pools = {};
      pools[seed.name] = [];
      for (let i = 0; i < seed.opts.count; i++) {
        pools[seed.name].push(mongoose.Types.ObjectId().toString());
      }
      this.pools = Object.assign(this.pools, pools)
      return pools;
    });
  }

  // fake the schema
  fillSeeds(dataFaker) {
    const gen = {};
    this.seeds.forEach((seed) => {
      // create X amount of seeds based on config
      const limit = seed.opts.count;
      for (let i = 0; i < limit; i++) {
        this.getRefs(seed);
        seed.fill(dataFaker);
        //seed.postFill()
      }
    });
  }

  seed() {
    const seeds = this.createSeedSchema();
    const pools = this.createIdPools(seeds);
    this.dataFaker.addPools(pools);
    this.fillSeeds(this.dataFaker);
  }
}

export default Seeder;
