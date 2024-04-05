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
    try{
        const response = await fetch(`http://localhost:5000/files/download/${chatId}/${fileName}`);
        const file = await response.blob();
        const url = URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
    }catch(error){
        console.error(`Error downloading ${fileName}`, error);
    }
}

export async function fileDownloadTest(e, chatId, fileName){
    console.log("downloading function")
    const requestOptions = {
    method: "GET"
  };
    fetch(`http://localhost:5000/files/download/${chatId}/${fileName}`, requestOptions)
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
    /*
    fetch(fileRoute)
            .then(response => response.blob())
            .then(blob => {
                const url = URL.createObjectURL(blob);
                setFileUrl(url);
                <a href={fileUrl} download>Download File</a>
            })
            .catch(error => console.error(error));
    */
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