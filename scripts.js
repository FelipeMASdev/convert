// Currency exchange rates
const USD = 5.34;
const EUR = 6.11;
const GBP = 7.07;

//Selecting elements from the DOM
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const currency = document.getElementById("currency");
const footer = document.querySelector("main footer");
const description = document.getElementById("description");
const result = document.getElementById("result");

//Manipulating input to allow only numbers
amount.addEventListener("input", () => {
  const hasCharactersRegex = /\D+/g;
  amount.value = amount.value.replace(hasCharactersRegex, "");
});

//capturing form submit event
form.onsubmit = (e) => {
  e.preventDefault(); 

  switch (currency.value) {
    case "USD":
      convertCurrency(amount.value, USD, "US$");
      break;
    case "EUR":
      convertCurrency(amount.value, EUR, "€");
      break;
    case "GBP":
      convertCurrency(amount.value, GBP, "£");
      break;
  }
}

//function to convert the currency
function convertCurrency(amount, price, symbol) {
  try {
    //updating the content of footer with the selected currency exchange rate
    description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`;
    
    //calculating the total 
    let total = amount * price;

    //treating the exeption for when the result is not a number
    if (isNaN(total)) {
      console.log(total);
      return alert("Por favor, insira um valor numérico para a conversão.");
    }

    //displaying the result in the footer
    result.textContent = formatCurrencyBRL(total);
    
    //applies a class that displays the footer
    footer.classList.add("show-result");
  } catch (err) {
    //removes the class that displays the footer
    footer.classList.remove("show-result");

    console.log(err);
    alert("Não foi possível realizar a conversão. Tente novamente mais tarde.");
  }
}

//formats the currency as BRL
function formatCurrencyBRL(value) {
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}