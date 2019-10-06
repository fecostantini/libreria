const hbs = require('hbs');

hbs.registerHelper('showArticles', articles => {
	out = "<div class='w3-container'>"; // Contenedor de artículos

	articles.forEach((article, index) => {
		out += `<article class='w3-quarter w3-container w3-margin-top'>
          <div class='w3-card-4'>
            <img src='${article.image}' style='width:100%;opacity:0.85'>
            <div class='w3-container'>
              <h4>${article.description}</h3>
              <p>$${article.price}</p>
            </div>
          </div>
        </article>`;

		const isTheLastArticle = index + 1 === articles.length;
		if (isTheLastArticle) out += '</div>'; // Cierre contenedor de artículos
	});

	return out;
});
