export async function fetchFileList(chatId) {
    try {
        const response = await fetch(`http://localhost:5000/files/list/${chatId ? chatId : 'communityFiles'}?`);
        const data = await response.json();
        if(data.status === 404){
            console.log("error in backend, ", data.message)
        }
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
    fetch(`http://localhost:5000/files/upload/${chatId ? chatId : 'communityFiles'}`, {
      method: 'POST',
      body: formData
    })
    .catch((error) => console.error('Error:', error));
}

