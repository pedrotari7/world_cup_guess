/****************************************************************
 *                          Google Login                        *
 * *************************************************************/

function onSuccess(googleUser) {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
      // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
    var url = "http://www.worldcupguess.win:5000/api/v1.0/login/google";
    var data = {};
    data.token = id_token;
    var json = JSON.stringify(data);

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url + '/' + id_token, true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.onload = function () {
        var result = JSON.parse(xhr.responseText);
        console.log('response:', xhr.responseText);
        if (xhr.readyState == 4 && xhr.status == "200") {
            console.log('response:', xhr.responseText);
            console.log(result);
            get_home(result['id']);
        } else {
            console.error(xhr.readyState);
            console.error(xhr.status);
s
            console.error(result);
        }
    }
    xhr.send(json);
}

function onFailure(error) {
  console.log(error);
}

function renderButton() {
    gapi.signin2.render('my-signin2',
        {
            'scope': 'profile email',
            'width': 300,
            'height': 50,
            'longtitle': false,
            'theme': 'dark',
            'onsuccess': onSuccess,
            'onfailure': onFailure
        }
    );
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
      location.reload();
    });
}

/****************************************************************
 *                        Facebook Login                        *
 * *************************************************************/

window.fbAsyncInit = function() {
    FB.init(
        {
            appId      : '189934098398018',
            cookie     : true,
            xfbml      : true,
            version    : 'v2.12'
        }
    );

    FB.AppEvents.logPageView();
};

(function(d, s, id){
var js, fjs = d.getElementsByTagName(s)[0];
if (d.getElementById(id)) {return;}
js = d.createElement(s); js.id = id;
js.src = "https://connect.facebook.net/en_US/sdk.js";
fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}

/****************************************************************
 *                        Load Fuctions                         *
 * *************************************************************/

// window.onload = function() {
//     user_id = get_id();
//     get_user_info(user_id);
//     if (user_id) {
//         document.getElementById("predictions").href += '?&id=' + user_id;
//         document.getElementById("leaderboard").href += '?&id=' + user_id;
//         document.getElementById("schedule").href += '?&id=' + user_id;
//     }

//     if (document.title == "Schedule") {
//         get_schedule(user_id);
//     } else if (document.title == "My Predictions") {
//         get_my_predictions(user_id);
//     } else if (document.title == "Leaderboard") {
//         get_leaderboard();
//     } else if (document.title.includes("Game")) {
//         var url = new URL(window.location.href);
//         var game_num = url.searchParams.get("n");
//         document.getElementById('game_title').innerHTML = "Game " + game_num;
//         document.title = "Game " + game_num;
//         get_game(user_id, game_num);
//     }
// }

function get_id() {
    var url = new URL(window.location.href);
    return url.searchParams.get("id");
}

/****************************************************************
 *                            Constants                         *
 * *************************************************************/

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];