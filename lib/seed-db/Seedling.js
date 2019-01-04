
import _ from "lodash";
import flatten from "../flat"


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
    console.log(model.schema.tree)
    return
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


      const data = {
        name: item.path,
        type: item.instance,
        default: item.defaultValue,
        isEnum: Array.isArray(item.enumValues) && item.enumValues.length,
        enum: item.enumValues,
        // lowercase: !!item.options.lowercase,
        // uppercase: !!item.options.uppercase,

        trim: !!item.options.trim
      }

      if (data.name === "posts" || data.name === "author") {
        console.log(item.caster)
      }


      return this.fields = [...this.fields, data]
    })


  }


}

export default Seedling