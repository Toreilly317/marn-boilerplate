
import _ from "lodash";
import mongoose from "mongoose"

class Seedling {
  constructor (model, count, pools, opts = {}) {
    this.name = model.collection.name
    this.opts = opts
    this.filePath = `${__dirname}/seeds/${model.collection.name}-seed.json`
    this.ignoredFields = ['createdAt', 'updatedAt', '__v', /detail.*_info/];
    this.fields = []
    this.getFields(model)
  }



  getFields(model) {
    _.mixin({
      pickSchema: function (model, excluded) {
        var fields = [];
        model.schema.eachPath(function (path) {
          _.isArray(excluded) ? excluded.indexOf(path) < 0 ? fields.push(path) : false : path === excluded ? false : fields.push(path);
        });
        return fields;
      }
    });

    const fields = _.pickSchema(model, this.ignoredFields);


    fields.forEach(field => {
      const item = model.schema.path(field);
      const { path, instance, isRequired, enumValues } = item
      const { ref } = item.options
      const data = { path, instance, isRequired, enumValues, ref }
      return this.fields = [...this.fields, data]
    })
  }
}

export default Seedling