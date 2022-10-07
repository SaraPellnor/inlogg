//Skapade konstanter i JS
const logInBtn = document.querySelector (".logIn");
const logOutBtn = document.querySelector (".logOut");
const h1 = document.querySelector ("h1");
const obs = document.querySelector (".obs");
const paragraph = document.createElement ("p");
const loginForm = document.querySelector (".loginForm");
const newForm = document.querySelector (".newForm");
const username = document.querySelector (".username"); 
const password = document.querySelector (".password");
const newUserName = document.querySelector (".newUserName");
const newPassword = document.querySelector (".newPassword");
const makeUserBtn = document.querySelector (".makeUser");
const confirmNewUser = document.querySelector (".confirmNewUser");
const video = document.querySelector ("video");

//Inloggningskontroll//
function init() { //döpt funktionen till init
    if (localStorage.getItem ("user")){ //kollar om användare är inloggad
        success();//hämtar inloggsprofil
    }
}

init(); //kör funktionen init


//Min array på godkända användare
const users = [

    {
        username: "sara",
        password: "11111"
    },

    {
        username: "fredrik",
        password: "12345"
    },

    {
        username: "sam",
        password: "33333"
    }

];

if (!localStorage.getItem("users")){ //om nyckeln "users" inte finns,
localStorage.setItem("users", JSON.stringify (users)); //Sparas arrayen i LS i nyckeln: "users"
}

//lyssnar på "ny användare-knappen"
makeUserBtn.addEventListener("click", createNewUser);


//Funktionen "skapa ny användare"
function createNewUser () {
    const x = newUserName.value; //x är värdet i username
    if (x.length > 0){ // om värdet ha innehåll-
        const usersList = JSON.parse (localStorage.getItem ("users")); //spara ner arrayen till JS i "usersList" för att lägga till användare i lisan
        usersList.push ({username: newUserName.value, password: newPassword.value}); //pusha in ny användare och lösenord i listan
        localStorage.setItem("users", JSON.stringify (usersList)); //skriv över informationen i nyckeln: "users" och skickar upp till LS igen.
        confirmNewUser.innerHTML = "Nu har du skapat en ny användare, nu kan du logga in!";
    } else { //annars skicka ut ett meddelande
        confirmNewUser.innerHTML = "Du måste ange nytt namn och lösenord..";
    }
}


//logg in-knappen startar funktionen "logInFunction"
logInBtn.addEventListener("click", logInFunction);



//Funktionen "logga in användare"
function logInFunction () {

    //hämtar listan med användare i

    const usersList = JSON.parse (localStorage.getItem ("users"));

    for (const i of usersList) {
        if (username.value == i.username && password.value == i.password){
            localStorage.setItem ("user", JSON.stringify (username.value));
            success ();
            return; 
        }
        paragraph.innerHTML = "Användarnamn eller lösenord finns inte. Skapa en ny användare eller försök igen";
        obs.appendChild(paragraph);
        paragraph.style.color = "red";

    }
}

function success () {
    
    h1.innerHTML = "Välkommen " + JSON.parse (localStorage.getItem ("user"));
    logInBtn.style.display = "none";
    logOutBtn.style.display = "block";
    loginForm.style.display = "none";
    paragraph.style.display = "none"; 
    newForm.style.display = "none"; 
    video.style.display = "block";//cool bild från internet 
}

logOutBtn.addEventListener("click", leave);


function leave () {

    h1.innerHTML = "Hej då " + JSON.parse (localStorage.getItem ("user"));
    h1.style.color = "pink";
    h1.style.fontSize = "500%";
    logInBtn.style.display = "block";
    logOutBtn.style.display = "none";
    loginForm.style.display = "block";
    paragraph.style.display = "none";
    newForm.style.display = "block";
    localStorage.removeItem ("user");
    video.style.display = "none";
    confirmNewUser.innerHTML = "";
}
