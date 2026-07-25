
let articles = [];




let newsContainer = document.getElementById("news-container");
let search = document.getElementById("search");
let featuredCard = document.getElementById("featured-card");

function displayArticles(articleList){

    newsContainer.innerHTML = "";

    for(let article of articleList){

        let card = `

        <div class="news-card"
onclick="window.open('${article.link}','_blank')">

            <img
class="article-image"
src="${article.image}"
alt="${article.title}">

<span class="badge">

${article.category}

</span>
<h2>${article.title}</h2>

            <p>

                By ${article.author}
                •
                ${article.date}

            </p>

            <p>

                ${article.summary}

            </p>

            <a href="${article.link}" target="_blank">

                Read More →

            </a>

        </div>

        `;

        newsContainer.innerHTML += card;

    }

}

function displayWebsite() {

    displayArticles(articles.slice(1));

    let featured = articles[0];

    featuredCard.innerHTML = `

    <div class="featured"
    onclick="window.open('${featured.link}','_blank')">

       <img
class="article-image"
src="${featured.image || 'images/default-news.jpg'}"
alt="${featured.title}">

        <h1>${featured.title}</h1>

        <p>
        By ${featured.author} • ${featured.date}
        </p>

        <p>
        ${featured.summary}
        </p>

        <a href="${featured.link}" target="_blank">
        Read Full Article →
        </a>

    </div>

    `;

}



search.addEventListener("input", function () {

    let searchText = search.value.toLowerCase();

    let filteredArticles = articles.slice(1).filter(function(article){

        return (

article.title.toLowerCase().includes(searchText)

||

article.summary.toLowerCase().includes(searchText)

);

    });

    displayArticles(filteredArticles);

});
async function loadArticles() {

    let response = await fetch(
"https://api.rss2json.com/v1/api.json?rss_url=https://arinyuni.substack.com/feed"
);

let data = await response.json();
console.log(data.items[0]);
articles = data.items.map(function(item){

    return{

        title: item.title,

        author: item.author,

        date: new Date(item.pubDate).toLocaleDateString(
"en-US",
{
    year:"numeric",
    month:"long",
    day:"numeric"
}
),

        summary:
item.description
.replace(/<[^>]*>/g,"")
.substring(0,180) + "...",

       image:
item.enclosure?.link ||
item.thumbnail ||
(item.description.match(/<img[^>]+src="([^">]+)"/)?.[1]) ||
"",

        category: "Politics",

        link: item.link

    };

});
  displayWebsite();

}
loadArticles();


