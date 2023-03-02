// fetch api and get the data 
const loadData = () =>{
    const url = "https://openapi.programming-hero.com/api/ai/tools";
    fetch(url)
    .then(res => res.json())
    .then(data => displayData(data.data.tools))
}
//display data for each card
const displayData = data =>{
    // console.log(data);
    data.forEach(feature => {
        console.log(feature);
        const cardContainer = document.getElementById("card-container");
        const div = document.createElement("div");
        div.classList.add("border", "p-3", "rounded-lg");
        div.innerHTML = `
                <img src="${feature.image}">
                <h3></h3>
                <ol>
                    <li></li>
                </ol>
                <hr>
                <div>
                    <div>
                        <h3></h3>
                        <p></p>
                    </div>
                    <span></span>
                </div>
        `;
        cardContainer.appendChild(div);
    });
}
loadData()