document.addEventListener('DOMContentLoaded', main)

async function main(){
    alert("Sörrecept");
    
    let url = "https://api.punkapi.com/v2/beers";
    let szotar = await olvaso_fetch(url);
    
    let sorgombdiv = document.getElementById("gombokdiv");

    
    for (const key in szotar) {
        let gomb = document.createElement("button");
        gomb.setAttribute("class", "sorgomb");
        gomb.onclick = (e)=>{milegyen(e, szotar[key])};
        gomb.innerHTML = szotar[key]["name"];
        sorgombdiv.appendChild(gomb);
    }
}

function milegyen(e, szotarelement){
    let temp = document.getElementById("sornevtagline");
    temp.innerHTML = szotarelement["name"] + " - " + szotarelement.tagline;
    
    temp = document.getElementById("ido");
    temp.innerHTML = "First brewed: " + szotarelement.first_brewed;

    temp = document.getElementById("desc");
    temp.innerHTML = szotarelement.description;

    temp = document.getElementById("menny");
    temp.innerHTML = `Volume: ${szotarelement.volume.value} ${szotarelement.volume.unit} (Boil volume: ${szotarelement.boil_volume.value} ${szotarelement.boil_volume.unit})` 

    temp = document.getElementById("cefre");
    temp.innerHTML = `Mashing: ${szotarelement.method.mash_temp[0].temp.value}`
}[

async function olvaso_fetch(url){
    let promise = await fetch(url);
    let promise_json = await promise.json();
    return promise_json;
}