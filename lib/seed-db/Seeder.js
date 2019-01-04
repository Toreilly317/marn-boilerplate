import Seedling from "./Seedling"
import fs from "fs"
import mongoose from "mongoose"
import faker from "faker"
import connectToDB from "../connectToDB"
import _ from "lodash"

class DataFaker {
  constructor (seedling) {
    this.opts = {
      address: [
        "zipCode",
        "city",
        "cityPrefix",
        "citySuffix",
        "streetName",
        "streetAddress",
        "streetSuffix",
        "streetPrefix",
        "secondaryAddress",
        "county",
        "country",
        "countryCode",
        "state",
        "stateAbbr",
        "latitude",
        "longitude"
      ],
      commerce: [
        "color",
        "department",
        "productName",
        "price",
        "productAdjective",
        "productMaterial",
        "product",
      ],
      company: [
        "suffixes",
        "companyName",
        "companySuffix",
        "catchPhrase",
        "bs",
        "catchPhraseAdjective",
        "catchPhraseDescriptor",
        "catchPhraseNoun",
        "bsAdjective",
        "bsBuzz",
        "bsNoun",
      ],
      database: [

        "column",
        "type",
        "collation",
        "engine",
      ],
      date: [
        "future",
        "between",
        "recent",
        "month",
        "weekday",
      ],
      finance: [

        "account",
        "accountName",
        "mask",
        "amount",
        "transactionType",
        "currencyCode",
        "currencyName",
        "currencySymbol",
        "bitcoinAddress",
        "iban",
        "bic",
      ],
      hacker: [
        "abbreviation",
        "adjective",
        "noun",
        "verb",
        "ingverb",
        "phrase",
      ],
      image: [

        "image",
        "avatar",
        "imageUrl",
        "abstract",
        "animals",
        "business",
        "cats",
        "city",
        "food",
        "nightlife",
        "fashion",
        "people",
        "nature",
        "sports",
        "technics",
        "transport",
        "dataUri",
      ],
      internet: [
        "avatar",
        "email",
        "exampleEmail",
        "userName",
        "protocol",
        "url",
        "domainName",
        "domainSuffix",
        "domainWord",
        "ip",
        "ipv6",
        "userAgent",
        "color",
        "mac",
        "password",
      ],
      lorem: [
        "word",
        "words",
        "sentence",
        "slug",
        "sentences",
        "paragraph",
        "paragraphs",
        "text",
        "lines",
      ],
      name: [
        "firstName",
        "lastName",
        "findName",
        "jobTitle",
        "prefix",
        "suffix",
        "title",
        "jobDescriptor",
        "jobArea",
        "jobType",
      ],
      phone: [
        "phoneNumber",
        "phoneNumberFormat",
        "phoneFormats",
      ]
    }
    this.fakeSeedlingFields(seedling.fields)
  }

  fakeSeedlingFields(fields) {
    fields.forEach(field => {
      console.log(field.ref)
      switch (field.instance.toLowerCase()) {
        case ("string"): {
          this.fakeString(field)
          break;
        }
        case ("array"): {
          this.fakeArray(field)
          break;
        }
        case ("obect"): {
          this.fakeObject(field)
          break;
        }
        case ("objectid"): {
          this.fakeObjectId(field);
        }
        default: break;
      }
    })
  }

  fakeString() {
    //console.log("faking String")
  }

  fakeArray() {
    //console.log("faking Array")
  }

  fakeObject() {
    //console.log("faking Object")
  }

  fakeObjectId() {
    //console.log("faking ObjectId")
  }
}
class Seeder {
  constructor ({ models, opts }) {
    this.models = models
    this.seeds = [];
    this.pools = {}
    this.createPools = this.createPools.bind(this)
  }

  createPools(pools) {
    const res = {}
    for (const key in pools) {
      if (pools.hasOwnProperty(key)) {
        const fieldName = key
        const [poolName, min, max] = pools[key]
        const poolConfig = { fieldName, poolName, min, max }
        this.createPool(poolConfig)
      }
    }
  }

  createPool(config) {
    const res = []
    const count = _.random(config.min, config.max)

    for (let i = 0; i < count; i++) {
      //!we may not need to put id to string
      res.push(mongoose.Types.ObjectId().toString())
    }

    config.pool = res;
    console.log(config)

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
      const { pools, count, dropCollection } = opts
      this.createPools(pools)
      return

      //create pool of IDs for relational data


      //create seed for each model in the config
      let seedling = new Seedling(model, count, this.pools)


      //add new seed to seed group
      this.seeds = [...this.seeds, seedling]
      //console.log(this.seeds)
    })
  }

  seed() {
    this.build()
  }
}

export default Seeder