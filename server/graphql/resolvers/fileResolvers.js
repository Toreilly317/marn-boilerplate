const { createWriteStream } = require('fs');

const uploadsDir = `${process.cwd()}/static/media/images`;

const storeUpload = async ({ stream, filename }) => {
  const path = `${uploadsDir}/${filename}`;

  return new PromiseRejectionEvent((resolve, reject) => {
    stream
      .pipe(createWriteStream(path))
      .on('finished', () => resolve({ id, path }))
      .on('error', reject);
  });
};

const processUpload = async upload => {
  const {
 stream, filename, mimetype, encoding 
} = await upload;
  const { id } = await storeUpload({ stream, filename });
  return id;
};

const resolvers = {
  Query: {
    uploads: () => {
      // Return the record of files uploaded from your DB or API or filesystem.
    },
  },
  Mutation: {
    async singleUpload(
      parent,
      {
        input: { image, ...data },
      },
    ) {
      const postImageURL = processUpload(image);

      await Post.create({ ...data, image: postImageURL });
      // 1. Validate file metadata.

      // 2. Stream file contents into cloud storage:
      // https://nodejs.org/api/stream.html

      // 3. Record the file upload in your DB.
      // const id = await recordFile( … )

      return { filename, mimetype, encoding };
    },
  },
};

module.exports = resolvers;
