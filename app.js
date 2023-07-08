console.log("hello");

const inputWitdtEle = document.querySelector("[width]");
const inputHeightEle = document.querySelector("[height]");
const btnEle = document.querySelector("[calculate]");
const resultEle = document.querySelector(".result");

// for area calculator

const calculateArea = (width, height) => {
  if (!width && !height) {
    alert("Please input the value first to calculate.");
    return;
  }
  const area = width * height;
  console.log(area);
  resultEle.innerHTML = `The answe is ${area} sqft.`;

  document.querySelector(".store").innerHTML += `<li>${area} sqft</li>`;
  return area;
};

let value = "Area";
const typeOfValue = () => {
  const typeOFCalculate = document.querySelector(".typeOfCalculator");
  value = typeOFCalculate.value;
  console.log(value);
  return value;
};

const checkTypeOfCalculator = (value) => {
  console.log(value);
  if (value === "Area") {
    document.querySelector("[areaCal]").classList.remove("hide");
    document.querySelector("[temp]").classList.add("hide");
    document.querySelector("[money]").classList.add("hide");
    btnEle.onclick = () => {
      calculateArea(inputWitdtEle.value, inputHeightEle.value);
      inputWitdtEle.value = null;
      inputHeightEle.value = null;
    };
  } else if (value === "Temperature") {
    document.querySelector("[temp]").classList.remove("hide");
    document.querySelector("[areaCal]").classList.add("hide");
    document.querySelector("[money]").classList.add("hide");
    console.log("this is in temp");
    btnEle.onclick = () => console.log("object");
  } else {
    document.querySelector("[money]").classList.remove("hide");
    document.querySelector("[areaCal]").classList.add("hide");
    document.querySelector("[temp]").classList.add("hide");
  
  }
};
checkTypeOfCalculator(value);

document.querySelector(".clear").onclick = () => {
  document.querySelector(".store").innerHTML = null;
};

document.querySelector(".clear-temp").onclick = () => {
  document.querySelector(".store-temp").innerHTML = null;
};

// for area calculator


// temperature stuffs

let unit = "Fahrenheit";
const typeOfUnit = () => {
  const unitType = document.querySelector(".typeOfUnit");
  unit = unitType.value;
  console.log(unit);
  return unit;
};

typeOfUnit();

const inputValueEle = document.querySelector("[inputUnit]");
const resultTempEle = document.querySelector(".result-temp");
const calculateTemperature = () => {
  if (unit === "Fahrenheit") {
    inputValueEle.placeholder = "Enter °C value... ";
    document.querySelector("[calculate-temp]").onclick = () =>
      degreeToFah(inputValueEle);
  } else if (unit === "Degree-Celsius") {
    inputValueEle.placeholder = "Enter °F value... ";
    document.querySelector(
      ".formula"
    ).innerHTML = `Formula: (0°F − 32) × 5/9 = -17.78°C`;
    document.querySelector("[calculate-temp]").onclick = () =>
      fahToDegree(inputValueEle);
  } else {
    document.querySelector(
      ".formula"
    ).innerHTML = `Formula: (0°C − 32) × 5/9 + 273.15 = 255.372K`;
    inputValueEle.placeholder = "Enter °C value... ";
    document.querySelector("[calculate-temp]").onclick = () =>
      degreeToKelvin(inputValueEle);
  }
};

calculateTemperature(unit);

  const degreeToFah = (inputValueEle) => {

  const convertTemp = inputValueEle.value * (9 / 5) + 32;
  console.log(convertTemp);
  resultTempEle.innerHTML = `The result is ${convertTemp} °F.`;
  document.querySelector(
    ".store-temp"
  ).innerHTML += `<li>${convertTemp} °F</li>`;
  inputValueEle.value = null;
  return convertTemp;
};

  const fahToDegree = (inputValueEle) => {
  const convertTemp = ((inputValueEle.value - 32) * (5 / 9)).toFixed(2);
  console.log(convertTemp);
  resultTempEle.innerHTML = `The result is ${convertTemp} °C.`;
  document.querySelector(
    ".store-temp"
  ).innerHTML += `<li>${convertTemp} °C</li>`;
  inputValueEle.value = null;
  return convertTemp;
};

  const degreeToKelvin = (inputValueEle) => {
  const convertTemp = ((inputValueEle.value - 32) * (5 / 9) + 273.15).toFixed(2);
  console.log(convertTemp);
  resultTempEle.innerHTML = `The result is ${convertTemp} K.`;
  document.querySelector(
    ".store-temp"
  ).innerHTML += `<li>${convertTemp} K</li>`;
  inputValueEle.value = null;
  return convertTemp;
};

// temperature stuffs


// money exchange

let countryCode = "USD";
const getCountryCode = () => {
  const country = document.querySelector("#selectCountry");
  countryCode = country.value;
  console.log(countryCode);
  return countryCode;
};
console.log(countryCode);
getCountryCode();

  
const inputAmountEle = document.querySelector("[inputAmount]");
const calExBtn = document.querySelector('[calculate-ex]');

async function getExchangeRate(ccode) {

  let response = await fetch(
    "https://v6.exchangerate-api.com/v6/a05093c5c148b361e0829a88/latest/USD");
  let data = await response.json();
  console.log(data);
  const countryAndRate = data.conversion_rates;
  console.log(countryAndRate);
  const cRate = countryAndRate[ccode] || "1" ;

  document.querySelector('[ex-result]').innerHTML =`The exchange rate is: ${cRate.toFixed(2)} ${countryCode}
  .Please Enter the USD amount to exchange`;
  console.log(ccode);
  console.log(cRate);

  const generateOption = () => {
    let html = "";
    Object.keys(countryAndRate).map((ele) => {
      addOption = `<option>${ele}</option>`;
      html += addOption;
    });
    selectCountry.innerHTML = html;
  };
  generateOption();

    const calculateExchange = () => {
      if(!Number(inputAmountEle.value)){
        return;

      }
    let exchangeResult = Number(inputAmountEle.value) * Number(cRate);
    document.querySelector('.result-ex').innerHTML =`Excahnge Amount: ${exchangeResult.toFixed(2)}`;
    document.querySelector(".store-ex").innerHTML += `<li>${exchangeResult.toFixed(2)} ${countryCode}</li>`;
    
  };

 

  calExBtn.onclick = () =>  {
    calculateExchange(inputAmountEle , cRate);
    if(!inputAmountEle.value) {
      alert (`Enter Usd Amouont To exchange`)
    }
    inputAmountEle.value = null;
    
  }

}

getExchangeRate(countryCode);
