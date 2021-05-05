//Camera localStorage log


let cameras = {
    _id:"5be1ed3f1c9d44000030b061",
    name: "Zurss 50S",
    price: 49900,
}

let zurssCamera = [];
const addZurssCamera = (ev) => {
    ev.preventDefault();
    let camera = {
        _id:"5be1ed3f1c9d44000030b061",
        name: "Zurss 50S",
        price: 49900,
    }
    zurssCamera.push(camera);

    console.log('added', {zurssCamera});

    localStorage.setItem('ZurssCamera', JSON.stringify(zurssCamera));
}
document.addEventListener ('DOMContentLoaded', () => {
document.getElementById ('zurssButton').addEventListener('click', addZurssCamera);
});

//end of Camera localStorage log


//Submit form localStorage log

let userDetails = [];
const addUserDetails = (ev) => {
    ev.preventDefault();
    let user = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        email: document.getElementById('email').value,
    }
    userDetails.push(user);
    document.querySelector('form').reset();

    console.log('added', {userDetails});

    localStorage.setItem('CustomerDetails', JSON.stringify(userDetails));
}
document.addEventListener ('DOMContentLoaded', () => {
document.getElementsByTagName ('submit').addEventListener('click', addUserDetails);
});

//end of Submit form localStorage log


function validate() {
      
    if( document.myForm.firstName.value == "" ) {
       alert( "Please provide your first name!" );
       document.myForm.firstName.focus() ;
       return false;
    }
    if( document.myForm.lastName.value == "" ) {
        alert( "Please provide your last name!" );
        document.myForm.lastName.focus() ;
        return false;
    }
    if( document.myForm.address.value == "" ) {
        alert( "Please provide your address!" );
        document.myForm.address.focus() ;
        return false;
    }
    if( document.myForm.city.value == "" ) {
        alert( "Please provide your city!" );
        document.myForm.city.focus() ;
        return false;
    }
    if( document.myForm.email.value == "" ) {
        alert( "Please provide your Email!" );
        document.myForm.email.focus() ;
        return false;
     }
    function validateEmail() {
        var emailID = document.myForm.email.value;
        atpos = emailID.indexOf("@");
        dotpos = emailID.lastIndexOf(".");
        
        if (atpos < 1 || ( dotpos - atpos < 2 )) {
           alert("Please enter correct email ID")
           document.myForm.EMail.focus() ;
           return false;
        }
        return( true );
     }
    return( true );
}


function toggleCameras() {
    var x = document.getElementById("hiddenCameras");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }