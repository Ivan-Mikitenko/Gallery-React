import React from 'react'

function Collection({ name, images }) {
	return (
		<div className='collection'>
			<img className='collection__big' src={images[0]} alt='Item' />
			<div className='collection__bottom'>
				{images.slice(1).map((image, index) => (
					<img
						key={index}
						className='collection__mini'
						src={image}
						alt='Item'
					/>
				))}
			</div>
			<h4>{name}</h4>
		</div>
	)
}

export default Collection
