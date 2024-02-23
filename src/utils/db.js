/**
 * Sends provided file to server
 * @param {File} file file to send to server
 */
export function uploadFile(file) {
  if (!file) throw new Error("No file was provided")
  const formData = new FormData()
  formData.append("file",file)

  fetch(url("/uploadFile"), {
    method: "POST",
    body: formData,
    credentials: "include"
  })
}

function url(path) {
  return new URL(path,import.meta.env.VITE_SERVER_ORIGIN).path
}