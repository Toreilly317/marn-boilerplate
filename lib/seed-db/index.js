import Seeder from './Seeder';
import User from '../../models/User';
import Post from '../../models/Post';

const config = {
  models: [[User, { force: { password: 'password123' } }], [Post]],
  opts: {
    global: {
      ignore: ['__v'], // ignore these fields globally
    },
    count: 5, // default iteration count. defaults to 100
    folderPath: `${__dirname}/seeds/`, // Path to folder to save seed files

    dropCollections: [], // Drop collections from DB
  },
};

const seeder = new Seeder(config);
seeder.seed();
