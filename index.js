
let countContainer = document.getElementById('StudCount');
const form = document.getElementById('studentDetailsForm');
let student_count = 0; 

///  when the page relode so all the previous user data will rendered on the screen

window.addEventListener('DOMContentLoaded', (event) => {
    getRequest()
        .then(response => {
            for (let i = 0; i < response.data.length; i++) {
                showuserOnScreen(response.data[i], response.data[i]._id)
            }
            // also show a total student count
            student_count =response.data.length;
            change_Student_Count(student_count);
        })
        .catch(error => console.log(error));

})




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

///  post request for adding student details on the server
postRequest(obj)
.then(response => { 
    showuserOnScreen(obj, response.data._id)  
})
.catch(error => console.log(error));

// making the input fields empty again after submit details
    form.reset();
})


// updates student count 
function change_Student_Count( count){
    countContainer.innerHTML = `Total Student - ${count}`
}



/// function that render the all the user details on the screen 

function showuserOnScreen(obj, userId) {
    const li = document.createElement('li');
    const dltBtn = document.createElement('button');
    dltBtn.innerText = "delete";
    dltBtn.setAttribute('id', userId);
    dltBtn.style.margin="10px"

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

let Baseurl = "https://crudcrud.com/api/ec30c51f09514fada43d3afc8dd29dbf"


function deletRequest(userId) {
    axios.delete(`${Baseurl}/student/${userId}`)
        .then(response => {
            const userToRemove = document.getElementById(userId);
            if (userToRemove) {
                userToRemove.parentNode.remove();
            }
            student_count--;
            change_Student_Count(student_count);
        })
        .catch(error => console.log(error))
}

function getRequest(userId) {
    if (userId) {
        return axios.get(`${Baseurl}/student/${userId}`)
    }
    return axios.get(`${Baseurl}/student`)

}

function postRequest(obj) {
    student_count++;
    change_Student_Count(student_count);
    return axios.post(`${Baseurl}/student`, obj)
}
