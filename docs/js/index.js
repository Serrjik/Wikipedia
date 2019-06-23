;(function () {
	'use strict'

	const markdownResultElement = document.querySelector('#markdown-result')
	// Новые статьи
	const lastArticlesListElement = document.querySelector('#last-articles')
	// Все остальные статьи
	const allArticlesListElement = document.querySelector('#all-articles')
	// Кнопка "Читать полностью"
	const readArticleButton = document.querySelector('#read-article')

	const json = localStorage.getItem('articles')
	const articles = JSON.parse(json)
	// Последний элемент массива статей
	const article = articles[articles.length - 1]

	// Выведем первые 200 символов последней из добавленных статей
	markdownResultElement.innerHTML = marked(article.content.substr(0, 200) + '...')

	// Вывод списка ссылок на все статьи
	let str = ''
	for (let i = 0; i < articles.length; i++) {
		const currentArticle = articles[i]
		str = str + '<li class="other-list__item"><a class="other-list__link" href="article.html?id=' + currentArticle.id + '">' + currentArticle.title + '</a></li>'
	}
	console.log(str)

	allArticlesListElement.innerHTML = str

	// Вывести список 3-х последних статей
	str = ''
	for (let i = articles.length - 3; i < articles.length; i++) {
		const currentArticle = articles[i]
		str = str + '<li class="articles-list-item"><a class="articles-list-link" href="article.html?id=' + currentArticle.id + '">' + currentArticle.title + '</a></li>'
	}
	lastArticlesListElement.innerHTML = str

	// Кнопка "Читать полностью" - действие
	readArticleButton.addEventListener('click', function () {
		// Переходим на страницу article.html и передаем id последней статьи
		location.replace('article.html?id=' + article.id)
	})
})();