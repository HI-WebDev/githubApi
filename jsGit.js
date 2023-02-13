let input = document.querySelector(".get-repos input");
let btn = document.querySelector(".get-button");
let result = document.querySelector(".show-data span");
let scroller = document.querySelector(".scroller");

//Scroller
let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

window.addEventListener("scroll", () => {
    let scrollTop = document.documentElement.scrollTop;
    scroller.style.width = `${(scrollTop / height) * 100}%`
});

// Repositries

btn.onclick = function () {
    getRepos()
};

function getRepos() {
    if (input.value == "") {
        result.innerHTML = "<span class='checked'> there is no data </span>";
    } else {
        fetch(`https://api.github.com/users/${input.value}/repos`)
            .then((res) => res.json())
            .then((repos) => {
                result.innerHTML = '';
                repos.forEach((rep) => {
                    let mainDiv = document.createElement("div");
                    let TextDiv = document.createTextNode(rep.name);
                    mainDiv.appendChild(TextDiv);

                    let UrlTag = document.createElement("a");
                    let UrlText = document.createTextNode("Visit");
                    UrlTag.setAttribute("target", "_blank");
                    UrlTag.href = `https://github.com/${input.value}/${rep.name}`
                    UrlTag.appendChild(UrlText);
                    mainDiv.appendChild(UrlTag);

                    let CountStars = document.createElement("span");
                    let CountStarsText = document.createTextNode(`Stars${rep.stargazers_count}`);
                    CountStars.appendChild(CountStarsText);
                    mainDiv.appendChild(CountStars);

                    mainDiv.className = "repos-Box";

                    result.appendChild(mainDiv)



                });

            });
    };

};
