export const downloadUrl = (url: string, name?: string) => {
  const link = document.createElement("a");
  let fileName = name;
  if (!fileName) {
    fileName = url.substring(url.indexOf("/") || 0);
    fileName = fileName.substring(0, fileName.indexOf("?") || fileName.length);
  }
  link.href = url;
  link.download = fileName;
  link.click();
  link.remove();
};

export const downloadFile = (blob: Blob | File | Uint8Array, name: string) => {
  const anchorElement = document.createElement("a");
  anchorElement.download = name;
  anchorElement.href = URL.createObjectURL(new Blob([blob]));
  anchorElement.click();
  URL.revokeObjectURL(anchorElement.href);
};

export const urlToFile = async (
  url: string,
  fileName?: string,
  options?: { timeout: number }
): Promise<File | undefined> => {
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), options?.timeout || 5000);
    const response = await fetch(url, {
      signal: controller.signal,
    });
    clearTimeout(id);
    const blob = await response.blob();
    let _fileName = fileName || "";
    if (!fileName) {
      const tmp = url.split("/");
      _fileName = tmp[tmp.length - 1];
    }
    return new File([blob], _fileName || "no_name", { type: blob.type });
  } catch (error) {
    return undefined;
  }
};

export const getArrayString = async (
  file: Blob | File
): Promise<string | ArrayBuffer | null | undefined> => {
  return new Promise((resolve) => {
    var fileReader = new FileReader();
    fileReader.onload = function (event) {
      resolve(event.target?.result);
    };
    fileReader.readAsArrayBuffer(file);
  });
};
