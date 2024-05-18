'use server'

import { scrapeAmazonProduct } from "../scraper";

export async function scrapeAndStoreProduct (productURL : string){
    if (!productURL) {
        return
    }
    try {
        scrapeAmazonProduct(productURL);

        
    } catch (error : any) {
        throw new Error (`Failed to Create/update Product : ${error.message}`)
    }
}
