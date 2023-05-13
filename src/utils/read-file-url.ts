export const readFileURL = (file: File): Promise<string> => {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = e => typeof e.target?.result === "string" ? res(e.target.result) : "";
    reader.readAsDataURL(file);
  });
};