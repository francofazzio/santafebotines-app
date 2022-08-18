async function render(logStatus) {
    const response = await fetch('./root.ejs')
    const plantilla = await response.text()
    console.log(plantilla)
    const html = ejs.render(plantilla, { user: logStatus.user })
    document.getElementById("root").innerHTML = html

    if (logStatus.status === 401) {
        let formulario = document.getElementById("formularioLog")
        let userName = document.getElementById("userName")

        formulario.addEventListener("submit", (e) => {
            e.preventDefault()
            let name = userName.value
            fetch(`/login?username=${name}`)
            .then(res => res.json)
            .then(res =>{
                if(res.status === "ok"){
                    window.location.reload()
                }else{
                    console.log("error a abrir")
                }
            })
        })
        return
    }

    const saludo = document.getElementById("usuarioLog")
    saludo.style.visibility = "visible";
    saludo.innerHTML = `<h3>${logStatus.user}</h3>`
    const botonLogOut = document.createElement("button")
    botonLogOut.id = "logOut"
    botonLogOut.innerText = `logOut`
    saludo.appendChild(botonLogOut)

    const saludoTime = setTimeout(()=>{
        saludo.innerHTML = ``;
        saludo.style.visibility = "hidden"
    },500000)

    const logOut = document.getElementById("logOut")
    logOut.addEventListener("click",(e)=>{
        e.preventDefault()
        fetch("/logout")
        .then(e=>e.json())
        .then(res =>{
            if(res.status === "ok"){
                clearTimeout(saludoTime)
                saludo.style.visibility = "visible";
                saludo.innerHTML = `<h3>Hasta Luego</h3>`
                setTimeout(()=>{
                    window.location.reload()
                },2000)
            }else{
                console.log("error en cerrar")
            }
        })
    })
}

async function initial () {
    try {
        const logged = await fetch("/logged")
        const logStatus = await logged.json()
        console.log(logStatus)

        await render(logStatus);

        if (logStatus.status === 401) {
            return
        }
    } catch (e) {
        console.log("error fetching login: ", e)
    }
}

initial()