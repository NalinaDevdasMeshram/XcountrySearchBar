import { useEffect } from "react";

const SearchBar = () => {

    const handleSearchBar =async()=>{
        try{
            const response = await fetch(`https://restcountries.com/v3.1/all`);
             const responseData = await response.json();
             console.log('getting datat', responseData)
        }catch{
              console.log('something went wrong')
        }
    }
    useEffect(()=>{
        handleSearchBar()
    },[])
  return (
    <div>
        SearchBar
    </div>
  )
}

export default SearchBar