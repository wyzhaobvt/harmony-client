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

export function fileDownload(chatId, fileName){
    
    // Make a fetch GET request
    fetch(`http://localhost:5000/files/download/${chatId}/${fileName}`)
        .then(response => response.blob())
        .then(fileBlob => {
            //create link to download file
            const link = createFileLink(fileId, fileBlob);
            document.getElementById('fileList').appendChild(link);
        })
        .catch((error) => console.error('Error:', error));
}