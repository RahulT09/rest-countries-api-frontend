const countryName = new URLSearchParams(location.search).get('name');
let flagimg = document.querySelector(".country-detail img")
let countName = document.querySelector(".country-detail h1")
let natName = document.querySelector(".native-name")
let popu = document.querySelector(".population")
let region = document.querySelector(".region")
let  subReg = document.querySelector(".sub-region")
let  capital= document.querySelector(".capital")
let  topd= document.querySelector(".tldomain")
let  currency= document.querySelector(".currency")
let lang = document.querySelector(".lang")
let bord = document.querySelector(".borders")
let btn = document.querySelector(".back-btn")
const themeSwitch= document.querySelector(".mode")

btn.href="./index.html"

fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}?fullText=true`)
  .then((res) => {
    if (!res.ok) throw new Error("Country not found");
    return res.json();
  })
  .then(([country]) => {
    console.log([country]);
  flagimg.src=country.flags.svg
  countName.innerHTML = country.name.common 
  if(country.name.nativeName){
    natName.innerHTML=(Object.values(country.name.nativeName)[0].common)
  }
  popu.innerHTML=country.population.toLocaleString('en-IN')
  region.innerHTML = country.region
  subReg.innerHTML = country.subregion
  capital.innerHTML = country.capital
  topd.innerHTML = (Object.values(country.tld))
  currency.innerHTML = (Object.values(country.currencies)[0].name)
  lang.innerHTML = (Object.values(country.languages).join(", "))
})
 

 fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}?fullText=true`)
  .then((res) => res.json())
  .then((data) => {
    const country = data[0];
    if (country.borders) {
      country.borders.forEach((border) => {
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => {
            console.log(borderCountry);
            
            let borderTag = document.createElement("a")
            borderTag.innerHTML=borderCountry.name.common
            borderTag.href=(`coun_info.html?name=${borderCountry.name.common}`)
            bord.append(borderTag)
          })
          
      });
    }
  })
  

themeSwitch.addEventListener('click',()=>{
  const isDark = document.body.classList.toggle('dark');

if (isDark) {
  themeSwitch.innerHTML = '<p><i class="fa-regular fa-sun"></i> Light Mode</p>';
} else {
  themeSwitch.innerHTML = '<p> <i class="fa-regular fa-moon"></i> Dark Mode</p>';
}
});


