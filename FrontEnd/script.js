fetch("http://localhost:5678/api/works").then((res) => {
	console.log(res)
	if (!res.ok) {
		document.querySelector(".gallery").innerHTML = "Erreur de connexion"
		return
	}
	res.json().then((data) => {
		// console.log(data)
		document.querySelector(".gallery").innerHTML = ""
		data.forEach((work) => {
			const travaux = (document.querySelector(".gallery").innerHTML += `
            <figure>
            <img src="${work.imageUrl}" alt="Abajour Tahina">
            <figcaption>${work.title}</figcaption>
            </figure>
            `)
		})

		// ajouter un event listener sur les boutons
		const boutonTous = document.querySelector(".btn-tous")
		const boutonObjets = document.querySelector(".btn-objets")
		const boutonAppartements = document.querySelector(".btn-appartements")
		const boutonHotelsRestaurants = document.querySelector(
			".btn-hotelsRestaurants"
		)

		boutonTous.addEventListener("click", function () {
			console.log("click tous")
		})

		boutonObjets.addEventListener("click", function () {
			console.log("click objets")
		})

		boutonAppartements.addEventListener("click", function () {
			console.log("click appartements")
		})

		boutonHotelsRestaurants.addEventListener("click", function () {
			console.log("click hotelsRestaurants")
		})
	})
})

// Boutons filtres //

// boutonTous.addEventListener("click", function () {
// 	const travauxFiltres = travaux.filter(function (travaux) {
// 		return travaux.categoryId
// 	})
// 	console.log(travauxFiltres)
// })

// boutonTous.addEventListener("click", function () {
// 	const travauxFiltres = travaux.filter(function (travaux) {
// 		return travaux.categoryId
// 	})
// 	console.log(travauxFiltres)
// })

// boutonTous.addEventListener("click", function () {
// 	const travauxFiltres = travaux.filter(function (travaux) {
// 		return travaux.categoryId
// 	})
// 	console.log(travauxFiltres)
// })

// boutonTous.addEventListener("click", function () {
// 	const travauxFiltres = travaux.filter(function (travaux) {
// 		return travaux.categoryId
// 	})
// 	console.log(travauxFiltres)
// })
