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
    temp.innerHTML = `<h2>Mashing:</h2><ul>${szotarelement.method.mash_temp.map(item => `<li>${item.temp.value} ${item.temp.unit}${item.duration == null ? '' : ` for ${item.duration} minutes`}</li>`).join('')}</ul>`

    temp = document.getElementById("erj");
    temp.innerHTML = `Fermentation ${szotarelement.method.fermentation.temp.value} ${szotarelement.method.fermentation.temp.unit}`

    temp = document.getElementById("twist");
    temp.innerHTML = `Twist: ${szotarelement.method.twist}`

    temp = document.getElementById("malata");
}

async function olvaso_fetch(url){
    let response = await fetch(url);
    if (!response.ok)
    alert(response.statusText);
    let promise_json = await response.json();
    return promise_json;
}

const dom = (str) => {
    const div = document.createElement('div');
    div.innerHTML = str;
    return div.childNodes[0];
}