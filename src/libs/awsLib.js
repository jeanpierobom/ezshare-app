import { Storage } from "aws-amplify";

export async function s3Upload(file) {
  const filename = `${Date.now()}-${file.name}`;

  // const stored = await Storage.vault.put(filename, file, {
  //   contentType: file.type
  // });

  const stored = await Storage.put(filename, file, {
    contentType: file.type
  });

  return stored.key;
}