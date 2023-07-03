import React, { useEffect, useState } from 'react'
import './index.scss'
import Collection from './components/Collection'
import { categoryArr } from './data'

function App() {
	const LIMIT_ON_PAGE = 3

	const [categotyId, setcategotyId] = useState(0)
	const [page, setPage] = useState(1)
	const [isLoading, setIsLoading] = useState(true)
	const [searchValue, setSearchValue] = useState('')
	const [collections, setCollections] = useState([])

	useEffect(() => {
		const category = categotyId !== 0 ? `category=${categotyId}` : ''
		const pageParam = `page=${page}&limit=${LIMIT_ON_PAGE}`

		setIsLoading(true)
		fetch(
			`https://64a2a701b45881cc0ae57b06.mockapi.io/collection?${pageParam}&${category}`
		)
			.then(res => res.json())
			.then(json => setCollections(json))
			.catch(err => alert(`Ошибка запроса данных! Ошибка: ${err}`))
			.finally(() => setIsLoading(false))
	}, [categotyId, page])

	console.log(window.webkitURL)

	return (
		<div className='App'>
			<h1>Моя коллекция фотографий</h1>
			<div className='top'>
				<ul className='tags'>
					{categoryArr.map((item, index) => (
						<li
							key={index}
							onClick={() => setcategotyId(index)}
							className={categotyId === index ? 'active' : ''}
						>
							{item.name}
						</li>
					))}
				</ul>
				<input
					value={searchValue}
					onChange={e => setSearchValue(e.target.value)}
					className='search-input'
					placeholder='Поиск по названию'
				/>
			</div>
			<div className='content'>
				{isLoading ? (
					<h2>Идёт загрузка...</h2>
				) : (
					collections
						.filter(obj =>
							obj.name.toLowerCase().includes(searchValue.toLowerCase())
						)
						.map((item, index) => (
							<Collection key={index} images={item.photos} name={item.name} />
						))
				)}
			</div>
			<ul className='pagination'>
				{[...Array(5)].map((_, index) => (
					<li
						key={index}
						onClick={() => setPage(index + 1)}
						className={page === index + 1 ? 'active' : ''}
					>
						{index + 1}
					</li>
				))}
			</ul>
		</div>
	)
}

export default App
