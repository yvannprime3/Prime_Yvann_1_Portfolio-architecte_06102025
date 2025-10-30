fetch("http://localhost:5678/api/works").then((res) => {
	// console.log(res)
	if (!res.ok) {
		document.querySelector(".gallery").innerHTML = "Erreur de connexion"
		return
	}
	res.json().then((data) => {
		console.log(data)
		document.querySelector(".gallery").innerHTML = ""
		data.forEach((work) => {
			document.querySelector(".gallery").innerHTML += `
        	<figure data-categoryId=${work.categoryId}  >
				<img src="${work.imageUrl}" alt="Abajour Tahina">
				<figcaption>${work.title}</figcaption>
			</figure>
        `
		})
		// console.log(document.querySelector(".gallery").querySelectorAll("figure"))
		const travailRamener = document.querySelector(".gallery").querySelectorAll("figure")

		// select les boutons filtres
		// attendre la reponse de la requete fetch
		const boutonTous = document.querySelector(".btn-tous")
		const boutonObjets = document.querySelector(".btn-objets")
		const boutonAppartements = document.querySelector(".btn-appartements")
		const boutonHotelsRestaurants = document.querySelector(".btn-hotelsRestaurants")
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

const boutonHotelsRestaurants = document.querySelector(".btn-hotelsRestaurants")
boutonTous.addEventListener("click", function () {
    const travauxFiltres = travaux.filter(function (travaux) {
        return travaux.categoryId
    })
    console.log(travauxFiltres)
})