// fetch api and get the data 
const loadData = (length) =>{
    const url = "https://openapi.programming-hero.com/api/ai/tools";
    fetch(url)
    .then(res => res.json())
    .then(data => displayData(data.data.tools,length))
}
//display data for each card
const displayData = data =>{
    // console.log(data);
    //display 6 card
    const features = data.slice(0,6);
    features.forEach(feature => {
        console.log(feature);
        const cardContainer = document.getElementById("card-container");
        const div = document.createElement("div");
        div.classList.add("border", "p-5", "rounded-xl", "space-y-3");
        div.innerHTML = `
                <img src="${feature.image}" class="rounded-xl h-64">
                <h3 class="text-xl font-bold">Features</h3>
                <ol class="list-decimal list-inside text-slate-700 leading-loose">
                    <li>${feature.features[0]}</li>
                    <li>${feature.features[1]}</li>
                    <li>${feature.features[2] ? feature.features[2]: "not available"}</li>
                </ol>
                <hr>
                <div class="flex justify-between items-center">
                    <div class="space-y-3">
                        <h3 class="text-xl font-bold">${feature.name}</h3>
                        <p><i class="fa-solid fa-calendar-days"></i> ${feature.published_in
                        }</p>
                    </div>
                    <button class="text-[#EB5757] bg-red-50 hover:bg-red-300 p-3 rounded-full"><i class="fa-solid fa-arrow-right"></i></button>
                </div>
        `;
        cardContainer.appendChild(div);
    });
}
document.getElementById("see-more").addEventListener("click", function(){
    
})
loadData()