

const imageProfile =document.querySelector("#img-profile")
const githubName = document.querySelector("#github-name")
const githubUsername = document.querySelector("#github-username")
const githubBio = document.querySelector("#github-bio")
const githubRepo = document.querySelector("#github-repos")
const githubFollowers = document.querySelector("#github-followers")



const githubActionSearch = document.querySelector("#github-action-search");
const githubInputSearch= document.querySelector("#github-search");


githubActionSearch.onclick =()=>{
    const username = githubInputSearch.value;
    githubInputSearch.value ="";
  
    if (username === ""){
        Swal.fire({
            tittle:"Error",
            text: "Debe LLenar el campo",
            icon: "error",
        });
        return;
    }


    obtenerDatosGithub(username);
};


//vamos a detectar el evento con o cuando demos enter  pero estando en l input


githubInputSearch.addEventListener("keyup", function (event){
    if (event.key === "Enter"){
        obtenerDatosGithub(event.target.value)
    }
});


//el valo r de ususario que este por defecto sera valiudo cuando el username este vacio




const obtenerDatosGithub = async (username = "guillermosifu")=>{
    // en este ejempl await va hacer lo sgte
   // ejecuta fetch con la url y una vez que abre la ejecucion recien hara el console log luego 
    const response = await fetch (`https://api.github.com/users/${username}`)
  
    // esta varuiable me ayuda a convertir un texto plano a formato json el cual puedo leer
    const data = await response.json();


    if(data.message === "not found"){
        Swal.fire({
            tittle: "Error",
            text: "usuario no encontrado",
            icon: "Error",
        });
        return
    }


    setDataUser(data);
  
}


const formatDate = (fecha) =>{
    let date = new Date(fecha);
    return date.toISOString().split("T")[0];
};


const setDataUser=(data)=>{
    imageProfile.src = data.avatar_url;
    githubName.innerHTML = data.name;
    githubUsername.innerHTML=`@${data.login}`;
    githubBio.innerHTML = data.bio;
    githubRepo.innerHTML= data.public_repos;
    githubFollowers.innerHTML = data.followers;




};




obtenerDatosGithub()
