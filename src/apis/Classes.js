export const uploadClass = async classInfo => {
    const res = await fetch('http://localhost:5000/classes', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(classInfo)
    })
    const data = await res.json();
    return data;
}

// get all classes 
export const getAllClasses = async () => {
    const response = await fetch('http://localhost:5000/classes')
    const data = await response.json()
    return data;
}