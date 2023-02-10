const form = document.querySelector("form");
const input = document.querySelector("#city");
const display = document.querySelector("#display");
const cities = document.querySelector("#cities");
const citiesAnc = [];


form.addEventListener("submit", (e) => {
    e.preventDefault();
    let msg = ""
    fetch(`http://localhost:3000/weather?${input.name}=${input.value}`)
        .then((res) => {
            res.json().then((res) => {
                if (res.desc) {
                    display.innerHTML = ` It is ${res.desc[0]} in ${res.location} at ${res.time}. <br>It is ${res.tempertaure} &#xb0;c but it feels like ${res.feelslike} &#xb0;c.`
                    for (const city of res.cities) {
                        const li = document.createElement("li");
                        li.innerHTML = `<a class="citiesAnc" href="/weatherGS?lat=${city.lat}}&lon=${city.lon}}&name=${city.name}}">${city.name}</a>`
                        cities.append(li);
                        citiesAnc.push(li);
                        active(li)
                    }
                } else {
                    display.innerHTML = res.msg
                }
            })
        })
})

function active(li) {
    li.addEventListener("click", (e) => {
        e.preventDefault();
        fetch(li.firstChild.href)
            .then((res) => {
                res.json().then((res) => {
                    if (res.desc) {
                        display.innerHTML = ` It is ${res.desc[0]} in ${res.location} at ${res.time}. <br>It is ${res.tempertaure} &#xb0;c but it feels like ${res.feelslike} &#xb0;c.`
                    } else {
                        display.innerHTML = res.msg
                    }
                })
            })
    })
}