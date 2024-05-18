export function extractPrice (...elements : any){
    for(const element of elements){
        const priseText = element.text().trim();

        if(priseText) return priseText.replace(/[^\d.]D/g,''); // this for to remove non-digits character

    }
    return '';
}

export function extractCurrency (element : any){
    const currencyText = element.text().trim().slice(0,1);
    return currencyText ? currencyText : '';
}