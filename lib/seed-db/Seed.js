import fs from 'fs';
import faker from 'faker';

class Seed {
  constructor(model, opts) {
    this.opts = opts;
    this.model = model;
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

  handleString() {}

  handleArray() {}

  handleEnum() {}

  handleObjectId() {}

  buildField(fieldName, pools) {
    const fieldProps = this.schema[fieldName];
    switch (fieldProps.type.toLowerCase()) {
      case 'string':
        this.handleString();
        break;
      case 'array':
        this.handleArray();
        break;
      case ' objectid':
        this.handleObjectId(pools);
        break;
    }
  }

  applyFilters() {}

  createSeedSchema(model) {
    const res = {}; /* Final return element */
    const _generateReturnObj = (path, name, schema, context) => {
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
        path.validators.forEach(val => {
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
          result.arrayDefinition = _generateReturnObj(path.caster);
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

    const _fillObject = function(name, schema, context) {
      /* Extract definition object from schema and path name */
      const path = schema.path(name);

      if (path) {
        context[name] = _generateReturnObj(path, name, schema, context);

        return context;
      }
    };

    /* Loop over paths and extract definitions */
    if (model.schema) {
      model.schema.eachPath(path => {
        _fillObject(path, model.schema, res);
      });
    } else {
      model.eachPath(path => {
        _fillObject(path, model, res);
      });
    }
    return res;
  }

  fill(pools) {
    const gen = {};
    Object.keys(this.schema).forEach(fieldName => {
      const fieldProps = this.schema[fieldName];
      const isIgnored = this.checkIgnored(fieldName);
      const forcedField = this.checkForced(fieldName);

      // skip if ignored
      if (isIgnored) {
        return false;
      }

      // if forced returned value set this to field and return
      if (forcedField) {
        gen[fieldName] = forcedField;
        return;
      }

      gen[fieldName] = this.buildField(fieldName, pools);
    });
    console.log(this.opts);
    return gen;
  }

  saveSchemaFile() {
    if (this.schema) {
      const data = JSON.stringify(this.schema, null, 4);
      const filePath = `${__dirname}/seeds/${this.name}.json`;
      fs.writeFile(filePath, data, 'utf8', err => {
        console.log(`saving file to ${filePath}`);
      });
    } else console.error('Cannot write schema. Schema not found');
  }
}
export default Seed;
