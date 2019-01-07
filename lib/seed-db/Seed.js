import fs from 'fs';
import mongoose from 'mongoose'
import { random } from './funcs'
class Seed {
  constructor (model, opts) {
    this.model = model
    this.opts = opts;
    this.name = model.collection.collectionName;
    this.schema = this.createSeedSchema(model);
    this.opts = opts;
  }

  checkIgnored(field) {
    if (this.opts.ignore.includes(field)) {
      return true;
    }
    return false;
  }

  checkForced(field) {
    let res = false;
    if (this.opts.force.hasOwnProperty(field)) {
      res = this.opts.force[field];
    }
    return res;
  }


  handleString(fieldName) {
    const fakedField = this.dataFaker.fake(fieldName);
    return fakedField;
  }

  applyFilters() { }

  createSeedSchema(model) {
    const res = {}; /* Final return element */
    const generateSchemaObj = (path, name, schema, context) => {
      /* Generate definition for a single path */
      const result = {
        type: path.instance,
        required: !!path.isRequired,
        validators: path.validators,
        default: path.defaultValue,
        isEnum: Array.isArray(path.enumValues) && path.enumValues.length,
        enum: path.enumValues,
        isPathDef: true,
        lowercase: !!path.options.lowercase,
        uppercase: !!path.options.uppercase,
        trim: !!path.options.trim,
      };

      // get validators
      if (Array.isArray(path.validators)) {
        path.validators.forEach((val) => {
          if (val.type === 'max') {
            result.max = val.max;
          }
          if (val.type === 'min') {
            result.min = val.min;
          }
        });
      }

      /* Recurse the function for array element definitions */
      if (path.instance.toLowerCase() === 'array') {
        result.isArray = true;
        if (!path.schema) {
          result.arrayDefinition = generateSchemaObj(path.caster);
        } else {
          result.arrayDefinition = getPaths(path.schema);
        }
      }
      if (path.instance.toLowerCase() === 'objectid' && path.options.ref) {
        /* Add referenced object */
        result.ref = path.options.ref;
      }
      return result;
    };

    const _fillObject = function (name, schema, context) {
      /* Extract definition object from schema and path name */
      const path = schema.path(name);

      if (path) {
        context[name] = generateSchemaObj(path, name, schema, context);

        return context;
      }
    };

    /* Loop over paths and extract definitions */
    if (model.schema) {
      model.schema.eachPath((path) => {
        _fillObject(path, model.schema, res);
      });
    } else {
      model.eachPath((path) => {
        _fillObject(path, model, res);
      });
    }
    return res;
  }

  fill(dataFaker) {
    const gen = {};
    Object.keys(this.schema).forEach((fieldName) => {
      const fieldProps = this.schema[fieldName];
      const type = fieldProps.type.toLowerCase();
      const isEnum = fieldProps.isEnum;
      const Enum = fieldProps.enum
      const isIgnored = this.checkIgnored(fieldName);
      const forcedField = this.checkForced(fieldName);
      // skip if ignored
      if (isIgnored) {
        return false;
      } if (forcedField) {
        return gen[fieldName] = forcedField;
      }

      if (fieldProps.isArray) {
        const temp = [];
        for (let i = 0; i < this.opts.count; i++) {
          temp.push(dataFaker.fake(fieldName, fieldProps));
        }
        gen[fieldName] = temp;
        return temp;
      }

      if (fieldName === '_id') {
        gen[fieldName] = dataFaker.pools[fieldName]
      }

      // if (type == "objectid") {
      //   gen[fieldName] = mongoose.Types.ObjectId().toString();
      // }

      if (isEnum) {
        //gen[fieldName] = random.index(Enum);
      }


      // if forced returned value set this to field. if not, fake it.
      if (type === 'string' || type === "number") {
        gen[fieldName] = forcedField || dataFaker.fake(fieldName, fieldProps);
      }

      if (type === 'boolean') {
        gen[fieldName] = random.boolean();
      }

      if (isEnum) {
        gen[fieldName] = random.index(Enum)
      }


      return gen[fieldName];
    });
    return gen;
  }

  saveSchemaFile() {
    if (this.schema) {
      const data = JSON.stringify(this.schema, null, 4);
      const filePath = `${__dirname}/seeds/${this.name}.json`;

    } else console.error('Cannot write schema. Schema not found');
  }
}
export default Seed;
