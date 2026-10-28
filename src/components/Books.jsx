import BookCard from "./BookCard"

const Books = ({ books, wantToReadBooks, readBooks, openBook, isShelf }) => {
    
    if (!isShelf) {
        return (
            <div className="book-cards">
                <BookCard books={books} openBook={openBook} />
            </div>
        )
    }

    return (
        <div className="book-cards">
            {wantToReadBooks.length > 0 && (
                <div className="shelf-section">
                    <h2 className="shelf-title">Хочу прочитать ({wantToReadBooks.length})</h2>
                    <div className="books-grid">
                        <BookCard books={wantToReadBooks} openBook={openBook} />
                    </div>
                </div>
            )}

            {readBooks.length > 0 && (
                <div className="shelf-section">
                    <h2 className="shelf-title">Прочитано ({readBooks.length})</h2>
                    <div className="books-grid">
                        <BookCard books={readBooks} openBook={openBook} />
                    </div>
                </div>
            )}
            
            {wantToReadBooks.length === 0 && readBooks.length === 0 && (
                <p className="empty-shelf">На вашей полке пока нет книг</p>
            )}
        </div>
    )
}
export default Books