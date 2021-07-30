// For Sign Up Form and Full Name Validation 
//TEST
function checkUserFullName() {
    var userLastname = document.getElementById("userFullName").value;
    console.log(userLastname)
    var flag = false;
    if (userLastname === "") {
        flag = true;
    }

    if (flag) {
        document.getElementById("userFullNameError").style.display = "block";
    } else {
        document.getElementById("userFullNameError").style.display = "none";
    }
}

//  Lastname Validation 
function checkUserLastname() {
    var userLastname = document.getElementById("userLastname").value;
    var flag = false;
    if (userLastname === "") {
        flag = true;
    }
    if (flag) {
        document.getElementById("userLastnameError").style.display = "block";
    } else {
        document.getElementById("userLastnameError").style.display = "none";
    }
}
//  Email Validation
function checkUserEmail() {
    var userEmail = document.getElementById("userEmail");
    var userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var flag;
    if (userEmail.value.match(userEmailFormate)) {
        flag = false;
    } else {
        flag = true;
    }
    if (flag) {
        document.getElementById("userEmailError").style.display = "block";
    } else {
        document.getElementById("userEmailError").style.display = "none";
    }
}
// Password Validation 
function checkUserPassword() {
    var userPassword = document.getElementById("userPassword");
    var userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;
    var flag;
    if (userPassword.value.match(userPasswordFormate)) {
        flag = false;
    } else {
        flag = true;
    }
    if (flag) {
        document.getElementById("userPasswordError").style.display = "block";
    } else {
        document.getElementById("userPasswordError").style.display = "none";
    }
}
// Check user bio characters. It'll use later 
function checkUserBio() {
    var userBio = document.getElementById("userBio").value;
    var flag = false;
    if (flag) {
        document.getElementById("userBioError").style.display = "block";
    } else {
        document.getElementById("userBioError").style.display = "none";
    }
}

function signInAfterSignUp() {

}

//  Submitting and Creating new user in firebase authentication 
function signUp() {
    var userFullName = document.getElementById("userFullName").value;
    var userLastname = document.getElementById("userLastname").value;
    var userEmail = document.getElementById("userEmail").value;
    var userPassword = document.getElementById("userPassword").value;
    var userFullNameFormate = /^([A-Za-z.\s_-])/;
    var userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;

    var checkUserFullNameValid = userFullName.match(userFullNameFormate);
    var checkUserEmailValid = userEmail.match(userEmailFormate);
    var checkUserPasswordValid = userPassword.match(userPasswordFormate);

    if (checkUserFullNameValid == null) {
        return checkUserFullName();
    } else if (userLastname === "") {
        return checkUserLastname();
    } else if (checkUserEmailValid == null) {
        return checkUserEmail();
    } else if (checkUserPasswordValid == null) {
        return checkUserPassword();
    } else {

        firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).then((success) => {

            var user = firebase.auth().currentUser;
            var uid;

            if (user != null) {
                uid = user.uid;
            }

            var firebaseRef = firebase.database().ref();
            var userData = {
                userFullName: userFullName,
                userLastname: userLastname,
                userEmail: userEmail,
                userPassword: userPassword,
                //  userFb: "https://www.facebook.com/",
                // userTw: "https://twitter.com/",
                //  userGp: "https://plus.google.com/",
                userBio: "User biography",
                userTookSurvey: "False",
            }
            firebaseRef.child(uid).set(userData);



            Swal.fire({
                title: 'Would you like to take the survey ?', // initial prompt title
                showDenyButton: true, // No button
                showCancelButton: false, // not used
                confirmButtonText: `Yes`, // yes take to survey
                denyButtonText: `No , Later`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    window.location.replace("surveyCopy.html"); // move to surevey.html

                } else if (result.isDenied) {
                    Swal.fire('Ensure to take the survey later for a more custom experience', '', 'info')
                    window.location.replace("profile.html"); // move to surevey.html

                }
            });
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            swal({
                type: 'error',
                title: 'Error',
                text: "Error",
            })
        });
    } // Create Email end


}
//  For Sign In / Index Form  Sign In Email Validation 
function checkUserSIEmail() {
    var userSIEmail = document.getElementById("userSIEmail");
    var userSIEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var flag;
    if (userSIEmail.value.match(userSIEmailFormate)) {
        flag = false;
    } else {
        flag = true;
    }
    if (flag) {
        document.getElementById("userSIEmailError").style.display = "block";
    } else {
        document.getElementById("userSIEmailError").style.display = "none";
    }
}
//  Sign In Password Validation 
function checkUserSIPassword() {
    var userSIPassword = document.getElementById("userSIPassword");
    var userSIPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;
    var flag;
    if (userSIPassword.value.match(userSIPasswordFormate)) {
        flag = false;
    } else {
        flag = true;
    }
    if (flag) {
        document.getElementById("userSIPasswordError").style.display = "block";
    } else {
        document.getElementById("userSIPasswordError").style.display = "none";
    }
}
//  Check email or password exsist in firebase authentication     
function signIn() {
    var userSIEmail = document.getElementById("userSIEmail").value;
    var userSIPassword = document.getElementById("userSIPassword").value;
    var userSIEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var userSIPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;

    var checkUserEmailValid = userSIEmail.match(userSIEmailFormate);
    var checkUserPasswordValid = userSIPassword.match(userSIPasswordFormate);

    if (checkUserEmailValid == null) {
        return checkUserSIEmail();
    } else if (checkUserPasswordValid == null) {
        return checkUserSIPassword();
    } else {
        firebase.auth().signInWithEmailAndPassword(userSIEmail, userSIPassword).then((success) => {

            // Check firebase if "taken survey"
            // if true update the button to "Retake Survey", else continue.
            // let user = firebase.auth().currentUser;
            // //console.log(user);
            // checkIfTestTaken(user);

            window.location.replace("./pages/profile.html");


        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            swal({
                type: 'error',
                title: 'Error',
                text: "Error",
            })
        });


    }

    // Check here firebase if "taken survey"
    // if true update the button to "Retake Survey", else continue.
    //checkIfTestTaken();
}


function updateProfile(user) {

    if (user) {
        //   User is signed in.
        let user = firebase.auth().currentUser;
        let uid
        if (user != null) {
            uid = user.uid;
        }
        let firebaseRefKey = firebase.database().ref().child(uid);
        firebaseRefKey.on('value', (dataSnapShot) => {

            document.getElementById("userPfFullName").innerHTML = dataSnapShot.val().userFullName;
            document.getElementById("userPfLastname").innerHTML = dataSnapShot.val().userLastname;
            console.log(dataSnapShot.val().userFullName)
            console.log(dataSnapShot.val().userLastname)

            // userEmail = dataSnapShot.val().userEmail;
            //userPassword = dataSnapShot.val().userPassword;


            // document.getElementById("userPfFb").setAttribute('href', dataSnapShot.val().userFb);
            // document.getElementById("userPfTw").setAttribute('href', dataSnapShot.val().userTw);
            // document.getElementById("userPfGp").setAttribute('href', dataSnapShot.val().userGp);
            document.getElementById("userPfBio").innerHTML = dataSnapShot.val().userBio;
            console.log(dataSnapShot.val().userBio)

            console.log("in updateProfile")
        })
    } else {
        //   No user is signed in.
    }

}

// For Profile Page Get data from server and display
// listener for log in / log out status

firebase.auth().onAuthStateChanged((user) => {
    console.log("onAuth")
    updateProfile(user);
    //checkIfTestTaken(user);

    // if (user) {
    //     //   User is signed in.
    //     let user = firebase.auth().currentUser;
    //     let uid
    //     if (user != null) {
    //         uid = user.uid;
    //     }
    //     let firebaseRefKey = firebase.database().ref().child(uid);
    //     firebaseRefKey.on('value', (dataSnapShot) => {

    //         document.getElementById("userPfFullName").innerHTML = dataSnapShot.val().userFullName;
    //         document.getElementById("userPfLastname").innerHTML = dataSnapShot.val().userLastname;
    //         // userEmail = dataSnapShot.val().userEmail;
    //         //userPassword = dataSnapShot.val().userPassword;

    //         document.getElementById("userPfFb").setAttribute('href', dataSnapShot.val().userFb);
    //         document.getElementById("userPfTw").setAttribute('href', dataSnapShot.val().userTw);
    //         document.getElementById("userPfGp").setAttribute('href', dataSnapShot.val().userGp);
    //         document.getElementById("userPfBio").innerHTML = dataSnapShot.val().userBio;
    //     })
    // } else {
    //     //   No user is signed in.
    // }
});


//  Show edit profile form with detail 
function showEditProfileForm() {

    document.getElementById("profileSection").style.display = "none"
    document.getElementById("editProfileForm").style.display = "block"
    var userPfFullName = document.getElementById("userPfFullName").innerHTML;
    var userPfLastname = document.getElementById("userPfLastname").innerHTML;
    //var userPfFb = document.getElementById("userPfFb").getAttribute("href");
    //var userPfTw = document.getElementById("userPfTw").getAttribute("href");
    // var userPfGp = document.getElementById("userPfGp").getAttribute("href");
    var userPfBio = document.getElementById("userPfBio").innerHTML;
    document.getElementById("userFullName").value = userPfFullName;
    document.getElementById("userLastname").value = userPfLastname;
    //document.getElementById("userFacebook").value = userPfFb;
    // document.getElementById("userTwitter").value = userPfTw;
    // document.getElementById("userGooglePlus").value = userPfGp;
    document.getElementById("userBio").value = userPfBio;
}
//  Hide edit profile form 
function hideEditProfileForm() {
    document.getElementById("profileSection").style.display = "block";
    document.getElementById("editProfileForm").style.display = "none";
}
//  Save profile and update database 
function saveProfile() {
    let userFullName = document.getElementById("userFullName").value
    let userLastname = document.getElementById("userLastname").value
    // // let userFacebook = document.getElementById("userFacebook").value
    // //let userTwitter = document.getElementById("userTwitter").value
    // //let userGooglePlus = document.getElementById("userGooglePlus").value
    let userBio = document.getElementById("userBio").value
    // var userFullNameFormate = /^([A-Za-z.\s_-])/;
    // var checkUserFullNameValid = userFullName.match(userFullNameFormate);
    // if (checkUserFullNameValid == null) {
    //     return checkUserFullName();
    // } else if (userLastname === "") {
    //     return checkUserLastname();
    // } else {

    let user = firebase.auth().currentUser;
    let uid;
    if (user != null) {
        uid = user.uid;
    }
    let firebaseRefKey = firebase.database().ref().child(uid);
    firebaseRefKey.on('value', (dataSnapShot) => {
        var firebaseRef = firebase.database().ref();
        var userData = {
            // These parts are the info that user changed/ can change
            userFullName: userFullName,
            userLastname: userLastname,
            // userFb: userFacebook,
            // userTw: userTwitter,
            // userGp: userGooglePlus,
            userBio: userBio,
            //This part remains the same, get data from DB and input same info (unchaged) 
            userEmail: dataSnapShot.val().userEmail,
            userTookSurveySur: "True",
        }
        console.log("In Save Profile")
        firebaseRef.child(uid).set(userData);
    })

    // document.getElementById("profileSection").style.display = "block";

    // document.getElementById("editProfileForm").style.display = "none";
    hideEditProfileForm();

    //}
}
// Working For Sign Out 
function signOut() {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        swal({
            type: 'successfull',
            title: 'Signed Out',
        }).then((value) => {
            setTimeout(function () {
                window.location.replace("../index.html");
            }, 1000)
        });
    }).catch(function (error) {
        // An error happened.
        let errorMessage = error.message;
        swal({
            type: 'error',
            title: 'Error',
            text: "Error",
        })
    });
}
function showTakeSurvey() {

    // for SurveyJS
    document.getElementById("profileSection").style.display = "none"
    document.getElementById("surveyContainer").style.display = "block"

    Survey.StylesManager.applyTheme("modern");

    var surveyJSON = { "pages": [{ "name": "page1", "elements": [{ "type": "ranking", "name": "Rank your Favorite category", "title": "Rank your Favorite category ", "description": "Ranking Categories", "isRequired": true, "choices": ["Horror", "Romance", "Sci-FI", "Action", "Comedy"] }, { "type": "multipletext", "name": "last 3 series you watch", "title": "What was the last 3 series you watch ?", "description": "last 3 series you watch", "items": [{ "name": "Series 1" }, { "name": "Series 2" }, { "name": "Series 3" }] }, { "type": "panel", "name": "panel1", "elements": [{ "type": "html", "name": "question1", "html": "<h1> Are you a fan of any of these Producers ? </h1>" }] }, { "type": "boolean", "name": "Quentin Tarantino", "title": "Quentin Tarantino" }, { "type": "boolean", "name": "Kathleen Kennedy", "title": "Kathleen Kennedy" }, { "type": "boolean", "name": "Spike Lee", "title": "Spike Lee" }, { "type": "boolean", "name": "Kevin Feige", "title": "Kevin Feige" }] }], "showCompletedPage": false }

    function sendDataToServer(survey) {
        //send Ajax request to your web server.
        document.getElementById("profileSection").style.display = "block";

        document.getElementById("surveyContainer").style.display = "none";

        alert("The results are:" + JSON.stringify(survey.data));

    }

    var survey = new Survey.Model(surveyJSON);
    $("#surveyContainer").Survey({
        async: true,
        model: survey,
        onComplete: sendDataToServer
    });

    // set RetakeSurvey value to true
    // setRetakeTestTrue();
    // survey has been taken, set the element (button) to display "Retake Survey"
    //  document.getElementById("takeSurveybtn").innerHTML = "Retake Survey";



}
function showTakeSurveyCopy() {
    Survey.StylesManager.applyTheme("modern");

    var surveyJSON = { "pages": [{ "name": "page1", "elements": [{ "type": "ranking", "name": "Rank your Favorite category", "title": "Rank your Favorite category ", "description": "Ranking Categories", "isRequired": true, "choices": ["Horror", "Romance", "Sci-FI", "Action", "Comedy"] }, { "type": "multipletext", "name": "last 3 series you watch", "title": "What was the last 3 series you watch ?", "description": "last 3 series you watch", "items": [{ "name": "Series 1" }, { "name": "Series 2" }, { "name": "Series 3" }] }, { "type": "panel", "name": "panel1", "elements": [{ "type": "html", "name": "question1", "html": "<h1> Are you a fan of any of these Producers ? </h1>" }] }, { "type": "boolean", "name": "Quentin Tarantino", "title": "Quentin Tarantino" }, { "type": "boolean", "name": "Kathleen Kennedy", "title": "Kathleen Kennedy" }, { "type": "boolean", "name": "Spike Lee", "title": "Spike Lee" }, { "type": "boolean", "name": "Kevin Feige", "title": "Kevin Feige" }] }], "showCompletedPage": false }

    function sendDataToServerMoveToProfile(survey) {
        //send Ajax request to your web server.
        alert("The results are:" + JSON.stringify(survey.data));
        // move to profile page
        window.location.replace("profile.html");
    }
    function moveToProfilePage() {

        window.location.replace("profile.html");
    }



    var survey = new Survey.Model(surveyJSON);
    $("#surveyContainer").Survey({
        model: survey,
        onComplete: sendDataToServerMoveToProfile,
    });

    // after test has been taken, boolean to true in FB database
    setRetakeTestTrue();
    // survey has been taken, set the element (button) to display "Retake Survey"
    document.getElementById("takeSurveybtn").innerHTML = "Retake Survey";

}


function checkIfTestTaken(user) {
    // let user = firebase.auth().currentUser;

    console.log("RTS", user);
    if (user) {
        console.log("USR OK");
        //   User is signed in.
        // let user = firebase.auth().currentUser;
        let uid
        if (user != null) {
            uid = user.uid;
        }
        console.log("UID", uid);
        let firebaseRefKey = firebase.database().ref().child(uid);
        console.log("XXXXX");
        firebaseRefKey.on('value', (dataSnapShot) => {

            //console.log("YYYY", dataSnapShot.val().userTookSurveySur);
            if (dataSnapShot.val().userTookSurveySur == "True") {
                console.log(dataSnapShot.val().userTookSurveySur);
                console.log("We in True Boys   ");
                var elem = document.getElementById("takeSurveybtn");
                console.log(elem.value);
                console.log(elem);
                //  WORK IN PROGRESS. DOES NOT WORK
                if (elem.value == "Take Survey") {
                    elem.value = "Re-Take Survey";
                    console.log(elem);
                }
                else elem.value = "Re-Take Survey";
                //document.getElementById("takeSurveybtn").innerHTML = "Retake Survey";
            }

        })

    }

}

// this fumction is called after the user has taken the survey 
// for the fisrt time
function setRetakeTestTrue() {

    //get current user
    let user = firebase.auth().currentUser;
    let uid;
    if (user != null) {
        uid = user.uid;
    }

    //get users data from firebase
    let firebaseRefKey = firebase.database().ref().child(uid);
    firebaseRefKey.on('value', (dataSnapShot) => {

        var firebaseRef = firebase.database().ref();
        //Create object with Data
        if (dataSnapShot.val().userTookSurveySu == "False") {
            var userData = {
                // //get current values from Firebase
                userFullName: dataSnapShot.val().userFullName,
                userLastname: dataSnapShot.val().userLastname,
                userEmail: dataSnapShot.val().userEmail,
                userFb: dataSnapShot.val().userFb,
                userTw: dataSnapShot.val().userTw,
                userGp: dataSnapShot.val().userGp,
                userBio: dataSnapShot.val().userBio,
                userTookSurveySur: "True", // this only value we change, set to true
            }
            //send that object to firebase
            firebaseRef.child(uid).set(userData);
        }
    })



}




