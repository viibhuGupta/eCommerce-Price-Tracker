'use server'
import { revalidatePath } from "next/cache";
import Product from "../models/product.model";
import { connectToDB } from "../mongoose";
import { scrapeAmazonProduct } from "../scraper";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";
import { User } from "@/types";

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
            //console.log(product); //  here i am getting all the details 
        }

        const newProduct = await Product.findOneAndUpdate(
            { url : scrapedProduct.url},
            product,
            { upsert : true , new : true}
        )

        //    console.log(newProduct); // here i am not getting all details

        revalidatePath (`/products/${newProduct._id}`);

        
    } catch (error : any) {
        throw new Error (`Failed to Create/upd ate Product : ${error.message}`)
    }
}

// fetch the product 
export async function getProductById( productId : string){
    try {
    connectToDB();

    const product = await Product.findOne({ _id : productId});

    if(!product) return null;

    return product;

    } catch (error) {
        console.log(error);
    }
}

// get all products
export async function getAllProducts(){
    try {
        connectToDB();

        const products = await Product.find();

        return products;

    } catch (error) { 
        console.log(error)
    }
}

export async function getSimilarProducts(productId : string){
    try {
        connectToDB();

        const currentProduct = await Product.findById(productId);

        if(!currentProduct) return null;

        const similarProducts = await Product.find({
            _id : { $ne : productId}
        }).limit(3);

        return similarProducts;
        
    } catch (error) {
        
    }
}

// export async function addUserEmailToProduct(productId : string , userEmail : string) {

//     try {
//         const product = await Product.findById(productId);

//         if(!product) return;

//         const userExists  = product.users.some((user : User) => user.email === userEmail);
        
//         if(!userExists) {
//             product.user.push({email : userEmail});

//             await product.save();

//             const emailContent  = await generateEmailBody(product , 'WELCOME');

//             await sendEmail(emailContent,[userEmail]);
//         }
        
//     } catch (error) {
//         console.log(error)
        
//     }

// }
