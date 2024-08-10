"use client"

import { scrapeAndStoreProduct } from "@/lib/actions"
import { FormEvent, useState } from "react"

const SearchBar = () => {
  const [searchPrompt, setSearchPrompt] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const isValidAmazonProductURL = (url: string) => {
    try{
        const parsedURL = new URL(url)
        const hostname = parsedURL.hostname
        if(hostname.includes('amazon.com') || 
            hostname.includes('amazon.') ||
            hostname.includes('amazon.com')){
                return true
            }
    } catch(error){
        return false
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValidLink = isValidAmazonProductURL(searchPrompt);
    if(!isValidLink){
        return alert("Provide valid amazon link")
    }

    try{
      setIsLoading(true)
      //now we scrape product page
      const product = await scrapeAndStoreProduct(searchPrompt); //bec we are using await, handlesubmit has to be async

    } catch(error){
        console.log(error)
    } finally{
        setIsLoading(false)
    }
    
  }

  return (
    <form
    className="flex flex-wrap gap-4 mt-12"
    onSubmit={handleSubmit}
    >
        <input 
            type="text" 
            value={searchPrompt}
            onChange={(e) => setSearchPrompt(e.target.value)}
            placeholder="Enter amazon product link"
            className="searchbar-input"/>
        
        <button type="submit" className="searchbar-btn" disabled={searchPrompt === ''}>
            {isLoading? "Searching...":"Search"}
        </button>
    </form>
  )
}

export default SearchBar