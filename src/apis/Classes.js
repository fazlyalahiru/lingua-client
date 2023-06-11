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

// Specific instructor clases
export const getSpecificInstructorClasses = async email => {
    const response = await fetch(`http://localhost:5000/classes/${email}`)
    const data = await response.json()
    return data;
}

// delete intructor speciific one class 

export const deleteSpecificClass = async id => {
    const res = await fetch(`http://localhost:5000/classes/${id}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        }
    })
    const data = await res.json();
    return data;
}