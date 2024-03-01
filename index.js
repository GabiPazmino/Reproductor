const userInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBoton = document.getElementById("loginbtn");


const users = [
    {username: "gabi",
    password: "gabi"},
    {username: "simone",
    password: "simone"}
]


loginBoton.addEventListener("click", (event) =>{
    event.preventDefault();
    
    let userValue = userInput.value;
    let passwordValue = passwordInput.value;

    let logged=false;
    users.forEach(user => {
        if(user.username == userValue && user.password == passwordValue){
            logged =true;
        }
    });

    if(logged){
        alert("Logged in");
    }else{
        alert("Wrong credentials");
    }
})
