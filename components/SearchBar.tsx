// SearchBar.tsx
"use client";

import { scrapeAndStoreProduct } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const SearchBar = () => {
    const router = useRouter();
    const [searchPrompt, setSearchPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const isValidAmazonProductURL = (url: string) => {
        try {
            const parsedURL = new URL(url);
            const hostname = parsedURL.hostname;
            return hostname.includes('amazon.');
        } catch (error) {
            return false;
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const isValidLink = isValidAmazonProductURL(searchPrompt);
        if (!isValidLink) {
            return alert("Provide a valid Amazon link");
        }

        try {
            setIsLoading(true);
            const productUrl = await scrapeAndStoreProduct(searchPrompt);
            if (productUrl) {
                router.push(productUrl); // Use router.push for client-side navigation
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={searchPrompt}
                onChange={(e) => setSearchPrompt(e.target.value)}
                placeholder="Enter Amazon product link"
                className="searchbar-input" />
            
            <button type="submit" className="searchbar-btn" disabled={searchPrompt === ''}>
                {isLoading ? "Searching..." : "Search"}
            </button>
        </form>
    );
};

export default SearchBar;