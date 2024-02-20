//Asíncrona
//Esperar s que se ejecute por completo una istrucción, sin obstruir
//el hilo de procesos.

//Formas de manejar la asincronía:
/*
*1. Callbacks -> Desuso!!!
*2. Promesas
*3. Async / Await -> La mejor opción
*/ 

//CALLBACKS
/*function getUserWithCallbacks(callbacks){
    fetch('https://randomuser.me/api/') //Consulta a un Edpoint
        .then(response => response.json())//Traducir a enternder JSON
        .then(data => { 
            const {results} = data;//Desustructurar un objeto
            callbacks(null, results)//1.Error /2.Respuesta

        })
        .catch(error =>{ 
            console.error(error)
            callbacks(error, null)
        })
}

getUserWithCallbacks((error, results)=>{
    if(error) console.error(error)
    const name = document.getElementById('name')
    const surname = document.getElementById('surname')
    const phone = document.getElementById('phone')
    for (const user of results) {
        name.innerText = user.name.first
        surname.innerText = user.name.last
        phone.innerText = user.phone
    }
})*/

//PROMESAS 
/*const getUserWithPromise = () => {
    return new Promise((resolve, reject) => {
        fetch('https://randomuser.me/api/')
        .then(response => response.json())
        .then(data => {
            const {results} = data
            resolve(results)
        })
        .catch(error => reject(error))
    })
}

getUserWithPromise()
    .then(results =>{
        const name = document.getElementById('name')
        const surname = document.getElementById('surname')
        const phone = document.getElementById('phone')
        for (const user of results) {
            name.innerText = user.name.first
            surname.innerText = user.name.last
            phone.innerText = user.phone
        }
    })
    .catch(error => console.error(error))*/
//ASYNC /AWAIT
const getUserWithAsync = async () => {
    try{
        const response = await fetch('https://randomuser.me/api/?results=10')//automaticamente lo guardad en la constante
        const {results} = await response.json()//destructuro y lo parseo
        const users = document.getElementById('users')
        for (const user of results) {
            users.innerHTML += `
            <tr>
                <td>${user.name.first}</td>
                <td>${user.name.last}</td>
                <td>${user.phone}</td>
            </tr>
            `
        }
    }catch(error){  
        console.error(error)
    }
}

getUserWithAsync()