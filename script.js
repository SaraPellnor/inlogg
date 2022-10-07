//Skapade konstanter i JS
const logInBtn = document.querySelector (".logIn");
const logOutBtn = document.querySelector (".logOut");
const makeUserBtn = document.querySelector (".makeUser");
const h1 = document.querySelector ("h1");
const obs = document.querySelector (".obs");
const paragraph = document.createElement ("p");
const loginForm = document.querySelector (".loginForm");
const newForm = document.querySelector (".newForm");
const username = document.querySelector (".username"); 
const password = document.querySelector (".password");
const newUserName = document.querySelector (".newUserName");
const newPassword = document.querySelector (".newPassword");
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



//Funktionen "skapa ny användare"
function createNewUser () {
    const x = newUserName.value; //x är värdet i username
    if (x.length > 0){ // om värdet ha innehåll-
        const usersList = JSON.parse (localStorage.getItem ("users")); //spara ner arrayen till JS i "usersList" för att lägga till användare i lisan
        usersList.push ({username: newUserName.value, password: newPassword.value}); //pusha in ny användare och lösenord i listan
        localStorage.setItem("users", JSON.stringify (usersList)); //skriv över informationen i nyckeln: "users" och skickar upp till LS igen.
        confirmNewUser.innerHTML = "Nu har du skapat en ny användare, nu kan du logga in!"; //visar ett meddelande if
    } else { //else skicka ut ett meddelande
        confirmNewUser.innerHTML = "Du måste ange nytt namn och lösenord..";
    }
}



//hämtar knapparna med klickfunktion
logInBtn.addEventListener("click", logInFunction);
logOutBtn.addEventListener("click", leave);
makeUserBtn.addEventListener("click", createNewUser);




//Funktionen "logga in användare"
function logInFunction () {
    const usersList = JSON.parse (localStorage.getItem ("users")); //hämtar listan med användare i
    for (const i of usersList) { //loop som går igenom usersList med med constanten "i".
        if (username.value == i.username && password.value == i.password){ //om i hittar rätt
            localStorage.setItem ("user", JSON.stringify (username.value)); //skickar upp user till LS
            success (); //kör funktionen success
            return; //avbryter loopen
        } //visar felmeddelande i diven .obs och paragrafen ändrar färg till röd.
        paragraph.innerHTML = "Användarnamn eller lösenord finns inte. Skapa en ny användare eller försök igen";
        obs.appendChild(paragraph);
        paragraph.style.color = "red";
    }
}



//funktionen godkänd inloggning
function success () {
    h1.innerHTML = "Välkommen " + JSON.parse (localStorage.getItem ("user")); //hämtar användarnamnet från LS och lägger in det i välkomstexten. 
    h1.style.color = "none"; //ändrar tillbaka färgen till standard
    logInBtn.style.display = "none"; //gömmer logginknappen
    logOutBtn.style.display = "block";//visar loggutknappen
    loginForm.style.display = "none";//gömmer logginformuläret
    paragraph.style.display = "none"; //gömmer paragrafen
    newForm.style.display = "none"; //gömmer nya-nvändare-formuläret
    video.style.display = "block";//cool bild från internet 
}




//loggautfunktionen
function leave () { 
    h1.innerHTML = "Hej då " + JSON.parse (localStorage.getItem ("user")); //ändrar h1 till hej då "användare"
    h1.style.color = "pink"; //gör om texten till rosa
    h1.style.fontSize = "500%"; //gör bokstäverna större
    logInBtn.style.display = "block"; //visar logginknappen igen
    logOutBtn.style.display = "none"; //döljer loggutknappen
    loginForm.style.display = "block"; //logginformuläret visas
    paragraph.style.display = "none"; //paragrafen försvinner
    newForm.style.display = "block"; //skapa ny användar-formuläret visas
    localStorage.removeItem ("user"); //tar bort användaren från LS
    video.style.display = "none"; //videon visas inte
    confirmNewUser.innerHTML = "none"; //tar bort "bekräftelsetexten" på ny användare
}
