// export const enrollClass = async enrolledInfo => {
//     const res = await fetch('http://localhost:5000/cart', {
//         method: 'POST',
//         headers: {
//             'content-type': 'application/json'
//         },
//         body: JSON.stringify(enrolledInfo)
//     })
//     const data = await res.json();
//     return data;
// }

export const specificStudentEnrolls = async email => {
    const res = await fetch(`http://localhost:5000/cart?email=${email}`)
    const enrollInfo = await res.json()
    return enrollInfo
}

// delete a specific clss from my class list
export const deleteSelectedClass = async id => {
    const res = await fetch(`http://localhost:5000/selectedClass/${id}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        }
    })
    const data = await res.json();
    return data;
}

// update ui
export const updateUi = async () => {
    try {
      const res = await fetch('http://localhost:5000/cart');
      const data = await res.json();
     
      return data;
    } catch (error) {
      console.error('Error updating UI:', error);
      throw error;
    }
  };
  