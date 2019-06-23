;(function () {
	'use strict'

	// Куда вставлять статью
	const articleElement = document.querySelector('#article')
	// Кнопка "Редактировать статью"
	const editArticleButton = document.querySelector('#edit-article')
	// Новые статьи
	const lastArticlesListElement = document.querySelector('#last-articles')

	// Достаем из строки GET-запроса id страницы
	const id = parseInt(location.search.substr(4))
	const json = localStorage.getItem('articles')
	// Все статьи
	const articles = JSON.parse(json)

	// Находим статью, которая соответствует переданному id
	let article = null
	for (let i = 0; i < articles.length; i++) {
		if ( articles[i].id === id ) {
			article = articles[i]
		}
	}
	// Отобразить article
	articleElement.innerHTML = marked(article.content)

	// Вывести список 3-х последних статей
	let str = ''
	for (let i = articles.length - 3; i < articles.length; i++) {
		const currentArticle = articles[i]
		str = str + '<li class="articles-list-item"><a class="articles-list-link" href="article.html?id=' + currentArticle.id + '">' + currentArticle.title + '</a></li>'
	}
	lastArticlesListElement.innerHTML = str

	editArticleButton.addEventListener('click', function () {
		location.replace('new.html?id=' + id)
	})
})();