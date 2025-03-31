let donnees = [];
let tablehtml=document.getElementById("tableau");
let edittest=0;

fetch('produits.json') /* On lance la requete en AJAX pour recuperer le fichier JSON*/
    .then(function(reponse) { /*Ensuite on attend la réponse de notre requete*/
    return reponse.json(); /*Si tout se passe bien on transforme data.json en objet js*/
    })

    .then(function(produits) { /*On stock ces données dans le tableai "données"*/
    donnees = produits;

    afficherList(); /*On execute la fonction afficher() - voir ci dessous-*/
  })
    .catch(function(error) { /* Si jamais la recuperation ne fonctionne pas */
    console.error("Erreur lors du chargement du fichier JSON :", error); /*message d'erreur*/
  });

/* SCRIPT */

let form=document.getElementById("form-utilisateur")

document.getElementById("add").addEventListener("click", function(){
    DisplayModal()
});

form.addEventListener("submit", function(e){
    e.preventDefault();
    AjouterData();
});

/* FUNCTIONS */

function afficherList(){
tablehtml.innerHTML = "";
    for (let i=0; i< donnees.length; i++){
        let tr_to_add=document.createElement("tr"); //creation d'une ligne
        let productEach=donnees[i];
        if (productEach.stock>0){ //pour le stock avec bouton rouge ou vert
            stockimage=document.createElement("img")
            stockimage.src="/assets/images/icons/green.png"
        }else{
            stockimage=document.createElement("img")
            stockimage.src="/assets/images/icons/red.png"
        }
        tr_to_add.innerHTML= `
            <td>${productEach.reference}</td>
            <td>${productEach.categorie}</td>
            <td>${productEach.libelle}</td>
            <td>${productEach.prix}</td>
            <td><img src=${stockimage.src}></td>
            <td><button class="view-btn" onclick="afficherProduct('${productEach.reference}')"><img src="assets/images/icons/eye.png"></button></td>
            <td><button class="edit-btn" onclick="edit('${productEach.reference}')"><img src="assets/images/icons/edit.png"></button></td>
            <td><button class="delete-btn" onclick="supprimer('${productEach.reference}')"><img src="assets/images/icons/trash.png"></button></td>
        `;
        tablehtml.appendChild(tr_to_add);
    }
}

function supprimer (reference){
    let nouveautableau=[]
    console.log(reference)
    for (let i=0; i<donnees.length; i++){
        if (donnees[i].reference !== reference){
            console.log(donnees[i].reference);
            nouveautableau.push(donnees[i]);
        }
    }
    donnees=nouveautableau;
    afficherList()
}

function afficherProduct(reference){
    let divDisplay=document.getElementById("modalAfficher")
    divDisplay.classList.remove("hiddenmodal");
    divDisplay.classList.add("modalsetup");
    for (let i=0; i<donnees.length; i++){
        let toDisplay=document.createElement("div")
        if (donnees[i].reference==reference){
            toDisplay.innerHTML=`
            <div class="container100">
                <div class="row">
                    <div class="col-1">
                        <!--colonne vide largeur 1-->
                    </div>
                    <div class="col-4">
                        <!--<img id="imgProduct" src="/asset/image/${donnees[i].photo}">-->
                    </div>
                    <div class="col-7">
                        <div class="row">
                            <div class="col-6">
                                <h1 id="h1">${donnees[i].libelle}</h1>
                            </div>
                            <div class="col-6 d-flex">
                                <img src="assets/images/icons/green.png">
                                <p id="Stock">En Stock</p>
                            </div>
                        </div>
                        <div class="row d-flex">
                            <p id="RefLine">Référence : ${donnees[i].reference}</p>
                            <p id="Price">${donnees[i].prix}</p>
                        </div>
                        <div>
                            <p id="categorieLine"> ${donnees[i].categorie}</p>
                        </div>
                        <div>
                            <p id="DescriptionLine">${donnees[i].description}</p>
                        </div>
                    </div>
                    <div class="col-1">
                        <!--colonne vide largeur 1-->
                    </div>
                </div>
                <div class="row">
                    <button class="back-btn" onclick="back()">Retour</button>
                </div>
            </div>
            `;
            divDisplay.appendChild(toDisplay);
        }
    }
}

function back(){
    document.getElementById("modalAfficher").classList.add("hiddenmodal")
    document.getElementById("modalAfficher").classList.remove("modalsetup")
}

function DisplayModal(){
    document.getElementById("modalAjouter").classList.remove("hiddenmodal")
    document.getElementById("modalAjouter").classList.add("modalsetup")
}

function AjouterData(){
    let inputRef = (document.getElementById('ref').value)
    let inputLibelle = (document.getElementById('libelle').value)
    let inputDescription = (document.getElementById('description').value)
    let inputStock = (document.getElementById('stock').checked)
    let inputPrix = (document.getElementById('price').value)
    let inputCategorie = (document.getElementById('categories').value)
    let inputPhoto = (document.getElementById('photo').value)
    
    let testExist=[]
    for (let i=0; i<donnees.length; i++){
        if (donnees[i].reference===inputRef){
            testExist.push(donnees[i].reference)
        }
    }
    if (testExist.length===0){
        let new_product= {
            reference : inputRef, 
            libelle : inputLibelle,
            description : inputDescription,
            stock : inputStock,
            prix : inputPrix,
            categorie : inputCategorie,
            photo : inputPhoto
        };
        donnees.push(new_product);
        }else if (testExist.length!==0 && edit==0){
            alert("This reference already exists!");
        } 
    console.log(edittest);
    if (edittest==0){   
        form.reset()
    }  
    afficherList()
}

function edit(reference){
    edittest=edittest+1;
    document.getElementById("modalEditer").classList.remove("hiddenmodal");
    document.getElementById("modalEditer").classList.add("modalsetup");
    /*let inputRef = (document.getElementById('ref').value)
    let inputLibelle = (document.getElementById('libelle').value)
    let inputDescription = (document.getElementById('description').value)
    let inputStock = (document.getElementById('stock').checked)
    let inputPrix = (document.getElementById('price').value)
    let inputCategorie = (document.getElementById('categories').value)
    let inputPhoto = (document.getElementById('photo').value)*/

    for (let i=0; i<donnees.length; i++){
        if (donnees[i].reference===reference){
            document.getElementById('ref').value=donnees[i].reference;
            document.getElementById('libelle').value=donnees[i].libelle;
            document.getElementById('description').value=donnees[i].description;
            //document.getElementById('stock').value=donnees[i].stock;
            document.getElementById('price').value=donnees[i].prix;
            document.getElementById('categories').value=donnees[i].categorie;
            //document.getElementById('photo').value=donnees[i].photo
        }
    }
    AjouterData()
    edittest=edittest-1;

}
/* CONCEPTUALISATION:
  Initialiser une boucle sur le tableau. A chaque nouveau produit i:
  - creer une nouvelle ligne (tr)
  - creer 7 colonnes (td)
  - envoyer la reference de chaque produit dans dans la 1ere case de la ligne
  - envoyer le libellé de chaque produit dans la 2eme case de la ligne
  - envoyer la descritption dans la 3eme case de la ligne 
  - envoyer le stock dans la 4eme case de la ligne
  - envoyer le prix dans la 5ème case de la ligne
  - creer les boutons voir editer et supprimer dans la 6ème case de la ligne*/