const Header = (props) =>{
    const{
        searchFilter
    } = props
    return(
        <div className="header">
            <span className="header-title">Книжная полка</span>
            <input type="text" name="search" id="search" 
                className="search" 
                placeholder="Название книги или автор" 
                onChange={(e)=>searchFilter(e.target.value)}
            />
        </div>
    )
}
export default Header