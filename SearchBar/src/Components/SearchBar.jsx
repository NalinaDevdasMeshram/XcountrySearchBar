import {useEffect, useState } from "react";
import styles from './SearchBar.module.css';
const SearchBar = () => {
    const [country, setCountry] = useState([]);
    const [countrySearch, setCountrySearch] = useState('');
     const [debounceSearch, setDebounceSearch] = useState('');
   
    
      // getting All country data in mounting phase
  const handleSearchBarApi = async() =>{  
        try{
            const response = await fetch(`https://restcountries.com/v3.1/all`);
            const responseData = await response.json();
              // console.log('getting datat', responseData)
             setCountry(responseData);
        }
        catch(error){
          
              console.error('something went wrong', error.message)
             }
    }
    useEffect(()=>{
      handleSearchBarApi();
    },[])
    // getting data depen upon user typing
    // const handleSearchCountryNameApi = async(searchItem) => {
    //      console.log('search', searchItem)
    //   if(searchItem){   
    //    try{
    //             const API_URL =  await fetch(`https://restcountries.com/v3.1/name/${searchItem}`);
    //             const  API_URLResult  = await API_URL.json();
    //             console.log('Data result', API_URLResult)
    //              setCountry(API_URLResult)
    //           }
    //           catch(e){
    //                 console.error(e.message)
    //           } 
    //     } 
    //     else{
    //          console.log('searchItem', handleSearchBarApi()) // getting promise
    //         handleSearchBarApi();
        
    //     }
      
    // };
    // debouncing 
    
    useEffect(() => {
         
        const DebounceApi = setTimeout(() => {
          console.log('debouncing search', DebounceApi)
          
            setDebounceSearch(countrySearch);
           
        }, 500);
        // console.log('cleartimeout',clearTimeout(DebounceApi))
          return () => clearTimeout(DebounceApi)
        }, [countrySearch]);

    // useEffect(() => {
    //     console.log("debounceSearch", debounceSearch)
    //    handleSearchCountryNameApi(debounceSearch);
    // }, [debounceSearch]);

   
   const filtersearchquery = country.filter(searchName =>
    searchName.name.common.toLowerCase().includes(debounceSearch.toLowerCase())
  ) 
   

  return (
    <div className={styles.searchContainer}>
     <input 
     type="text" 
      className={styles.searchBox}  
      value = {countrySearch} 
      placeholder="Search for countries..."
      onChange={(e) => setCountrySearch(e.target.value)}
      />
      <div className={styles.container}>
      {console.log('county', styles.countryCard)}
        {filtersearchquery.map(data =>(
        // console.log('filtersearchquery',filtersearchquery)
        //  console.log('county', styles.countryCard)
          <div className="countryCard" key={data.cca3}>
            <img 
                className={styles.imgSrc} 
                src={data.flags.png} 
                alt={data.cca3}
                />
                <h3>{data.name.common}</h3> 
                </div>
                ))}
         </div>
     </div>
  );
}

export default SearchBar