// APIs used:
// fixer.io
// restcountries.eu
// 23 USD is worth 30 CAD, You can spend it in the following countris:
const axios = require('axios');

const getExchangeRate = async (from, to) => {
  try {
    const response = await axios.get(`http://api.fixer.io/latest?base=${from}`)
    const rate = response.data.rates[to];
    if (rate){
      return rate;
    } else {
      throw new Error();
    }
  } catch (e) {
    throw new Error(`Unable to get exchange rate for currnecies ${from} and ${to}`);
  }
}

const getCountries = async (currenCycode) => {
  try {
    const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currenCycode}`);
    return response.data.map((country)=>{
        return country.name;
      });
  } catch(e){
    throw new Error(`Unable to get countries that use ${currenCycode}`);
  }

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

convertCurrencyAsync('USD', 'EUR', 10000).then((string)=>{
  console.log(string);
}).catch((e)=>{console.log(e);});
// convertCurrency('USD','CAD', 250).then((string)=>{
//   console.log(string);
// });
// getExchangeRate('USD', 'CAD').then((rate)=>{console.log(rate)});
// getCountries('CAD').then((list)=>{console.log(list);});
