import faker from 'faker';

class Faker {
  constructor(seedling) {
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
    this.fakeSeedlingFields(seedling.fields);
  }

  fakeSeedlingFields(fields) {
    fields.forEach(field => {
      console.log(field.ref);
      switch (field.instance.toLowerCase()) {
        case 'string': {
          this.fakeString(field);
          break;
        }
        case 'array': {
          this.fakeArray(field);
          break;
        }
        case 'obect': {
          this.fakeObject(field);
          break;
        }
        case 'objectid': {
          this.fakeObjectId(field);
          break;
        }
        default:
          break;
      }
    });
  }

  fakeString() {
    // console.log("faking String")
  }

  fakeArray() {
    // console.log("faking Array")
  }

  fakeObject() {
    // console.log("faking Object")
  }

  fakeObjectId() {
    // console.log("faking ObjectId")
  }
}

export default Faker ;
