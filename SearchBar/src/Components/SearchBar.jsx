import { useEffect, useState } from "react";
import styles from './SearchBar.module.css'
const SearchBar = () => {
    const [country, setCountry] = useState([])
    const [countrySearch, setCountrySearch] = useState('')

    const handleSearchBar =async()=>{
        try{
            const response = await fetch(`https://restcountries.com/v3.1/all`);
             const responseData = await response.json();
              console.log('getting datat', responseData)
              setCountry(responseData);
        }
        catch(e){
              console.error('something went wrong', e.message)
        }
    }
    useEffect(()=>{
        handleSearchBar()
    },[])
    const handleChangeSearch =(e)=>{
       setCountrySearch(e.target.value);
    }

    const filtersearchquery = country.filter((searchItem)=>
        searchItem.name.common.toLowerCase().includes(countrySearch.toLowerCase())
    )
     console.log("filterdata",filtersearchquery)

  return (
    <div>
     <input type="text" 
      className={styles.searchBox}  
      value = {countrySearch} 
      placeholder="Search for Countries..."
      onChange={handleChangeSearch}
      />
      
      <div className={styles.container}>
        { 
            
            filtersearchquery.map((data)=>{
                // console.log('filtersearchquery',filtersearchquery)
        return(
               <div className={styles.countryCard} key={data.cca3}>
                <img className={styles.imgSrc} src={data.flags.png} alt={data.cca3}/>
                <h3> {data.name.common}</h3> 
                </div>
                )
             })
        }
        
      </div>
    </div>
  )
}

export default SearchBar