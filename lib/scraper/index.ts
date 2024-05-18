import axios from "axios"
import * as cheerio from 'cheerio'
import { extractCurrency, extractDescription, extractPrice } from "../utils";
import { start } from "repl";

export async function scrapeAmazonProduct (url : string){
    if(!url ) return;


    // curl --proxy brd.superproxy.io:22225 --proxy-user brd-customer-hl_713ed976-zone-pricewise:fimfm086uxo4 -k "http://lumtest.com/myip.json"

    // Bright Proxy Configuration
    const username = String(process.env.BRIGHT_DATA_USERNAME);
    const password = String(process.env.BRIGHT_DATA_PASSWORD);
    const port = 22225;
    const session_id = (1000000 * Math.random()) | 0;

    const options = {
        auth : {
            username : `${username} -session-${session_id}`,
            password,
        },
        host : 'brd.superproxy.io',
        port,
        rejectUnauthorized : false,

    }

    try {
        //  Fetch the Product Page
        const response = await axios.get(url, options);
        const $ = cheerio.load(response.data);

        // Extract the product title 
        const title = $('#productTitle').text().trim();

        const currentPrice = extractPrice(
            $('.a-price-symbol .a-price-whole'),
            $('.a-price .a-price-whole  .priceToPay '),
            $('.priceToPay span.a-price-whole'),
            $('a.size.base.a-color-price '),
            $('.a-button-selected .a-color-base '),
            $(' span.a-price-whole '),
        );

        const orginalPrice = extractPrice(
            $('#priceblock_ourprice'),
            $('.a-price.a-text-price span.a-offscreen'),
            $('#listPrice'),
            $('#prcoloiceblock_dealprice'),
            $('.a-size-base.a-r-price'),
        );

        const outofStock = $('#availability span').text().trim().toLocaleLowerCase() === 'currently unavailable';

        const images = 
            $('#imgBlkFront').attr('data-a-dynamic-image') ||
            $('#landingImage').attr('data-a-dynamic-image')||
            '{}';

        const imageUrls = Object.keys(JSON.parse(images));
 
        const currency = extractCurrency($('.a-price-symbol'))

        const discountRate  =  $('.savingsPercentage').text().replace(/[-%]/g,"");

        const description = extractDescription($);


        const data = {
            url,
            currency : currency || "₹",
            images : imageUrls[0],
            title,
            currentPrice : Number(currentPrice) || Number(orginalPrice),
            orginalPrice : Number(orginalPrice) || Number(currentPrice),
            priceHistory : [],
            discountRate : Number(discountRate),
            category : 'category',
            reviewsCount:100,
            stars : 4.5,
            isOutOfStock : outofStock,
            description ,
            lowestPrice : Number(currentPrice) || Number(orginalPrice),
            highestPrice : Number(orginalPrice) || Number(currentPrice),
            averagePrice : Number(currentPrice) || Number(orginalPrice),
        }
        return data;
        

        
    } catch (error : any) {
        throw new Error (`Failed to Scrape Product Data : ${error.message}`)
        
    }
}