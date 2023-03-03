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
                        <div class="modal md:bg-opacity-80 transition-all">
                            <div class="modal-box relative w-11/12 max-w-5xl h-5xl">
                                <label for="my-modal-3" class="btn btn-md btn-error btn-circle absolute right-0 top-0 text-white">✕</label>
                                <br>
                                <div id="modal-body" class="md:p-5">
  
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
        <div class="flex gap-5 md:flex-row flex-col">
            <div class="border border-red-400 p-5 bg-red-50 space-y-5 rounded-xl w-full shadow-xl">
                <p class="text-xl font-bold">${cardData.description}</P>
                <div class="flex gap-3 font-bold md:flex-row flex-col">
                    <p class="text-green-700 p-5 bg-white rounded-md w-full">${cardData.pricing ? cardData.pricing[0].price : "No Data Found"}  <br> ${cardData.pricing ? cardData.pricing[0].plan : "No Data Found"}</p>
                    <p class="text-orange-500 p-5 bg-white rounded-md w-full">${cardData.pricing ? cardData.pricing[1].price : "No Data Found"}  <br> ${cardData.pricing ? cardData.pricing[1].plan : "No Data Found"}</p>
                    <p class="text-pink-700 p-5 bg-white rounded-md w-full">${cardData.pricing ? cardData.pricing[2].price : "No Data Found"}  <br> ${cardData.pricing ? cardData.pricing[2].plan : "No Data Found"}</p>
                </div>
                <div class="flex gap-5 justify-between md:flex-row flex-col">
                    <div>
                        <p class="text-xl font-bold mb-2">Features</p>
                        <ul class="list-disc list-inside text-gray-500 space-y-2">
                            <li>${cardData.features ? cardData.features[1].feature_name : "No Data Found"}</li>
                            <li>${cardData.features ? cardData.features[2].feature_name : "No Data Found"}</li>
                            <li>${cardData.features ? cardData.features[3].feature_name : "No Data Found"}</li>
                        </ul>
                    </div>
                    <div>
                        <p class="text-xl font-bold mb-2">Integrations</p>
                        <ul class="list-disc list-inside text-gray-500 space-y-2">
                            <li>${cardData.integrations ? (cardData.integrations[0] ? cardData.integrations[0] : "No Data Found") : "No Data Found"}</li>
                            <li>${cardData.integrations ? (cardData.integrations[1] ? cardData.integrations[1] : "No Data Found") : "No Data Found"}</li>
                            <li>${cardData.integrations ? (cardData.integrations[2] ? cardData.integrations[2] : "No Data Found" ) : "No Data Found"}</li> 
                        </ul>
                    </div>
                </div>
            </div>
            <div class="border md:p-5 rounded-xl text-center relative w-full shadow-xl">
                <button class="bg-red-400 text-white md:p-2 p-px rounded-md md:font-semibold absolute md:top-6 top-0 md:right-6 right-0 hidden" id="${cardData.id}">${cardData.accuracy.score*100}% accuracy</button>
                <img src="${cardData.image_link[0]}" class="rounded-xl mb-5 w-full">
                <p class="text-xl font-bold mb-5">${cardData.input_output_examples ? cardData.input_output_examples[0].input : "No Data Found"}</p>
                <p class="text-gray-500">${cardData.input_output_examples ? cardData.input_output_examples[0].output : "No Data Found"}</p>
            </div>
        </div>
    `;
    const score = cardData.accuracy.score;
    // console.log(score);
    const imgContainer = document.getElementById(`${cardData.id}`);
    if(cardData.accuracy.score == null){
        imgContainer.classList.add("hidden");
    } else {
        imgContainer.classList.remove("hidden");
    }
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