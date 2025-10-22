fetch("http://localhost:5678/api/works").then(res => {
    console.log(res)
    if (!res.ok){
        document.querySelector(".gallery").innerHTML="Erreur de connexion"
        return 
    }
    res.json().then(data => {
    console.log(data)
    document.querySelector(".gallery").innerHTML=""
    data.forEach(work => {
        const travaux = document.querySelector(".gallery").innerHTML+=`
        	<figure>
				<img src="${work.imageUrl}" alt="Abajour Tahina">
				<figcaption>${work.title}</figcaption>
			</figure>
        `
    });
})
})

// Boutons filtres //

const boutonTous = document.querySelector(".btn-tous")
boutonTous.addEventListener("click", function () {
    const travauxFiltres = travaux.filter(function (travaux) {
        return travaux.categoryId
    })
    console.log(travauxFiltres)
})

const boutonObjets = document.querySelector(".btn-objets")
boutonTous.addEventListener("click", function () {
    const travauxFiltres = travaux.filter(function (travaux) {
        return travaux.categoryId
    })
    console.log(travauxFiltres)
})

const boutonAppartements = document.querySelector(".btn-appartements")
boutonTous.addEventListener("click", function () {
    const travauxFiltres = travaux.filter(function (travaux) {
        return travaux.categoryId
    })
    console.log(travauxFiltres)
})

const boutonHotelsRestaurants = document.querySelector(".btn-hotels&restaurants")
boutonTous.addEventListener("click", function () {
    const travauxFiltres = travaux.filter(function (travaux) {
        return travaux.categoryId
    })
    console.log(travauxFiltres)
})