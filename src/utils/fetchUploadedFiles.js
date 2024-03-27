export async function fetchFileList() {
    try {
        const response = await fetch('http://localhost:5000/files/list');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching file list:', error);
        throw error;
    }
}