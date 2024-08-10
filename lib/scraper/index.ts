"use server"

import axios from 'axios'; // to make api calls
import * as cheerio from 'cheerio'; // to parse and manipulate html/xml data
import { extractCurrency, extractDescription, extractPrice } from '../utils';


export async function scrapeAmazonProduct(url: string) {
    if(!url){
        return;
    }

    // Bright data proxy config


    const username = String(process.env.BRIGHT_DATA_USERNAME);
    const password = String(process.env.BRIGHT_DATA_PASSWORD);
    const port = 22225;
    const session_id = (1000000*Math.random()) | 0;
    const options = {
        auth: {
            username: '${username}-session-${session_id}',
            password,
        },
        host: 'brd.superproxy.io',
        port,
        rejectUnauthorized: false,
    }

    try{
        //fetch product page
        const response = await axios.get(url, options);
        const $ = cheerio.load(response.data)

        //Extract product title 
        const title = $('#productTitle').text().trim()

        const description = extractDescription($)
        
        const currentPrice = extractPrice(
            $('.priceToPay span.a-price-whole'),
            //$('a.size.base.a-color-price'),
            $('a-button-selected .a-color-base'),
            $('.a-price.a-text-price.a-size-medium.apexPriceToPay .a-offscreen')
            // space <elem> indicates elem is child of preceding class
            // no space indicates both classes are applied to the same element.
            // Example: <div class="a-price a-text-price">...</div>
        );

        const originalPrice = extractPrice(
            $('#priceblock_ourprice'), // hash represents element ID
            $('.a-price.a-text-price span.a-offscreen'),
            $('#listPrice'),
            $('#priceblock_dealprice'),
            $('a.size.base.a-color-price')
            // space <elem> indicates elem is child of preceding class
            // no space indicates both classes are applied to the same element.
            // Example: <div class="a-price a-text-price">...</div>
        );

        const outOfStock = $('#availability span').text().trim().toLowerCase() === 'currently unavailable';

        const images = 
            $('#imgBlkFront').attr('data-a-dynamic-image') || 
            $('#landingImage').attr('data-a-dynamic-image') || 
            '{}'

        const imageUrls = Object.keys(JSON.parse(images))   

        const currency = extractCurrency($('.a-price-symbol'))

        const discountRate = $('.savingsPercentage').text().trim().replace(/[-%]/g, "");
        
        // Create data object with useful scraped information
        
        const data = {
            url,
            currency: currency || '$',
            image: imageUrls[0],
            title,
            currentPrice: Number(currentPrice) || Number(originalPrice),
            originalPrice: Number(originalPrice) || Number(currentPrice),
            priceHistory: [],
            discountRate: Number(discountRate),
            category: 'category',
            reviewsCount: Number($('#acrCustomerReviewText').text().trim().replace(/[^0-9.]/g, '')),
            stars: Number($('.a-popover-trigger.a-declarative span.a-size-base.a-color-base').text().trim()),
            isOutOfStock: outOfStock,
            description,
            lowestPrice: Number(currentPrice) || Number(originalPrice),
            highestPrice: Number(originalPrice) || Number(currentPrice),
            averagePrice: Number(currentPrice) || Number(originalPrice)
        }
        
        return data;


    } catch (error: any){
        throw new Error("Failed to scrape product: ${error.message}")
    }

}