import faker from 'faker';
import { random } from "./funcs"

class DataFaker {
  constructor () {
    this.opts = {
      address: [
        'zipCode',
        'city',
        'cityPrefix',
        'citySuffix',
        'streetName',
        'streetAddress',
        'streetSuffix',
        'streetPrefix',
        'secondaryAddress',
        'county',
        'country',
        'countryCode',
        'state',
        'stateAbbr',
        'latitude',
        'longitude',
      ],
      commerce: ['color', 'department', 'productName', 'price', 'productAdjective', 'productMaterial', 'product'],
      company: [
        'suffixes',
        'companyName',
        'companySuffix',
        'catchPhrase',
        'bs',
        'catchPhraseAdjective',
        'catchPhraseDescriptor',
        'catchPhraseNoun',
        'bsAdjective',
        'bsBuzz',
        'bsNoun',
      ],
      database: ['column', 'type', 'collation', 'engine'],
      date: ['future', 'between', 'recent', 'month', 'weekday'],
      finance: [
        'account',
        'accountName',
        'mask',
        'amount',
        'transactionType',
        'currencyCode',
        'currencyName',
        'currencySymbol',
        'bitcoinAddress',
        'iban',
        'bic',
      ],
      hacker: ['abbreviation', 'adjective', 'noun', 'verb', 'ingverb', 'phrase'],
      image: [
        'image',
        'avatar',
        'imageUrl',
        'abstract',
        'animals',
        'business',
        'cats',
        'city',
        'food',
        'nightlife',
        'fashion',
        'people',
        'nature',
        'sports',
        'technics',
        'transport',
        'dataUri',
      ],
      internet: [
        'avatar',
        'email',
        'exampleEmail',
        'userName',
        'protocol',
        'url',
        'domainName',
        'domainSuffix',
        'domainWord',
        'ip',
        'ipv6',
        'userAgent',
        'color',
        'mac',
        'password',
      ],
      lorem: ['word', 'words', 'sentence', 'slug', 'sentences', 'paragraph', 'paragraphs', 'text', 'lines'],
      name: [
        'firstName',
        'lastName',
        'findName',
        'jobTitle',
        'prefix',
        'suffix',
        'title',
        'jobDescriptor',
        'jobArea',
        'jobType',
      ],
      phone: ['phoneNumber', 'phoneNumberFormat', 'phoneFormats'],
    };
    this.pools = {};
    this.checkCommon = this.checkCommon.bind(this);
  }

  addPools(pools) {
    this.pools = Object.assign(this.pools, pools);
  }

  checkCommon(field) {
    const fakedField = faker.name.firstName();
    return fakedField;
  }

  fake(fieldName, fieldProps) {
    const {
      type,
      required,
      isEnum,
      enum: Enum,
    } = fieldProps;

    let gen;

    Object.keys(this.opts).forEach((optKey) => {
      const optionsArr = this.opts[optKey];

      if (type.toLowerCase() === "string") {
        optionsArr.includes(fieldName) ? gen = faker[optKey][fieldName]() : false;
      }





      if (type.toLowerCase() === 'boolean') {
        Math.random() > 0.5 ? gen = false : gen = true;
      }

      if (type.toLowerCase() === "objectId") {

      }



      if (isEnum) {
        return Enum[random.index(Enum)];
      }
    });
    return gen;
  }
}


export default DataFaker;
