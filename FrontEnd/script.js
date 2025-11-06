fetch("http://localhost:5678/api/works").then((res) => {
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
		const travailRamener = document
			.querySelector(".gallery")
			.querySelectorAll("figure")

		// select les boutons filtres
		// attendre la reponse de la requete fetch
		const boutonTous = document.querySelector(".btn-tous")
		const boutonObjets = document.querySelector(".btn-objets")
		const boutonAppartements = document.querySelector(".btn-appartements")
		const boutonHotelsRestaurants = document.querySelector(".btn-hotelsRestaurants")
		// Boutons filtres //

		boutonTous.addEventListener("click", () => filtrer(travailRamener, 0))
		boutonObjets.addEventListener("click", () => filtrer(travailRamener, 1))
		boutonAppartements.addEventListener("click", () => filtrer(travailRamener, 2))
		boutonHotelsRestaurants.addEventListener("click", () => filtrer(travailRamener, 3))
	})
})

const filtrer = (travailArray, filterNo) => {
	console.log(travailArray, filterNo)
	// afficher tous les travaux

	if (filterNo === 0) {
		travailArray.forEach((figure) => {
			figure.style.display = "block"
		})
	}
	if (filterNo === 1) {
		// afficher tous les travaux
		document.querySelector(".gallery").querySelectorAll("figure").forEach((figure) => {
				figure.style.display = "block"
			})
		travailArray.forEach((figure) => {
			if (parseInt(figure.getAttribute("data-categoryId")) !== 1) {
				figure.style.display = "none"
			}
		})
	}
	if (filterNo === 2) {
		// afficher tous les travaux
		document.querySelector(".gallery").querySelectorAll("figure").forEach((figure) => {
				figure.style.display = "block"
			})
		travailArray.forEach((figure) => {
			if (parseInt(figure.getAttribute("data-categoryId")) !== 2) {
				figure.style.display = "none"
			}
		})
	}
	if (filterNo === 3) {
		// afficher tous les travaux

		document.querySelector(".gallery").querySelectorAll("figure").forEach((figure) => {
				figure.style.display = "block"
			})
		travailArray.forEach((figure) => {
			if (parseInt(figure.getAttribute("data-categoryId")) !== 3) {
				figure.style.display = "none"
			}
		})
	}
}

  const buttons = document.querySelectorAll("button");

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
	});
});

document.querySelector(".btn-modifier").addEventListener("click", () => {
	document.querySelector(".modal-container").classList.add("show")
})

document.querySelector(".close-btn").addEventListener("click", () => {
	document.querySelector(".modal-container").classList.remove("show")
})

const modal = document.querySelector(".modal-container")

modal.addEventListener("click", (e) => {
	if (e.target ===modal){
		modal.classList.remove("show")
	}
})

fetch("http://localhost:5678/api/works").then((res) => {
	if (!res.ok) {
		document.querySelector(".gallery-modal").innerHTML = "Erreur de connexion"
		return
	}
	res.json().then((data) => {
		console.log(data)
		document.querySelector(".gallery-modal").innerHTML = ""
		data.forEach((work) => {
			document.querySelector(".gallery-modal").innerHTML += `
        	<figure data-categoryId=${work.categoryId}  >
				<img src="${work.imageUrl}" alt="Abajour Tahina">
				<button class="delete-btn" data-id="${work.id}" title="Supprimer">
              	<i class="fa-solid fa-trash-can"></i>
            	</button>
			</figure>
        `
		})
			document.querySelectorAll(".delete-btn").forEach((btn) => {
      		btn.addEventListener("click", (e) => {
        	e.preventDefault();
        	const id = btn.dataset.id;

        	// Confirmation avant suppression
       		 if (!confirm("Supprimer cette image ?")) return;

        	deleteWork(id);
      		});
		})
	})
})