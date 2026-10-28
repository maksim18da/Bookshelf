import { useEffect, useState } from "react"
import BookInfo from "./BookInfo"

const BookCard = (props) =>{
    const{
        books,
        openBook,
    } = props
    const [loaded, setLoaded] = useState(false)

    return(
        <section className="AllBooks">
            {books.map((elem)=>(
                <div className="bookCard" key={elem.key} onClick={()=>openBook(elem)}>
                    <img 
                        src={`https://covers.openlibrary.org/b/id/${elem.cover_i}-M.jpg`} 
                        alt={elem.title} 
                        onLoad={()=>setLoaded(true)}
                        className={loaded ? 'cover cover--loaded' : 'cover'}
                    />
                    <div className="about-book">
                        <span className="bookName">{elem.title}</span>
                        <div className="author-year">
                            <span className="author">{elem.author_name}</span>
                            <span className="year">{elem.first_publish_year}</span>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    )
}
export default BookCard