export async function fetchFileList(chatId) {
    try {
        const response = await fetch(`http://localhost:5000/files/list/${chatId === undefined ? 'communityFiles' : chatId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching file list:', error);
        throw error;
    }
}

function createFileLink(fileName, fileBlob) {
    const fileUrl = URL.createObjectURL(fileBlob);
    const link = document.createElement('a');
    link.textContent = fileName;
    link.href = fileUrl;
    link.download = fileName;
    const listItem = document.createElement('li');
    listItem.appendChild(link);
    return listItem;
    /*
    href must be fileBlob url
    set href and download attr
    */
}

export function fileUpload(data, chatId){
    //create formdata instance
    let formData = new FormData();
    // Append files to formData
    formData.append('file', data);
    
    // Make a fetch POST request
    fetch(`http://localhost:5000/files/upload/${chatId === undefined ? 'communityFiles' : chatId}`, {
      method: 'POST',
      body: formData
    })
    .catch((error) => console.error('Error:', error));
}

export function fileDelete(e, chatId, fileName){
    fetch(`http://localhost:5000/files/${chatId === undefined ? 'communityFiles' : chatId}/${fileName}`, {
        method: 'DELETE'
    })
    .then((res) => {
        const data = res.json()
        return data
    })
    .catch((error) => console.error('Error:', error));
}

export function fileDuplicate(e, chatId, fileName){
    fetch(`http://localhost:5000/files/${chatId === undefined ? 'communityFiles' : chatId}/${fileName}`, {
        method: 'POST'
    })
    .then((res) => {
        const data = res.json()
        return data
    })
    .catch((error) => console.error('Error:', error));
}