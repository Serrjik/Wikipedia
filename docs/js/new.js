;(function () {
	'use strict'

	const markdownSourceElement = document.querySelector('#markdown-source')
	const markdownResultElement = document.querySelector('#markdown-result')
	const saveArticleButton = document.querySelector('#save-article-button')
	const articleTitleElement = document.querySelector('#article-title')

	// Достаем из строки GET-запроса id страницы
	const id = parseInt(location.search.substr(4))

	const json = localStorage.getItem('articles')
	// Все статьи
	const articles = JSON.parse(json)

	if ( id ) {
		// Находим статью, которая соответствует переданному id
		let article = null
		for (let i = 0; i < articles.length; i++) {
			if ( articles[i].id === id ) {
				article = articles[i]
			}
		}

		markdownSourceElement.value = article.content
		articleTitleElement.value = article.title

		// Вставим статью в элемент "Предпросмотр статьи "
		const result = marked(markdownSourceElement.value, {breaks: true, gfm: true, silent: false})
		markdownResultElement.innerHTML = result
	}

	markdownSourceElement.addEventListener('keyup', function (){
		const result = marked(markdownSourceElement.value, {breaks: true, gfm: true, silent: false})
		markdownResultElement.innerHTML = result
	})

	// Создание новой статьи или редактирование существующей
	saveArticleButton.addEventListener('click', function () {
		if ( id ) {
			for (let i = 0; i < articles.length; i++) {
				if ( articles[i].id === id ) {
					articles[i].title = articleTitleElement.value
					articles[i].content = markdownSourceElement.value
				}
			}
		} else {
			const newArticle = {
				id: 0,
				title: articleTitleElement.value,
				content: markdownSourceElement.value
			}

			// console.log(articles)
			newArticle.id = articles.length + 1
			articles.push(newArticle)
		}

		localStorage.setItem('articles', JSON.stringify(articles))

		if ( id ) {
			location.replace('article.html?id=' + id)
		} else {
			location.replace('article.html?id=' + articles[articles.length - 1].id)
		}
	})
})();