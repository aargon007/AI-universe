//sort and store api data array
let apiData = [];
// fetch api and get the data 
const loadData = (length) =>{
    const url = "https://openapi.programming-hero.com/api/ai/tools";
    fetch(url)
    .then(res => res.json())
    .then(data => {
        apiData = data.data.tools;
        displayData(apiData, length);
     });
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
        // console.log(feature);
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
                        <p><i class="fa-solid fa-calendar-days"></i> ${feature.published_in}</p>
                    </div>
                    <div>
                        <!-- The button to open modal -->
                        <label for="my-modal-3" class="btn text-[#EB5757] bg-red-50 hover:bg-red-300 p-3 rounded-full border-0" onclick="showDetails('${feature.id}')">
                            <i class="fa-solid fa-arrow-right"></i>
                        </label>

                        <!-- Put this part before </body> tag -->
                        <input type="checkbox" id="my-modal-3" class="modal-toggle" />
                        <div class="modal">
                            <div class="modal-box relative w-11/12 max-w-5xl">
                                <label for="my-modal-3" class="btn btn-sm btn-error btn-circle absolute right-2 top-2 text-white">✕</label>
                                <br>
                                <div id="modal-body" class="p-5 border border-red-400">
  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        `;
        cardContainer.appendChild(div);
    });
    //stop load spinner
    togglespinner(false);
}

//sort by date
document.getElementById("sort-by-date").addEventListener("click", function(){
    // console.log(apiData);
    apiData.sort(function(a, b) {
        var parseDate = function parseDate(dateAsString) {
                var dateParts = dateAsString.split("/");
                return new Date(parseInt(dateParts[2], 10), parseInt(dateParts[1], 10) - 1, parseInt(dateParts[0], 10));
            };
    
        return parseDate(b.published_in) - parseDate(a.published_in);
    });
    // console.log(apiData);
    displayData(apiData, 6);
})

//modal - show details
const showDetails = id => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => modalDetails(data.data))
}
const modalDetails = cardData =>{
    console.log(cardData);
    const body = document.getElementById("modal-body");
    body.innerHTML = `
        <div class="flex gap-5">
            <div>
                <p>${cardData.description}</P>
                <div class="flex gap-3">
                    <p>${cardData.pricing[0].price} <br> ${cardData.pricing[0].plan}</p>
                    <p>${cardData.pricing[1].price} <br> ${cardData.pricing[1].plan}</p>
                    <p>${cardData.pricing[2].price} <br> ${cardData.pricing[2].plan}</p>
                </div>
                <div class="flex gap-5">
                    <div>
                        <p>Features</p>
                        <ul>
                            <li>${cardData.features[1].feature_name}</li>
                            <li>${cardData.features[2].feature_name}</li>
                            <li>${cardData.features[3].feature_name}</li>
                        </ul>
                    </div>
                    <div>
                        <p>Integrations</p>
                        <ul>
                            <li>${cardData.integrations[0]}</li>
                            <li>${cardData.integrations[1]}</li>
                            <li>${cardData.integrations[2]}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div>
                <img src="${cardData.image_link[0]}">
                <p>${cardData.input_output_examples[0].input}</p>
                <p>${cardData.input_output_examples[0].output}</p>
            </div>
        </div>
    `

}
//loader spinner
const togglespinner = isLoading =>{
    const spinner = document.getElementById("loader");
    if(isLoading){
        spinner.classList.remove("hidden");
    } else{
        spinner.classList.add("hidden");
    }
}

//after clicking see-more button show all card
document.getElementById("see-more").addEventListener("click", function(){
    togglespinner(true);
    displayData(apiData,apiData.length);
})

//load 6 card by defualt with togglespinner
togglespinner(true);
loadData(6);