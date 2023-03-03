// fetch api and get the data 
const loadData = (length) =>{
    const url = "https://openapi.programming-hero.com/api/ai/tools";
    fetch(url)
    .then(res => res.json())
    .then(data => displayData(data.data.tools, length))
}
//display data for each card
const displayData = (data, length) =>{
    // console.log(data);
    const cardContainer = document.getElementById("card-container");
    cardContainer.textContent = "";
    //display 6 card by default and by click see more show all
    const showAll = document.getElementById("see-more");
    if(length > 6){
        data = data;
        showAll.classList.add("hidden");
    } else {
        data = data.slice(0,6);
        showAll.classList.remove("hidden");
    }
    //extract each array item by using forEach method
    data.forEach(feature => {
        console.log(feature);
        const div = document.createElement("div");
        div.classList.add("border", "p-5", "rounded-xl", "space-y-3", "shadow-lg");
        div.innerHTML = `
                <img src="${feature.image}" class="rounded-xl h-64">
                <h3 class="text-xl font-bold">Features</h3>
                <ol class="list-decimal list-inside text-slate-700 leading-loose">
                    <li>${feature.features[0]}</li>
                    <li>${feature.features[1]}</li>
                    <li>${feature.features[2] ? feature.features[2]: "No available data found"}</li>
                </ol>
                <hr class="border">
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
//after clicking see-more button show all card
document.getElementById("see-more").addEventListener("click", function(){
    const loadData = (length) =>{
        const url = "https://openapi.programming-hero.com/api/ai/tools";
        fetch(url)
        .then(res => res.json())
        .then(data => displayData(data.data.tools, data.data.tools.length))
    }
    loadData();
})
//load 6 card by defualt
loadData(6);