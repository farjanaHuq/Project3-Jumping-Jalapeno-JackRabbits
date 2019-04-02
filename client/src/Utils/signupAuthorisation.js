$(document).ready(function () {
    console.log("ready!");

    // Get the modal
    var modal = document.getElementById('id01');
    var modal2 = document.getElementById('id02');
    var modal3 = document.getElementById('id03');
    var modal4 = document.getElementById('id04');
    var modal5 = document.getElementById('submit-confirm-modal');

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        } else if (event.target == modal2) {
            modal2.style.display = "none";
        } else if (event.target == modal3) {
            modal3.style.display = "none";
        } else if (event.target == modal4) {
            modal4.style.display = "none";
        } else if (event.target == modal5) {
            modal5.style.display = "none";
        }
    }

    //onclick function for signup page
    $("#register-submit").on("click", function (e) {
        e.preventDefault();
        var firstName = $("#fname").val().trim();
        var lastName = $("#lname").val().trim();
        var email = $("#email").val().trim();
        var password = $("#password").val().trim();
        var confirmPassword = $("#confirmPassword").val().trim();

        if (password === confirmPassword) {
            console.log("password match");
            axios.post("/auth/signup", {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            }).then(function (resp) {
                if (resp.status === 201) {
                    alert('User created successfully!');
                    // save the token in a cookie
                    loginUser({
                        token: resp.data.token,
                        firstName: resp.data.firstName,
                        lastName: resp.data.lastName,
                        email: resp.data.email,
                        userID: resp.data.userID
                    });
                    window.location.href = '/';
                }
                console.log(resp);
                // window.location.assign("/login");
            }).catch(function (err) {
                console.error(err);
            });
        }
        else {
            alert("password does not match.");
        }
    });


    //onclick function for login page
    $("#login-submit").on("click", function (e) {
        e.preventDefault();
        var email = $("#login-email").val();
        var password = $("#login-pass").val();

        axios.post("/auth/login", {
            email: email,
            password: password
        })
            .then(function (resp) {
                console.log(resp);
                // window.localStorage.setItem("token", resp.data.token);
                // $(".login").hide();
                // $(".redirect").show();
                // window.setTimeout(function () {
                //     window.location.assign("/index.html")
                // }, 2000)
                loginUser({
                    token: resp.data.token,
                    firstName: resp.data.firstName,
                    lastName: resp.data.lastName,
                    email: resp.data.email,
                    userID: resp.data.userID
                });
                location.href = '/';
            })
            .catch(function (err) {
                console.error(err);
            });
    });
    //jwt authorisation
    // var token = window.localStorage.getItem("token");
    var token = getCookie('token');
    // if (token) {
    //     var payload = JSON.parse(window.atob(token.split('.')[1]));
    //     console.log('payload', payload);
    // }
    // console.log('checking for token');
    // if (token) {
    //     console.log('token found');
    //     axios({
    //         url: "/api/protect",
    //         headers: {
    //             "Authorization": "Bearer " + (token)
    //         }
    //     })
    //         .then(function (resp) {
    //             console.log('api/protected.resp', resp);

    //         })
    //         .catch(function (err) {
    //             console.error('api/protected.err', err);
    //         });
    //     ;
    // }
});


function loginUser({ token, firstName, lastName, email, userID }) {
    setCookie('token', token);
    setCookie('firstName', firstName);
    // browser.cookies.set({
    //     token,
    //     firstName,
    //     lastName,
    //     email,
    //     userID
    // });
}