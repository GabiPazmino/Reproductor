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

    const user = users.find(user => user.username == userValue && user.password == passwordValue);
    
    if(user){
        localStorage.setItem("isLogged", true);
        window.location.href = "home.html";
    }else{
        alert("Wrong credentials");
    }
})
