const countriesContainer = document.querySelector('.countries-container')
const countryRegion = document.querySelector('.country-select')
const search = document.querySelector("#srch")
const themeSwitch= document.querySelector(".mode")

let allData 
fetch("https://restcountries.com/v3.1/all?fields=name,capital,flags,population,region")
.then((res)=>res.json())
.then((data)=>{
    renderCountries(data)
    allData=data
})




let url = "https://restcountries.com/v3.1/all?fields=name,capital,flags,population,region"
fetch(url).then((res)=>res.json())
.then(renderCountries)


countryRegion.addEventListener('change',(e)=>{
    const url = `https://restcountries.com/v3.1/region/${countryRegion.value}`;
    fetch(url).then((res)=>res.json())
.then(renderCountries)
})

function renderCountries(data){
    countriesContainer.innerHTML=''
    data.forEach((country)=>{
        
        const countryCard = document.createElement("a")
        // countryCard.style.color="#1f2937"
        countryCard.classList.add("country-card")
        countryCard.href = `./coun_info.html?name=${country.name.common}`
        
const cardHTML = 
    `
            <img src="${country.flags.svg}" alt="flag">
            <div class="content">
                <h3>${country.name.common}</h3>
                <p><b>Population: </b>${country.population.toLocaleString('en-IN')}</p>
                <p><b>Capital:</b> ${country.capital}</p>
                <p><b>Region:</b> ${country.region}</p>
                
            </div>
    `
countryCard.innerHTML=cardHTML
countriesContainer.append(countryCard)
        // console.log(country)
    })
}


search.addEventListener("input",()=>{
// console.log(event.target.value)
const filtered = allData.filter((country) => {
  return country.name.common.toLowerCase().includes(event.target.value.toLowerCase());
});
renderCountries(filtered)
})

themeSwitch.addEventListener('click',()=>{
    const isDark = document.body.classList.toggle('dark');

  if (isDark) {
    themeSwitch.innerHTML = '<p><i class="fa-regular fa-sun"></i> Light Mode</p>';
  } else {
    themeSwitch.innerHTML = '<p> <i class="fa-regular fa-moon"></i> Dark Mode</p>';
  }
});
