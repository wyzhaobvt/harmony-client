const url = import.meta.env.VITE_SERVER_ORIGIN

export async function fetchFileList(chatId) {
    let id = chatIdCheck(chatId)
    try {
        const response = await fetch(`${url}/files/list/${id}`, {
          credentials: "include"
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Server Error:', error);
        throw error;
    }
}

export function fileDownload(e, chatId, fileId, fileName){
    e.preventDefault();
    let id = chatIdCheck(chatId)
    //query SQL to get file name from file id

    fetch(`${url}/files/download/${id}/${fileId}`,{
      credentials: "include"
    })
    .then(res => {
        return res.blob()
    })
    .then(blob => {
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.append(link);
        link.click();
    })
    .catch(err => console.error("Server Error", err))
} 

export async function fileUpload(data, chatId){
    let id = chatIdCheck(chatId)
    //create formdata instance
    let formData = new FormData();
    // Append files to formData
    formData.append('file', data);
    //formData.append('file-uid', )
    //console.log("upload data", data)
    //i need to grab the id here and send it to the html 5/20/24
    // Make a fetch POST request
    await fetch(`${url}/files/upload/${id}`, {
      method: 'POST',
      body: formData,
      credentials: "include"
    })
    .then(data => console.log("upload data", (data)))
    .catch((error) => console.error('Server Error:', error));
}

export async function fileDelete(e, chatId, fileName){
    let id = chatIdCheck(chatId)
    await fetch(`${url}/files/delete/${id}/${fileName}`, {
        method: 'DELETE',
        credentials: "include"
    })
    .then((res) => {
        const data = res.json()
        return data
    })
    .catch((error) => console.error('Server Error:', error));
}



export async function fileDuplicate(e, chatId, fileName){
    let id = chatIdCheck(chatId)
    await fetch(`${url}/files/duplicate/${id}/${fileName}`, {
        method: 'POST',
        credentials: "include"
    })
    .then((res) => {
        const data = res.json()
        return data
    })
    .catch((error) => console.error('Server Error:', error));
}

export async function fileRename(e, chatId, fileName){
    let id = chatIdCheck(chatId)
    const newFileName = prompt("Enter new file name");
    await fetch(`${url}/files/rename/${id}/${fileName}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include",
                body: JSON.stringify({
                    newFileName
                })
            })
            .then((res) => {
                const data = res.json()
                return data
            })
            .catch((error) => console.error('Server Error:', error));
}

function chatIdCheck(id){
    return id === undefined ? 'communityFiles' : id
}