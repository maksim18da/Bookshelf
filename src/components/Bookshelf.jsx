import { useState, useRef, useEffect } from "react"
import Header from "./Header"
import Books from "./Books"
import BookInfo from "./BookInfo"

const Bookshelf = () =>{
    const [books, setBooks] = useState([])
    const [totalBooks, setTotalBooks] = useState(0)
    const [mainPagebuttonStatus, setMainPagebuttonStatus] = useState('active')
    const [shelfButtonStatus, setShelfButtonStatus] = useState('')
    const [savedBooks, setSavedBooks] = useState(() => {
        const saved = localStorage.getItem('savedBooks');
        return saved ? JSON.parse(saved) : [];
    })
    const [selectedBook, setSelectedBook] = useState(null) 

    const timer = useRef(null) 
    const controller = useRef(null)
    const URL = 'https://openlibrary.org'
    const load = async (name) =>{
        const params = new URLSearchParams({q:name,limit:23})
        const res = await fetch(`${URL}/search.json?${params}`)
        const data = await res.json()
        setBooks(data.docs)
        setTotalBooks(data.numFound)
    }
    const searchFilter = (name) => {
        clearTimeout(timer.current)
        controller.current?.abort()       
        if (name.trim().length < 3) {
            setBooks([])
            setTotalBooks(0)
            return
        }
        timer.current = setTimeout(() => load(name.trim()), 200)
    }
    useEffect(() => {
        localStorage.setItem('savedBooks', JSON.stringify(savedBooks));
    }, [savedBooks]);
    useEffect(() => {
            const handleKeyDown = (event) => {
                if (event.key === 'Escape' && selectedBook) {
                    closeBook()
                }
            }
            document.addEventListener('keydown', handleKeyDown)
            return () => {
                document.removeEventListener('keydown', handleKeyDown)
            }
        }, [selectedBook])
    const addToShelf = (book, status) => {
        const isAlreadySaved = savedBooks.some(item => item.key === book.key)
        if (!isAlreadySaved) {
            setSavedBooks(prev => [...prev, {...book, status}])
        }
        else{
            setSavedBooks((prev)=>{
                return prev.map((item)=>{
                    return item.key === book.key ? {...item, status: status} : item
                })
            })
        }
    }
    const openBook = (book) => setSelectedBook(book)
    const closeBook = () => setSelectedBook(null)
    const currentBooks = mainPagebuttonStatus === 'active' ? books : savedBooks
    const wantToReadBooks  = savedBooks.filter((book)=>book.status === 'want-read')
    const readBooks = savedBooks.filter(book => book.status === 'read');
    return(
        <div className="bookshelf">
            <Header searchFilter = {searchFilter}/>
            <div className="sectionsBtns">
                <button className={`main-page ${mainPagebuttonStatus}`}  onClick={()=>{setShelfButtonStatus(''); setMainPagebuttonStatus('active')}}>Поиск</button>
                <button className={`my-shelf ${shelfButtonStatus}`} onClick={()=>{setShelfButtonStatus('active'); setMainPagebuttonStatus('')}}>Моя полка ({savedBooks.length})</button>
            </div>
            <div className="book-section">
                {mainPagebuttonStatus === 'active' ? (
                    <>
                        <span className="books-count">Найдено книг: {totalBooks}</span>
                        <Books books={books} openBook={openBook} isShelf={false} />
                    </>
                ) :(
                    <Books 
                        wantToReadBooks={wantToReadBooks} 
                        readBooks={readBooks} 
                        openBook={openBook} 
                        isShelf={true} 
                    />
                )}
            </div>
             {selectedBook && (
                <BookInfo 
                    book={selectedBook} 
                    closeBookCard={closeBook} 
                    addToShelf={addToShelf}
                    savedBooks = {savedBooks} 
                />
            )}
        </div>
    )
}
export default Bookshelf