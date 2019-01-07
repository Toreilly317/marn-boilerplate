import fs from "fs"

export const random = {
  numer: (min = 0, max = 100) => Math.floor(Math.random() * (max - min + 1) + min),
  index: arr => arr[Math.floor(Math.random() * arr.length)],
  boolean: () => Math.random() > 0.5,
}

export const writeObjToFile = (data, name) => {
  fs.writeFile(`${__dirname}/${name}.json`, JSON.stringify(data, null, 4), 'utf8', (err) => {
    console.log(`saving file to ${filePath}`);
  });
}

