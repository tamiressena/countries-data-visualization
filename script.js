import { countries_data } from "./country_data.js";

// VERIFICA O NÚMERO DE PAÍSES
let i;
for (i = 0; i < countries_data.length; i++) {
  let lenght = countries_data[i];
  i++;
}

// IMPRIME NÚMERO DE PAÍSES NA TELA
let subtitle = document.getElementById("subtitle");
subtitle.textContent = "Currently, we have " + i + " countries";
subtitle.style.display = "flex";
subtitle.style.justifyContent = "center";
subtitle.style.margin = "8px 0px 40px 0px";
subtitle.style.fontFamily = "verdana, sans-serif";
subtitle.style.color = "rgb(46, 46, 46)";

// VERIFICA OS DEZ PAÍSES MAIS POPULOSOS
countries_data.sort((a, b) => b.population - a.population);
let mostPopulated = countries_data.slice(0, 10);

const arrayCountries = [];
const arrayPopulation = [];
mostPopulated.forEach((country) => {
  arrayCountries.push(country.name);
  arrayPopulation.push(country.population);
});

// Style do texto de descrição
let actionContainer = document.getElementById("action");
actionContainer.style.flexDirection = "column";
actionContainer.style.alignItems = "center";

// POPULATION
let populationButton = document.getElementById("populationButton");
populationButton.addEventListener("click", () => {
  // Verifica se o gráfico de idiomas já está sendo exibido na tela, para evitar repetições
  let existingLanguagesGraphic = document.getElementById("languagesGraphic");
  if (existingLanguagesGraphic) {
    actionContainer.removeChild(existingLanguagesGraphic);
  }

  // Verifica se o gráfico de poulação já está sendo exibido na tela, para evitar repetições
  let existingGraphic = document.getElementById("populationGraphic");
  if (existingGraphic) {
    // Se já existe, remove o gráfico
    actionContainer.removeChild(existingGraphic);
  }

  // Conteúdo da descrição
  let text = document.getElementById("description");
  text.textContent = "10 most populated countries in the world";

  // Container onde estará o gráfico
  let graphic = document.createElement("div");
  graphic.id = "populationGraphic"; // ID para permitir a verificação de repetição
  graphic.style.display = "flex";
  graphic.style.justifyContent = "space-between";
  graphic.style.backgroundColor = "whitesmoke";
  graphic.style.width = "100%";
  graphic.style.justifyContent = "center";
  graphic.style.padding = "3% 0";
  graphic.style.boxShadow = "0px -1px 5px 0px rgba(212,212,212,1)";
  actionContainer.appendChild(graphic);

  // Coluna do país
  let countriesColumn = document.createElement("div");
  countriesColumn.style.display = "flex";
  countriesColumn.style.flexDirection = "column";
  countriesColumn.style.width = "200px";
  countriesColumn.style.fontWeight = "550";
  countriesColumn.style.color = "rgb(46, 46, 46);";
  graphic.appendChild(countriesColumn);

  // Coluna do gráfico
  let graphicColumns = document.createElement("div");
  graphicColumns.style.display = "flex";
  graphicColumns.style.flexDirection = "column";
  graphicColumns.style.justifyContent = "space-between";
  graphicColumns.style.margin = "0px 50px";
  graphic.appendChild(graphicColumns);

  // Coluna da população
  let countryPopulation = document.createElement("div");
  countryPopulation.style.display = "flex";
  countryPopulation.style.flexDirection = "column";
  graphic.appendChild(countryPopulation);

  // Informações sobre o mundo
  let countryName = document.createElement("p");
  countryName.textContent = "World";
  countryName.style.textAlign = "right";
  countriesColumn.appendChild(countryName);

  let graphicRow = document.createElement("canvas");
  graphicRow.style.display = "flex";
  graphicRow.style.flexDirection = "column";
  graphicRow.style.width = "500px";
  graphicRow.style.height = "40px";
  graphicRow.style.backgroundColor = "rgb(255, 166, 0)";
  graphicColumns.appendChild(graphicRow);

  let worldPopulation = 0;
  for (let i = 0; i < countries_data.length; i++) {
    worldPopulation += countries_data[i].population;
  }

  let population = document.createElement("p");
  function formatarValor(valor) {
    return valor.toLocaleString("pt-BR");
  }
  population.textContent = formatarValor(worldPopulation);
  countryPopulation.appendChild(population);

  // Itera os 10 países mais populosos
  for (let i = 0; i < mostPopulated.length; i++) {
    // Nome do país
    let countryName = document.createElement("p");
    countryName.textContent = arrayCountries[i];
    countryName.style.textAlign = "right";
    countriesColumn.appendChild(countryName);

    // Linhas do gráfico
    let graphicRow = document.createElement("canvas");
    let widthPercentage = arrayPopulation[i] / worldPopulation;
    let width = widthPercentage * 500 + "px";
    graphicRow.style.display = "flex";
    graphicRow.style.flexDirection = "column";
    graphicRow.style.width = width;
    graphicRow.style.height = "40px";
    graphicRow.style.backgroundColor = "rgb(255, 166, 0)";
    graphicColumns.appendChild(graphicRow);

    // Número da população
    let population = document.createElement("p");
    function formatarValor(valor) {
      return valor.toLocaleString("pt-BR");
    }
    population.textContent = formatarValor(arrayPopulation[i]);
    countryPopulation.appendChild(population);
  }
});

// LANGUAGES
let languagesButton = document.getElementById("languagesButton");
languagesButton.addEventListener("click", () => {
  // Conteúdo da descrição
  let text = document.getElementById("description");
  text.textContent = "10 most spoken languages in the world";

  // Itera todas as languages e as insere em um único array
  const languagesArrays = [];
  for (let i = 0; i < countries_data.length; i++) {
    const languages = countries_data[i].languages;

    for (let i = 0; i < languages.length; i++) {
      languagesArrays.push(languages[i]);
    }
  }

  // Novo objeto em que serão inseridas as languages como key e o número de vezes em que aparece como value
  const languageCount = {};

  // Itera o array e insere os valores no objeto
  for (i = 0; i < languagesArrays.length; i++) {
    const language = languagesArrays[i];
    if (languageCount[language]) {
      languageCount[language]++;
    } else {
      languageCount[language] = 1;
    }
  }

  // Transforma o objeto em array para poder usar o sort e verificar os que mais aparecem
  const languageCountArray = Object.entries(languageCount).map(
    ([language, count]) => ({ language, count })
  );

  // Ordena o array de idiomas com base no número de repetições
  languageCountArray.sort((a, b) => b.count - a.count);

  // Obtem os 10 idiomas mais falados
  let topTenLanguages = languageCountArray.slice(0, 10);

  // Verifica se o gráfico de população já está sendo exibido na tela, para evitar repetições
  let existingPopulationGraphic = document.getElementById("populationGraphic");
  if (existingPopulationGraphic) {
    actionContainer.removeChild(existingPopulationGraphic);
  }

  // Verifica se o gráfico de idiomas já está sendo exibido na tela, para evitar repetições
  let existingGraphic = document.getElementById("languagesGraphic");
  if (existingGraphic) {
    // Se já existe, remove o gráfico
    actionContainer.removeChild(existingGraphic);
  }

  // Container onde estará o gráfico
  let graphic = document.createElement("div");
  graphic.id = "languagesGraphic"; // ID para permitir a verificação de repetição
  graphic.style.display = "flex";
  graphic.style.justifyContent = "space-between";
  graphic.style.backgroundColor = "whitesmoke";
  graphic.style.width = "100%";
  graphic.style.justifyContent = "center";
  graphic.style.padding = "3% 0";
  graphic.style.boxShadow = "0px -1px 5px 0px rgba(212,212,212,1)";
  actionContainer.appendChild(graphic);

  // Coluna do idioma
  let languagesColumn = document.createElement("div");
  languagesColumn.style.display = "flex";
  languagesColumn.style.flexDirection = "column";
  languagesColumn.style.width = "70px";
  languagesColumn.style.fontWeight = "550";
  languagesColumn.style.color = "rgb(46, 46, 46);";
  graphic.appendChild(languagesColumn);

  // Coluna do gráfico
  let graphicLanguages = document.createElement("div");
  graphicLanguages.style.display = "flex";
  graphicLanguages.style.width = "500px";
  graphicLanguages.style.flexDirection = "column";
  graphicLanguages.style.justifyContent = "space-between";
  graphicLanguages.style.margin = "0px 50px";
  graphic.appendChild(graphicLanguages);

  // Coluna dos valores
  let numberCountries = document.createElement("div");
  numberCountries.style.display = "flex";
  numberCountries.style.flexDirection = "column";
  numberCountries.style.textAlign = "right";
  graphic.appendChild(numberCountries);

  for (let i = 0; i < topTenLanguages.length; i++) {
    let languageName = document.createElement("p");
    languageName.textContent = topTenLanguages[i].language;
    languagesColumn.appendChild(languageName);

    let languageQuantity = document.createElement("p");
    languageQuantity.textContent = topTenLanguages[i].count;
    numberCountries.appendChild(languageQuantity);

    // Linhas do gráfico
    let graphicRow = document.createElement("canvas");
    graphicRow.style.display = "flex";
    graphicRow.style.flexDirection = "column";
    graphicRow.style.height = "40px";
    graphicRow.style.backgroundColor = "rgb(255, 166, 0)";
    graphicLanguages.appendChild(graphicRow);

    if (i === 0) {
      graphicRow.style.width = "500px";
    } else {
      let widthPercentage = topTenLanguages[i].count / topTenLanguages[0].count;
      let width = widthPercentage * 500 + "px";
      graphicRow.style.width = width;
    }
  }
});
