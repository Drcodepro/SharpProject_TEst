


///  when the page relode so all the previous user data will rendered on the screen

window.addEventListener('DOMContentLoaded', (event) => {
    getRequest()
        .then(response => {
            for (let i = 0; i < response.data.length; i++) {
                showuserOnScreen(response.data[i], response.data[i]._id)
            }
        })
        .catch(error => console.log(error));
})



const form = document.getElementById('studentDetailsForm');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    var Studentname = document.getElementById('Studentname').value;
    var Address = document.getElementById('Address').value;
    var phoneNumber = document.getElementById('phoneNumber').value;

    // create user detail object
    const obj = {
       'Studentname' :Studentname,
        'Address':Address,
       'phoneNumber': phoneNumber
    }

   ///  post request
    postRequest(obj)
    .then(response => { showuserOnScreen(obj, response.data._id) })
    .catch(error => console.log(error));

    // making the input fields empty again after submit details
    document.getElementById('Studentname').value ="";
    document.getElementById('Address').value ="";
    document.getElementById('phoneNumber').value ="";
})



/// function that render the all the user details on the screen 

function showuserOnScreen(obj, userId) {
    const li = document.createElement('li');
    const dltBtn = document.createElement('button');
    dltBtn.innerText = "delete";
    dltBtn.setAttribute('id', userId);

    const editBtn = document.createElement("button");
    editBtn.innerText = 'edit';
    editBtn.setAttribute('id', userId);

    // list item created that contains user details
    li.innerHTML = `${obj.Studentname} -- ${obj.Address} -- ${obj.phoneNumber}`
    li.append(dltBtn)
    li.append(editBtn);
    const  AllStudent = document.getElementById('AllStudent');
    AllStudent.append(li);


    // edit button  event listner
    editBtn.addEventListener('click', (event) => {
        editeUser(userId);
    })

    // delete button event listner 
    dltBtn.addEventListener('click', (event) => {
        // Call the delete function with the user ID
        deletRequest(userId)
    });
}



// edite user functionality logic
function editeUser(userId) {
    getRequest(userId)
        .then((response) => {
            document.getElementById('Studentname').value = response.data.Studentname;
            document.getElementById('Address').value = response.data.Address;
            document.getElementById('phoneNumber').value = response.data.phoneNumber;
        })
        .catch(error => console.log(error))

    deletRequest(userId)

}



/// Axios requests 

function deletRequest(userId) {
    axios.delete(`https://crudcrud.com/api/fe881c25c28b49a6a4a6aa5788385cd8/BookingAppointment/${userId}`)
        .then(response => {
            const userToRemove = document.getElementById(userId);
            if (userToRemove) {
                userToRemove.parentNode.remove();
            }
        })
        .catch(error => console.log(error))
}


function getRequest(userId) {
    if (userId) {
        return axios.get(`https://crudcrud.com/api/fe881c25c28b49a6a4a6aa5788385cd8/BookingAppointment/${userId}`)
    }
    return axios.get("https://crudcrud.com/api/fe881c25c28b49a6a4a6aa5788385cd8/BookingAppointment")

}

function postRequest(obj) {
    return axios.post("https://crudcrud.com/api/fe881c25c28b49a6a4a6aa5788385cd8/BookingAppointment", obj)
}
