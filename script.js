document.addEventListener('DOMContentLoaded', main)

async function main(){
    alert("Sörrecept");
    
    let url = "https://api.punkapi.com/v2/beers";
    let szotar = await olvaso_fetch(url);
    
    let sorgombdiv = document.getElementById("gombokdiv");

    
    for (const key in szotar) {
        let gomb = document.createElement("button");
        gomb.setAttribute("class", "sorgomb");
        gomb.onclick = milegyen;
        gomb.setAttribute("id", key);
        gomb.innerHTML = szotar[key]["name"];
        sorgombdiv.appendChild(gomb);
    }

   

}

function milegyen(e){
    alert("ááááááááááá");
    console.log(e.target);
}

async function olvaso_fetch(url){
    let promise = await fetch(url);
    let promise_json = await promise.json();
    return promise_json;
}