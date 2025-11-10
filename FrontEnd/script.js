fetch("http://localhost:5678/api/works").then((res) => {
	if (!res.ok) {
		document.querySelector(".gallery").textContent = "Erreur de connexion"
		return
	}
	res.json().then((data) => {
		console.log(data)
		document.querySelector(".gallery").textContent = ""
		data.forEach((work) => {
			const figure = document.createElement("figure")
            const figcaption = document.createElement("figcaption")
            const image = document.createElement("img")

            image.src = work.imageUrl
            image.alt = work.title
            figcaption.textContent = work.title
            figure.appendChild(image.cloneNode())
            figure.appendChild(figcaption)
            figure.setAttribute("data-categoryId", work.categoryId)
            figure.setAttribute("data-id", work.id)
            document.querySelector(".gallery").appendChild(figure)
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

//Apparition de la modale "Galerie photo"//
document.querySelector(".btn-modifier").addEventListener("click", () => {
	document.querySelector(".modal-container").classList.add("show")
})

//Fermeture de la modale "Galerie photo"//
document.querySelector(".close-btn").addEventListener("click", () => {
	document.querySelector(".modal-container").classList.remove("show")
})

const modal = document.querySelector(".modal-container")

modal.addEventListener("click", (e) => {
	if (e.target ===modal){
		modal.classList.remove("show")
	}
})

//Récupération des travaux à partir de l'API pour la modale "Galerie photo"//
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
		//Option de suppression des travaux sur la modale "Galerie photo"//
			document.querySelectorAll(".delete-btn").forEach((btn) => {
      		btn.addEventListener("click", (e) => {
        	e.preventDefault();
        	const id = btn.dataset.id;

        	//Confirmation avant suppression//
       		 if (!confirm("Supprimer cette image ?")) return;

        	deleteWork(id);
      		});
		})
	})
})

//Fonction de suppresion de travaux//
function deleteWork(id) {
  fetch(`http://localhost:5678/api/works/${id}`, {
    method: "DELETE",
    headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`,},
  })
    .then((res) => {
      if (res.ok) {
        //Supprimer l'élément du DOM//
        const figure = document.querySelector(`figure[data-id="${id}"]`);
		const buttonModale = document.querySelector([`button[data-id="${id}"]`])
        if (figure) figure.remove();
		if (buttonModale) buttonModale.parentElement.remove()
        console.log(`Image ${id} supprimée`);
      } else {
        alert("Erreur lors de la suppression de l’image.");
      }
    })
}

//Apparition du bouton modfier sur index.html après connexion//
window.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  if (token) {
    const modifier = document.querySelector(".btn-modifier");
    console.log(modifier)
    modifier.style.display = "flex";
}
});

//Apparition de la modale "Ajout photo" avec fermeture de la modale "Galerie photo"//
document.querySelector(".add-photo-btn").addEventListener("click", () => {
	document.querySelector(".modal-container-ajout").classList.add("show")
	document.querySelector(".modal-container").classList.remove("show")
})

//Fermeture de la modale "Ajout photo"//
document.querySelector(".close-btn").addEventListener("click", () => {
	document.querySelector(".modal-container-ajout").classList.remove("show")
})

const modalAjout = document.querySelector(".modal-container-ajout")

modalAjout.addEventListener("click", (e) => {
	if (e.target ===modalAjout){
		modalAjout.classList.remove("show")
	}
})

//Passage de la modale "Ajout photo" à la modale "Galerie photo" (Bouton précedent)//
document.getElementById("backModal").addEventListener("click", () => {
	document.querySelector(".modal-container-ajout").classList.remove("show")
	document.querySelector(".modal-container").classList.add("show")
})

//Récupération des catégories pour les options de "select"//
fetch("http://localhost:5678/api/categories").then((res) => {
    if (!res.ok) {
        console.error("Erreur de connexion aux catégories")
        return
    }
    res.json().then((data) => {
        console.log(data)
        data.forEach((category) => {
            const option = document.createElement("option")
            option.value = category.name
            option.textContent = category.name
            document.querySelector("#category").appendChild(option)
        })
    })
})