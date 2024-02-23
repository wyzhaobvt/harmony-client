/**
 * @param {number} bytes file size
 * @param {number} decimalPlaces number of possible decimal places
 * @returns {string} formatted file size
 * @example formatFileSize(3432353) // "3.27 M"
 */
export default function formatFileSize(bytes, decimalPlaces = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimalPlaces < 0 ? 0 : decimalPlaces;
  const sizes = ["B", "K", "M", "G", "T", "P"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}