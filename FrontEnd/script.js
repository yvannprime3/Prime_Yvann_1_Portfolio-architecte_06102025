//Stockage de tous les travaux//
let works = []

//Fonctions d'affichage des travaux//
function displayWorks(list) {
    const gallery = document.querySelector(".gallery")
    gallery.innerHTML = ""

    list.forEach((work) => {
        const figure = document.createElement("figure")
        const figcaption = document.createElement("figcaption")
        const image = document.createElement("img")

        image.src = work.imageUrl
        image.alt = work.title
        figcaption.textContent = work.title

        figure.appendChild(image)
        figure.appendChild(figcaption)

        figure.dataset.categoryId = work.categoryId
        figure.dataset.id = work.id

        gallery.appendChild(figure)
    })
}

//Fonction de filtrage des travaux//
function filterWorks(categoryId) {
    if (categoryId === 0) {
        displayWorks(works)
    } else {
        const filtered = works.filter(work => work.categoryId === categoryId)
        displayWorks(filtered)
    }
}

//Fonctions de génération des filtres//
function generateFilters(categories) {
    const filtersContainer = document.querySelector(".filtres")

    //Création du bouton "Tous"//
    const btnAll = document.createElement("button")
    btnAll.textContent = "Tous"
    btnAll.classList.add("btn-filter", "active")
    btnAll.dataset.id = 0
    filtersContainer.appendChild(btnAll)

    //Récupération des catégories à partir de l'API pour la création des filtres//
    categories.forEach((category) => {
        const button = document.createElement("button")
        button.textContent = category.name
        button.classList.add("btn-filter")
        button.dataset.id = category.id

        filtersContainer.appendChild(button)
    })

    //Filtrage + bouton actif//
    filtersContainer.addEventListener("click", (e) => {
        if (e.target.tagName !== "BUTTON") return

        document.querySelectorAll(".btn-filter").forEach(btn =>
            btn.classList.remove("active")
        )

        e.target.classList.add("active")

        const categoryId = Number(e.target.dataset.id)
        filterWorks(categoryId)
    })
}

//Récupération des catégories avec la fonction de génération des filtres//
fetch("http://localhost:5678/api/categories")
    .then(res => {
        if (!res.ok) {
            console.error("Erreur de connexion aux catégories")
            return
        }
        return res.json()
    })
    .then(categories => {
        generateFilters(categories)
    })
    .catch(err => console.error(err))

//Récupération des travaux avec la fonction d'affichage des travaux//
fetch("http://localhost:5678/api/works")
    .then(res => {
        if (!res.ok) {
            document.querySelector(".gallery").textContent = "Erreur de connexion"
            return
        }
        return res.json()
    })
    .then(data => {
        works = data
        displayWorks(works)
    })
    .catch(err => console.error(err))

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
		document.querySelector(".gallery-modal").textContent = "Erreur de connexion"
		return
	}
	res.json().then((data) => {
    console.log(data)
    const galleryModal = document.querySelector(".gallery-modal")
    galleryModal.textContent = ""

    data.forEach((work) => {
        const figure = document.createElement("figure")
        const img = document.createElement("img")
        const deleteBtn = document.createElement("button")
        const icon = document.createElement("i")

        figure.dataset.categoryId = work.categoryId
        figure.dataset.id = work.id

        img.src = work.imageUrl
        img.alt = work.title

        deleteBtn.classList.add("delete-btn")
        deleteBtn.dataset.id = work.id
        deleteBtn.title = "Supprimer"

        icon.classList.add("fa-solid", "fa-trash-can")
        deleteBtn.appendChild(icon)

        figure.appendChild(img)
        figure.appendChild(deleteBtn)
        galleryModal.appendChild(figure)

        //Listener de la suppresion au click//
        deleteBtn.addEventListener("click", (e) => {
            e.preventDefault()
            if (confirm("Supprimer cette image ?")) {
                deleteWork(work.id)
            }
          })
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
        const figure = document.querySelector(`figure[data-id="${id}"]`)
		const buttonModale = document.querySelector([`button[data-id="${id}"]`])
        if (figure) figure.remove()
		if (buttonModale) buttonModale.parentElement.remove()
        console.log(`Image ${id} supprimée`)
      } else {
        alert("Erreur lors de la suppression de l'image.")
      }
    })
}

//Apparition du bouton modfier/bandeau edition/bouton logout(déconnexion) sur index.html après connexion//
window.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token")
  const loginLink = document.querySelector(".login")
  
  if (token) {
    const filtres = document.querySelector(".filtres")
    filtres.style.display = "none"
    const modifier = document.querySelector(".btn-modifier")
    modifier.style.display = "flex"
    const edition = document.querySelector(".edition")
    edition.style.display = "flex"
    loginLink.textContent = "logout"
    loginLink.href = "#"
    loginLink.addEventListener("click", (e) => {
      e.preventDefault()
      localStorage.removeItem("token")
      location.reload()
      })
    }
  })


//Apparition de la modale "Ajout photo" avec fermeture de la modale "Galerie photo"//
document.querySelector(".add-photo-btn").addEventListener("click", () => {
	document.querySelector(".modal-container-ajout").classList.add("show")
	document.querySelector(".modal-container").classList.remove("show")
})

//Fermeture de la modale "Ajout photo"//
document.querySelector(".close-btn-ajout").addEventListener("click", () => {
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
            option.value = category.id
            option.textContent = category.name
            document.querySelector("#category").appendChild(option)
        })
    })
})

//Validation du formulaire//
const addForm = document.getElementById("addForm")
const submit = document.getElementById("submit")
const title = document.getElementById("title")
const fileInput = document.getElementById("file")
const category = document.getElementById("category")
const fileContainer = document.querySelector(".file-container")

//Fonction qui vérifie que le formulaire est bien rempli//
function checkForm() {
  const isValid = title.value.trim() !== "" && fileInput.files.length > 0 && category.value.trim() !== ""
  submit.disabled = !isValid
}

addForm.addEventListener("input", checkForm)
addForm.addEventListener("change", checkForm)

//Soumission du formulaire//
addForm.addEventListener("submit", async (e) => {
  e.preventDefault()

  if (title.value.length < 2) {
    alert("Veuillez saisir au moins 2 caractères")
    return
  }
  if (fileInput.files.length === 0) {
    alert("Veuillez sélectionner une image")
    return
  }
  if (category.value.trim() === "") {
    alert("Veuillez sélectionner une catégorie")
    return
  }

  //Récupère le formulaire pour l'ajout de travaux//
  const formData = new FormData()
  formData.append("image", fileInput.files[0])
  formData.append("title", title.value.trim())
  formData.append("category", parseInt(category.value, 10))

  await addWork(formData)

  //Vide le formulaire après l'événement submit//
  addForm.reset()
  submit.disabled = true
  removePreview()
  showContainer()

  //Ferme la modale d’ajout après l'événement "submit"//
  document.querySelector(".modal-container-ajout").classList.remove("show")
})

//Fonction d’ajout du travail à l’API//
async function addWork(formData) {
  try {
    const token = localStorage.getItem("token")
    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: { "Authorization": `Bearer ${token}` },
      body: formData,
    })

    if (!response.ok) {
      alert("Erreur lors de l'ajout du projet : " + response.status)
      return
    }

    const newWork = await response.json()
    console.log("Projet ajouté :", newWork)

    //Ajoute à la galerie principale//
    const gallery = document.querySelector(".gallery")
    const figure = document.createElement("figure")
    figure.dataset.id = newWork.id
    figure.dataset.categoryId = newWork.categoryId

    const img = document.createElement("img")
    img.src = newWork.imageUrl
    img.alt = newWork.title

    const figcaption = document.createElement("figcaption")
    figcaption.textContent = newWork.title

    figure.appendChild(img)
    figure.appendChild(figcaption)
    gallery.appendChild(figure)

    //Ajoute à la galerie modale//
    const galleryModal = document.querySelector(".gallery-modal")
    const figureModal = document.createElement("figure")
    figureModal.dataset.id = newWork.id
    figureModal.innerHTML = `
      <img src="${newWork.imageUrl}" alt="${newWork.title}">
      <button class="delete-btn" data-id="${newWork.id}" title="Supprimer">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    `
    galleryModal.appendChild(figureModal)

    //Réattache le listener du bouton de suppression pour ce nouvel élément//
    figureModal.querySelector(".delete-btn").addEventListener("click", () => {
      if (confirm("Supprimer cette image ?")) {
        deleteWork(newWork.id)
      }
    });
  } catch (error) {
    console.error("Erreur :", error)
    alert("Une erreur est survenue lors de l'ajout du projet.")
  }
}

//Fonction de prévisualisation d’image//
fileInput.addEventListener("change", function () {
  const file = this.files[0]
  if (!file) return;

  const allowedTypes = ["image/jpeg", "image/png"]
  const maxSize = 4 * 1024 * 1024

  if (!allowedTypes.includes(file.type)) {
    alert("Veuillez choisir une image au format JPG ou PNG")
    this.value = ""
    return
  }

  if (file.size > maxSize) {
    alert("L'image ne doit pas dépasser 4 Mo")
    this.value = ""
    return
  }

  //Crée un aperçu de l'image//
  const reader = new FileReader()
  reader.onload = function (e) {
    removePreview()

    const img = document.createElement("img")
    img.src = e.target.result
    img.alt = "Prévisualisation"
    img.classList.add("preview-image")

    fileContainer.appendChild(img)
    hideContainer()
    checkForm()
  }
  reader.readAsDataURL(file)
})

//Fonction de changement de prévisualisation d'image//
function removePreview() {
  const oldPreview = fileContainer.querySelector(".preview-image")
  if (oldPreview) oldPreview.remove()
  showContainer()
}

//Fonction de cacher le contenu du label de input type="file"//
function hideContainer() {
  fileContainer.querySelector("svg").style.display = "none"
  fileContainer.querySelector("#label-file").style.display = "none"
  fileContainer.querySelector("span").style.display = "none"
}

//Fonction de montrer le contenu du label de input type="file"//
function showContainer() {
  fileContainer.querySelector("svg").style.display = ""
  fileContainer.querySelector("#label-file").style.display = ""
  fileContainer.querySelector("span").style.display = ""
}