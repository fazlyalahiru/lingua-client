export const insertUser = user => {
    const currentUser = {
        email: user.email,
    }
    console.log(currentUser);
    fetch(`http://localhost:5000/users/${user?.email}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(currentUser)
    }).then(res => res.json())
        .then(data => console.log(data))
}

export const instructorRequest =async user => {
    const currentUser = {
        role: 'instructor',
    }
    console.log(currentUser);
    return fetch(`http://localhost:5000/users/${user?.email}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(currentUser)
    }).then(res => res.json())
}

// get role of a user
export const userRole = async email =>{
    const response = await fetch(`http://localhost:5000/users/${email}`)
    const user = await response.json()
    return user?.role; 
}