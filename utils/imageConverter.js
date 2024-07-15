const toBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

export const tobase64Handler = async (files) => {
  const filePathsPromises = [];

  for (let file of files) {
    filePathsPromises.push(toBase64(file));
  }

  const filePaths = await Promise.all(filePathsPromises);
  const mappedFiles = filePaths.map((base64File) => base64File);
  return { success: true, mappedFiles };
}