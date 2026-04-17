import JSZip from 'jszip';

const ZIP_LOCATION = 'http://LAPTOP-7L9KQ37O.local:3005/bible/rcv.zip';

export const downloadRcv = async () => {
  const blob = await tryDownloadBible();
  console.log('downloaded');
  if (!blob) return;
  const files = await unzipBible(blob);
  // console.log('files', files);

  for (const filename of Object.keys(files)) {
    localStorage.setItem(filename.replace('.json', ''), files[filename]);
  }
};

async function tryDownloadBible() {
  try {
    const resp = await fetch(ZIP_LOCATION, {
      mode: 'cors',
    });

    if (!resp.ok) return null;

    const blob = await resp.blob();
    return blob;
  } catch {
    return null; // not on home network
  }
}

async function unzipBible(blob: Blob) {
  const zip = await JSZip.loadAsync(blob);
  const files: Record<string, string> = {};

  for (const [name, entry] of Object.entries(zip.files)) {
    if (!entry.dir) {
      files[name] = await entry.async('string');
    }
  }

  return files;
}
