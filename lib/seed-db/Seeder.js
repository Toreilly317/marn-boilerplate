import Seedling from "./Seedling"
import fs from "fs"
import mongoose from "mongoose"
class Seeder {
  constructor (models) {
    this.models = models

    this.seeds = [];
    this.pools = {}
    this.createPool = this.createPool.bind(this)
  }

  createPool(name, count) {
    let pool = { name: name, ids: [] }
    for (let i = 0; i < count; i++) {
      pool.ids.push(mongoose.Types.ObjectId().toString())
    }
    this.pools = Object.assign(this.pools, pool)
  }

  writeSeedFile(filePath, seed) {
    const data = JSON.stringify(seed, null, 4);
    fs.writeFile(filePath, data, (err) => {
      if (err) {
        console.log(err)
      }
      console.log(`Seed saved to ${filePath}`)
    });
  }



  build() {
    this.models.forEach(config => {
      const [model, opts] = config
      const { count = 10 } = opts
      this.createPool(model.collection.name, count)
      let seedling = new Seedling(model, count, this.pools)
      this.seeds = [...this.seeds, seedling]

    })
  }



}


export default Seeder