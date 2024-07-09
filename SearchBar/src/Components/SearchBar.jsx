import { useEffect, useState } from "react";
import styles from './SearchBar.module.css'
const SearchBar = () => {
    const [country, setCountry] = useState([])

    const handleSearchBar =async()=>{
        try{
            const response = await fetch(`https://restcountries.com/v3.1/all`);
             const responseData = await response.json();
             console.log('getting datat', responseData)
             setCountry(responseData);
        }catch{
              console.log('something went wrong')
        }
    }
    useEffect(()=>{
        handleSearchBar()
    },[])
  return (
    <div className={styles.countryCard}>
     <input type="text" className={styles.searchBox} placeholder="Search For Search"/>
      <div>
        {
           <img/>
           <h3></h3> 
        }
        
      </div>
    </div>
  )
}

export default SearchBar