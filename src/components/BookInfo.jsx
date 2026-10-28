import { useEffect, useState } from "react"

const BookInfo = (props) =>{
    const{
        book,
        closeBookCard,
        closeBook,
        addToShelf,
        savedBooks,
    } = props
    const [description, setDescription] = useState('')
    const [topics, setTopics] = useState([])
    useEffect(()=>{
        const loadbookDescription = async(title, author)=>{
            const searchQuery = `"${title}" ${author || ""}`.trim()
            const params = new URLSearchParams({
                action: "query",
                generator: "search",           
                gsrsearch: searchQuery,       
                gsrlimit: 1,                   
                prop: "extracts|categories",   
                exintro: 1,
                explaintext: 1,
                cllimit: "max",                
                clshow: "!hidden",
                format: "json",
                formatversion: 2,
                origin: "*",
            });
            const res = await fetch(`https://ru.wikipedia.org/w/api.php?${params}`)
            const data = await res.json()
            setDescription(data.query.pages[0].extract)
            const rawCategories = data.query.pages[0].categories 
            const clearTopics = rawCategories.map((elem)=>{
                return {...elem, title: elem.title.replace('Категория:','')}
            })
            setTopics(clearTopics)
        }
        loadbookDescription(book.title, book.author_name)
    },[book.title, book.author_name])

    let btnWantText = 'Хочу прочитать';
    let btnReadText = 'Прочитано';

    const savedBook = savedBooks.find((item)=>item.key === book.key)
    if (savedBook){
        if (savedBook.status === 'want-read') btnWantText = 'В разделе: "Хочу прочитать"'
        if (savedBook.status === 'read') btnReadText = 'В разделе: "Прочитано"'
    }
    return(
        <div className={`overlay ${closeBook ? 'close' : ''}`}>
            <div className="bookInfo">
                <img src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} alt={book.title}/>
                <div className="textInfo-buttons">
                    <span className="bookName">{book.title}</span>
                    <span className="author-year">{book.author_name} · первое издание {book.first_publish_year}</span>
                    <span className="description">{description}</span>
                    <div className="topics">
                        {topics.map((elem)=>(
                            <span className="topicName">{elem.title}</span>
                        ))}
                    </div>
                    <div className="btns">
                        <button 
                            className="want-read" onClick={()=>{addToShelf(book, 'want-read');closeBookCard(); console.log(book.status)}}
                        >{btnWantText}</button>
                        <button className="read" onClick={()=>{addToShelf(book, 'read');closeBookCard();}}>{btnReadText}</button>
                        <button className="close" onClick={()=>closeBookCard()}>Закрыть</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default BookInfo