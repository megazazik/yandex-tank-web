import { promisify } from "util";
import * as fs from "fs";
import { basename, join } from "path";
import mkdirpCallback from "mkdirp";

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const deleteFile = promisify(fs.unlink);
const exists = promisify(fs.exists);
const mkdirp = promisify(mkdirpCallback);

export async function getFiles(path: string, ext = ".json") {
  const files = await readdir(path);
  return files.map(file => basename(file, ext));
}

export async function getContent(
  path: string,
  fileName: string,
  ext = ".json"
) {
  const content = await readFile(join(path, fileName + ext), "utf8");
  return JSON.parse(content);
}

export async function getItems(path: string) {
  const dirExists = await exists(path);
  if (!dirExists) {
    await mkdirp(path);
  }

  const files = await getFiles(path);
  const items = await Promise.all(
    files.map(fileName => getContent(path, fileName))
  );
  return items.reduce(
    (prev, item) => ({
      ...prev,
      items: {
        ...prev.items,
        [item.id]: item
      }
    }),
    { items: {} }
  );
}

export async function setItem(
  path: string,
  fileName: string,
  data: any,
  ext = ".json"
) {
  const dirExists = await exists(path);
  if (!dirExists) {
    await mkdirp(path);
  }

  await writeFile(join(path, fileName + ext), JSON.stringify(data), "utf8");
}

export async function deleteItem(
  path: string,
  basefileName: string,
  ext = ".json"
) {
  const fileName = join(path, basefileName + ext);
  const fileExists = await exists(fileName);
  if (fileExists) {
    await deleteFile(fileName);
  }
}
