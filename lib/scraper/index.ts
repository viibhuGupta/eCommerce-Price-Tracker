import axios from "axios"
import * as cheerio from 'cheerio'

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

        console.log({title});
        
        

        
    } catch (error : any) {
        throw new Error (`Failed to Scrape Product Data : ${error.message}`)
        
    }
}