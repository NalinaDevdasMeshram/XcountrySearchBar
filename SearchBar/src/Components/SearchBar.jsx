/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState }from "react";
import styles from './SearchBar.module.css';
const SearchBar = () => {
    const [country, setCountry] = useState([]);
    const [countrySearch, setCountrySearch] = useState('');
    const [debounceSearch, setDebounceSearch] = useState('');
   

    const handleSearchBarApi = async() =>{
        try{
            const response = await fetch(`https://restcountries.com/v3.1/all`);
            const responseData = await response.json();
            //   console.log('getting datat', responseData)
              setCountry(responseData);
        }
        catch(error){
              console.error('something went wrong', error.message)
             }
    }
   
    
    const handleSearchCountryNameApi = async(searchItem) => {
         console.log('search', searchItem)
      if(searchItem){   
       try{
                const API_URL =  await fetch(`https://restcountries.com/v3.1/name/${debounceSearch}`);
                const  API_URLResult  = await API_URL.json();
                console.log('Data result', API_URLResult)
                 setCountry(API_URLResult)
              }
              catch(e){
                    console.error(e.message)
              } 
        } 
        else{
            console.log('searchItem', handleSearchBarApi()) // getting promise
            handleSearchBarApi();
        
        }
      
    };
    useEffect(()=>{
        handleSearchBarApi()
    },[])
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceSearch(countrySearch);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [countrySearch]);

    useEffect(() => {
        console.log(debounceSearch)
       handleSearchCountryNameApi(debounceSearch);
    }, [debounceSearch]);

   
    // const filtersearchquery = country.filter((searchItem) =>
    //     searchItem.name.common.toLowerCase().includes(countrySearch.toLowerCase())
    // )
   

  return (
    <div>
     <input type="text" 
      className={styles.searchBox}  
      value = {countrySearch} 
      placeholder="Search for Countries..."
      onChange={(e)=>setCountrySearch(e.target.value)}
      />
      
      <div className={styles.container}>
        { 
            
             country.map((data)=>{
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