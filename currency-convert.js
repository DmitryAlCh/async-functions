// APIs used:
// fixer.io
// restcountries.eu
// 23 USD is worth 30 CAD, You can spend it in the following countris:
const axios = require('axios');

const getExchangeRate = (from, to) => {
  return axios.get(`http://api.fixer.io/latest?base=${from}`).then((response)=>{
    return response.data.rates[to];
  });
}

const getCountries = (currenCycode) => {
  return axios.get(`https://restcountries.eu/rest/v2/currency/${currenCycode}`).then((response) => {
    return response.data.map((country)=>{
      return country.name;
    });
  });
}

const convertCurrency = (from, to, amount) =>{
  let countries;
  return getCountries(to).then((tempCountries) => {
    countries = tempCountries;
    return getExchangeRate(from, to);
  }).then((rate) =>{
    const exchangedAmount = amount*rate;
    return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries ${countries.join(', ')}`;
  })
}

// create same convertCurrency function in async form
const convertCurrencyAsync = async (from, to, amount) => {
  const countries = await getCountries(to);
  const rate = await getExchangeRate(from, to);
  const exchangedAmount = amount * rate;
  return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries ${countries.join(', ')}`;
}

convertCurrencyAsync('RUB', 'USD', 10000).then((string)=>{
  console.log(string);
});
convertCurrency('USD','CAD', 250).then((string)=>{
  console.log(string);
});
// getExchangeRate('USD', 'CAD').then((rate)=>{console.log(rate)});
// getCountries('CAD').then((list)=>{console.log(list);});
