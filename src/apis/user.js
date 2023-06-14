export const insertUser = user => {
    console.log(user);
    const currentUser = {
        name:user.displayName,
        email: user.email,
        photo:user.photoURL, 
        role: 'student'
    }
    
    fetch(`https://lingua-server.vercel.app/users/${user?.email}`, {
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
    return fetch(`https://lingua-server.vercel.app/users/${user?.email}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(currentUser)
    }).then(res => res.json())
}

// get role of a user
export const userRole = async email =>{
    const response = await fetch(`https://lingua-server.vercel.app/users/${email}`)
    const user = await response.json()
    return user?.role; 
}