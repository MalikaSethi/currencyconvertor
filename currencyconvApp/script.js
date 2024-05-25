//     const BASE_url ="https://api.exchangerate-api.com/v4/latest/USD";

//     const dropdowns = document.querySelectorAll(".dropdown select");
//     const btn = document.querySelector("form button");
//     const fromCurr = document.querySelector(".from select");
//     const toCurr = document.querySelector(".to select");
//     const msg = document.querySelector(".msg");
//     for(let Select of dropdowns){
//     for (currCode in countryList)
//     {
//         let newOption = document.createElement("option");
//         newOption.innerHTML = currCode;
//         newOption.value = currCode;
//         if(Select.name=== "from" && currCode === "USD" )
//         {
//             newOption.selected = "selected";    
//         } else  if(Select.name=== "to" && currCode === "INR" )
//         {
//             newOption.selected = "selected";    
//         }
//         Select.append(newOption);
//     }
//     Select.addEventListener("change", (evt)=>
//     {
//         updateFlag(evt.target);
//     }
//     )
//     }

//     const updateFlag = (element) =>
//     {
//         let currCode = element.value;
//         let countryCode = countryList[currCode];
//         let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
        
//         // const btn = document.qlet img =  element.parentElement.querySelector("img");
//         img.src = newSrc;
//     }

//     btn.addEventListener("click",async (evt) =>
//     {
//         evt.preventDefault();
//         let amount = document.querySelector(".amount input");
//         let amtVal= amount.value;
//         if(amtVal === "" || amtVal <1)
//         {
//             amtVal = 1;
//             amount.value = "1";
//         }

        
//         const URL = `${BASE_url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
//         let response = await fetch(URL);
//         console.log(response)
//     }
// )


// const BASE_url = "https://api.exchangerate-api.com/v4/latest/USD";

// const dropdowns = document.querySelectorAll(".dropdown select");
// const btn = document.querySelector("form button");
// const fromCurr = document.querySelector(".from select");
// const toCurr = document.querySelector(".to select");
// const msg = document.querySelector(".msg");

// for (let Select of dropdowns) {
//     for (currCode in countryList) {
//         let newOption = document.createElement("option");
//         newOption.innerHTML = currCode;
//         newOption.value = currCode;
//         if (Select.name === "from" && currCode === "USD") {
//             newOption.selected = "selected";
//         } else if (Select.name === "to" && currCode === "INR") {
//             newOption.selected = "selected";
//         }
//         Select.append(newOption);
//     }
//     Select.addEventListener("change", (evt) => {
//         updateFlag(evt.target);
//     });
// }

// const updateFlag = (element) => {
//     let currCode = element.value;
//     let countryCode = countryList[currCode];
//     let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
//     let img = element.parentElement.querySelector("img"); // Added this line to fix the reference error
    
//     img.src = newSrc;
// };

// btn.addEventListener("click", async (evt) => {
//     evt.preventDefault();
//     console.log("Button clicked"); // Check if the button click event is triggered
//     let amount = document.querySelector(".amount input");
//     let amtVal = amount.value;
//     if (amtVal === "" || amtVal < 1) {
//         amtVal = 1;
//         amount.value = "1";
//     }

//     const URL = `${BASE_url}`;
//     try {
//         let response = await fetch(URL);
//         console.log("Response:", response); // Check the response from the API
//         if (!response.ok) {
//             throw new Error('Failed to fetch exchange rates');
//         }
//         let data = await response.json();
//         console.log("Data:", data); // Check the data received from the API
//         let conversionRate = data.rates[toCurr.value] / data.rates[fromCurr.value];
//         let convertedAmount = amtVal * conversionRate;
//         console.log("Conversion Rate:", conversionRate); // Check the conversion rate
//         console.log("Converted Amount:", convertedAmount); // Check the converted amount
//         msg.textContent = `${amtVal} ${fromCurr.value} is equal to ${convertedAmount.toFixed(2)} ${toCurr.value}`;
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         msg.textContent = 'Failed to perform currency conversion';
//     }
// });

const BASE_URL = "https://api.exchangerate-api.com/v4/latest/USD";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
    updateExchangeRate();
  });
}

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch exchange rates");
    }
    const data = await response.json();
    const rate = data.rates[toCurr.value];

    const finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
  } catch (error) {
    console.error("Error fetching data:", error);
    msg.innerText = "Failed to perform currency conversion";
  }
};

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});
