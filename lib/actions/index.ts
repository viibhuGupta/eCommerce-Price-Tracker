'use server'

import { connectToDB } from "../mongoose";
import { scrapeAmazonProduct } from "../scraper";

export async function scrapeAndStoreProduct (productURL : string){
    if (!productURL) {
        return
    }

    try {
        connectToDB();

        const scrapedProduct = await scrapeAmazonProduct(productURL);

        if(!scrapedProduct) return;

        
    } catch (error : any) {
        throw new Error (`Failed to Create/update Product : ${error.message}`)
    }
}
