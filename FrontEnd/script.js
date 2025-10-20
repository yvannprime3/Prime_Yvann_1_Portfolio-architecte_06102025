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
        document.querySelector(".gallery").innerHTML+=`
        	<figure>
				<img src="${work.imageUrl}" alt="Abajour Tahina">
				<figcaption>${work.title}</figcaption>
			</figure>
        `
    });
})
})