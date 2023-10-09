import * as fileSaver from 'file-saver';

export const convertByteArrayToBlob = (byteArray: string, contentType: string, name: string) => {
  let sliceSize = 512;
  let byteCharacters = atob(byteArray);
  let byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    let slice = byteCharacters.slice(offset, offset + sliceSize);
    let byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    byteArrays.push(new Uint8Array(byteNumbers));
  }

  fileSaver.saveAs(new Blob(byteArrays, { type: contentType }), name);
};
