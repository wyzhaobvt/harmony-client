export async function fetchFileList(chatId) {
    let id = chatIdCheck(chatId)
    try {
        const response = await fetch(`http://localhost:5000/files/list/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching file list:', error);
        throw error;
    }
}

export async function fileDownload(e, chatId, fileName){
    e.preventDefault();
    let id = chatIdCheck(chatId)
    await fetch(`http://localhost:5000/files/download/${id}/${fileName}`,{
        method: 'GET'
    })
    .then(res => {
        console.log(res)
        return res.blob()
    })
    .then(blob => {
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.append(link);
        link.click();
        document.body.removeChild(link);    
        URL.revokeObjectURL(url);
    })
    .catch(err => console.log("Didn't download", err))
    
}

export async function fileUpload(data, chatId){
    let id = chatIdCheck(chatId)
    //create formdata instance
    let formData = new FormData();
    // Append files to formData
    formData.append('file', data);
    
    // Make a fetch POST request
    await fetch(`http://localhost:5000/files/upload/${id}`, {
      method: 'POST',
      body: formData
    })
    .catch((error) => console.error('Error:', error));
}

export async function fileDelete(e, chatId, fileName){
    let id = chatIdCheck(chatId)
    await fetch(`http://localhost:5000/files/${id}/${fileName}`, {
        method: 'DELETE'
    })
    .then((res) => {
        const data = res.json()
        return data
    })
    .catch((error) => console.error('Error:', error));
}

export async function fileDuplicate(e, chatId, fileName){
    let id = chatIdCheck(chatId)
    await fetch(`http://localhost:5000/files/${id}/${fileName}`, {
        method: 'POST'
    })
    .then((res) => {
        const data = res.json()
        return data
    })
    .catch((error) => console.error('Error:', error));
}

function chatIdCheck(id){
    return id === undefined ? 'communityFiles' : id
}