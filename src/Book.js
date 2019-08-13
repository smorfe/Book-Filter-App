import React from 'react';

function BookList(props) {
	const bookListings = props.books.map((book) => 
		<li key={book.id}>
			
				{book.volumeInfo.imageLinks && (
					<div className="book-image">
						<img src={book.volumeInfo.imageLinks.thumbnail} 
							alt={book.volumeInfo.title}
							style={{ width: 200 }} />
					</div>
				)}
			

			<div className="book-content"
				style={{ width: book.volumeInfo.imageLinks ? '65%' : '100%' }}
			>
				{book.volumeInfo.previewLink ? (
					<h4><a 
						target="_blank" 
						rel="noopener noreferrer"
						href={book.volumeInfo.previewLink}>
						{book.volumeInfo.title}
					</a></h4>
				) : (
					<h4>{book.volumeInfo.title}</h4>
				)}

				{book.volumeInfo.categories && (
					<p>
						<strong>Categories: </strong>
						
						{book.volumeInfo.categories
							.map((cat, id) => {
								return(
									<span key={id}>{cat}</span>
								)})
							.reduce((prev, curr) => [prev, ', ', curr])}
					</p>
				)}
				
				{book.volumeInfo.description && (
					<p>{book.volumeInfo.description}</p>
				)}
			</div>
		</li>
	)

	return(
		<ul>{bookListings}</ul>
	)
}

export default BookList;
