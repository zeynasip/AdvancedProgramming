// Initialize Firebase
var config = {
  apiKey: "AIzaSyAUW-_mPRKyfeNsNqpq7NytfYAtg0CU1mw",
  authDomain: "dukkan-database.firebaseapp.com",
  databaseURL: "https://dukkan-database.firebaseio.com",
  projectId: "dukkan-database",
  storageBucket: "dukkan-database.appspot.com",
  messagingSenderId: "480765420024"
};
firebase.initializeApp(config);

const dbRef = firebase.database().ref();
const ideasRef = dbRef.child('ideas');

function ideaClicked(e){
	var ideaID = e.target.getAttribute("idea-key");
	const ideasRef = dbRef.child('ideas/' + ideaID);
	const ideaDetay = document.getELementedById("idea-detay");
	ideasRef.on("value", snap => {
		ideaDetay.innerHTML = "";
		snap.forEach(childSnap => {
			var $p = document.createElement("p");
			$p.innerHTML = childSnap.key + " - " + childSnap.val();
			ideaDetay.append($p);
		})
	});
}

const addIdeaButton = document.getElementById("addbutton");
if(addIdeaButton)
	addIdeaButton.addEventListener("click", addButtonTikla, false);

function addButtonTikla(){
	const ideasRef = dbRef.child('ideas');
	const addIdeaInputs	= document.getElementsByClassName("satir");
	let newIdea = {};
	for(let i = 0; i < addIdeaInputs.length; i ++){
		let key = addIdeaInputs[i].getAttribute('data-key');
		let value = addIdeaInputs[i].value;
		if(value != "")
			newIdea[key] = value;
	}
	//for(let i = 0; i < 7; i++)
		//console.log(newIdea[i]);
	//if(newIdea[0].value == null || newIdea[1].value == null || newIdea[2].value == null || newIdea[3].value == null || newIdea[4].value == null || newIdea[5].value == null || newIdea[6].value == null){
		//alert("Boş alanları doldurunuz!");
	//}
	//else
		ideasRef.push(newIdea);
		alert("Bilgileriniz kaydedildi!");
	//
}

function readIdea(){
	const fikirler = document.getElementById("tablo");
	ideasRef.on("child_added", snap => {
		let idea = snap.val();
		newRow = fikirler.insertRow();
		cellAd = newRow.insertCell();
        cellAd.innerHTML = idea.ad + " " + idea.soyad;
        cellYas = newRow.insertCell();
        cellYas.innerHTML = idea.yas;
        cellFikir = newRow.insertCell();
        cellFikir.innerHTML = idea.fikir;
        cellButce = newRow.insertCell();
        cellButce.innerHTML = idea.butce;
	});
}

readIdea();

function yorumClicked(e){
	var yorumID = e.target.getAttribute("yorum-key");
	const yorumRef = dbRef.child('yorumlar/' + yorumID);
	const yorumDetay = document.getELementedById("yorum-detay");
	yorumRef.on("value", snap => {
		snap.forEach(childSnap => {
			yorumDetay.innerHTML = "";
			var $p = document.createElement("p");
			$p.innerHTML = childSnap.key + " - " + childSnap.val();
			yorumDetay.append($p);
		})
	});
}

const addYorumButton = document.getElementById("yorumbtn");
if(addYorumButton)
	addYorumButton.addEventListener("click", addYorumTikla, false);

function addYorumTikla(){
	const yorumRef = dbRef.child('yorums');
	const addYorumInputs = document.getElementsByClassName("satir");
	let newYorum = {};
	for(let i = 0; i < addYorumInputs.length; i ++){
		let key = addYorumInputs[i].getAttribute('data-key');
		let value = addYorumInputs[i].value;
		newYorum[key] = value;
	}
	yorumRef.push(newYorum);
	alert("Yorumunuz eklenmiştir!");
}

document.querySelectorAll('#tablo tr')
	.forEach(e => e.addEventListener("click", yorumlariGoster()));

function yorumlariGoster(){
	const yorumRef = dbRef.child('yorums');
	const yorumlar = document.getElementById("yorum");
	yorumlar.innerHTML = "";
	let yorum;
	yorumRef.on("child_added", snap => {
		yorum = snap.val();
		//if(yorumlar.fkr == cell[2].innerText)
			yorumlar.innerHTML += "<b>" + yorum.isim + "	'" 
								  + yorum.fkr + "'	fikri için : </b><br>"
								  + yorum.yorum + "<br><hr>";
		//yorumlar.innerHTML = "Bu fikre ait henüz herhangi bir yorum yapılmamıştır.";
 	});
}



