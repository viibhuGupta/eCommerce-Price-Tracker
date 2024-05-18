'use server'
import { revalidatePath } from "next/cache";
import Product from "../models/product.model";
import { connectToDB } from "../mongoose";
import { scrapeAmazonProduct } from "../scraper";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";

export async function scrapeAndStoreProduct (productURL : string){
    if (!productURL) {
        return
    }

    try {
        connectToDB();

        const scrapedProduct = await scrapeAmazonProduct(productURL);

        if(!scrapedProduct) return;

        let product = scrapedProduct;

        const existingProduct = await Product.findOne({ url : scrapedProduct.url});  

        if(existingProduct){
            const updatePriceHistory : any = [
                ...existingProduct.priceHistory,
                { price : scrapedProduct.currentPrice},
            ]

            product = {
                ...scrapedProduct,
                priceHistory : updatePriceHistory,
                lowestPrice : getLowestPrice(updatePriceHistory),
                highestPrice : getHighestPrice(updatePriceHistory),
                averagePrice : getAveragePrice(updatePriceHistory),

            }
        }

        const newProduct = await Product.findOneAndUpdate(
            { url : scrapedProduct.url},
            product,
            { upsert : true , new : true}
        )

        revalidatePath (`/products/${newProduct._id}`);
        
    } catch (error : any) {
        throw new Error (`Failed to Create/upd ate Product : ${error.message}`)
    }
}
