"use client"
import React, { FormEvent, useState } from 'react'

const isValidAmazonProductURL = (url : string ) => {
  try {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;

    if (
      hostname.includes('amazon.in') ||
      hostname.includes('amazon.com') ||
      hostname.includes('amazon')
    ) {
       return true;
    }
  } catch (error) {
    return false;
  }

}

const Searchbar = () => {

  const [searchPrompt , setSearchPrompt] = useState('');

  const handleSubmit = (event : FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const isValidLink = isValidAmazonProductURL (searchPrompt); 
  }

  return (
   <>
   <form 
   action="" 
   className="flex flex-wrap gap-4 mt-12"
   onClick={handleSubmit}
   >

    <input 
    type="text"
    placeholder ='Enter product link'
    className='searchbar-input'
    onChange={(e) => setSearchPrompt(e.target.value)}
     />
    <button  
    className="searchbar-btn"
    type='submit'
    >
      Search
    </button>
   </form>
   </>
  )
}

export default Searchbar