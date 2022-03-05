document.addEventListener('DOMContentLoaded', main)

async function main(){
    
    let url = "https://api.punkapi.com/v2/beers";
    let dict = await olvaso_fetch(url);
    
    let buttondiv = document.getElementById("buttondiv");

    
    for (const key in dict) {
        let button = document.createElement("button");
        button.setAttribute("class", "button");
        button.onclick = (e)=>{milegyen(e, dict[key])};
        button.innerHTML = dict[key]["name"];
        buttondiv.appendChild(button);
    }
}

function milegyen(e, szotarelement){
    let temp = document.getElementById("name-tagline");
    temp.innerHTML = szotarelement["name"] + " - " + szotarelement.tagline;
    
    temp = document.getElementById("time");
    temp.innerHTML = "First brewed: " + szotarelement.first_brewed;

    temp = document.getElementById("desc");
    temp.innerHTML = szotarelement.description;

    temp = document.getElementById("amount");
    temp.innerHTML = `Volume: ${szotarelement.volume.value} ${szotarelement.volume.unit} (Boil volume: ${szotarelement.boil_volume.value} ${szotarelement.boil_volume.unit})`;

    temp = document.getElementById("mash");
    temp.innerHTML = `<h2>Mashing:</h2><ul>${szotarelement.method.mash_temp.map(item => `<li>${item.temp.value} ${item.temp.unit}${item.duration == null ? '' : ` for ${item.duration} minutes`}</li>`).join('')}</ul>`;

    temp = document.getElementById("fermentation");
    temp.innerHTML = `Fermentation ${szotarelement.method.fermentation.temp.value} ${szotarelement.method.fermentation.temp.unit}`;

    if (szotarelement.method.twist != null){
    temp = document.createElement("li");
    temp.innerHTML = `${`Twist: ${szotarelement.method.twist}`}`;
    document.getElementById('mainlist').appendChild(temp);
    }

    temp = document.getElementById("malt");
    temp.innerHTML = `${szotarelement.ingredients.malt.map(item => `<li>${item.name} ${item.amount.value} ${item.amount.unit}</li>`).join(``)}`;
    
    temp = document.getElementById("hops");
    temp.innerHTML = `${szotarelement.ingredients.hops.map(item => `<li>${item.name} ${item.amount.value} ${item.amount.unit}</li>`).join(``)}`;
    
    temp = document.getElementById("yeast");
    temp.innerHTML = `Yeast: ${szotarelement.ingredients.yeast}`;

    temp = document.getElementById("food_pairing");
    temp.innerHTML = `${szotarelement.food_pairing.map(item => `<li>${item}</li>`).join(``)}`;

    temp = document.getElementById("tips");
    temp.innerHTML = `Tips: ${szotarelement.brewers_tips}`;
    
    temp = document.getElementById("contributor");
    temp.innerHTML = `Contriburted by ${szotarelement.contributed_by}`;

    temp = document.getElementById("ertekekdiv");
    temp.innerHTML = `<ul>${szotarelement.abv != null? `<li>Abv: ${szotarelement.abv}</li>`:``}${szotarelement.ibu != null? `<li>Ibu: ${szotarelement.ibu}</li>`:``}${szotarelement.target_fg != null? `<li>Target fg: ${szotarelement.target_fg}</li>`:``}${szotarelement.target_og != null? `<li>Target og: ${szotarelement.target_og}</li>`:``}${szotarelement.ebc != null? `<li>Ebc: ${szotarelement.ebc}</li>`:``}${szotarelement.srm != null? `<li>Srm: ${szotarelement.srm}</li>`:``}${szotarelement.ph != null? `<li>Ph: ${szotarelement.ph}</li>`:``}${szotarelement.attenuation_level != null? `<li>Attenuation level: ${szotarelement.attenuation_level}</li>`:``}</ul>`;

    temp = document.getElementById('image');
    temp.innerHTML = `<img src="${szotarelement.image_url}" alt="pictre of ${szotarelement.name}">`
    
    
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