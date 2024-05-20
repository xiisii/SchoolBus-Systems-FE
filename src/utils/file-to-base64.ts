export const fileToBase64 = (
  file: Blob
): Promise<ArrayBuffer | string | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const imageToBase64 = (file: Blob, imageWidth: number) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const image = new Image();
      image.src = reader.result as string;

      image.onload = () => {
        const canvas = document.createElement("canvas");
        const width = Math.min(image.width, imageWidth);
        const height = (image.height * width) / image.width;

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx?.drawImage(image, 0, 0, width, height);

        const base64String = canvas.toDataURL("image/jpeg", 0.75);

        resolve(base64String);
      };
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
};
