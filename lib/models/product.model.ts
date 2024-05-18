import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    url : { type: String , required : true , unique : true},
    currency : { type : String , requried : true},
    image : { type : String , required : true},
    title : { type : String , required : true},
    currencyPrice : { type : Number , required : true},
    orginalPrice : { type : Number , required : true},
    priceHistory : [
        {
            price : { type : Number , requried : true},
            date : { type : Date , default : Date.now}
        },
    ],
    lowesetPrice : { type : Number},
    highestPrice : { type : Number},
    averagePrice : { type : Number},
    discountRate : { type : Number},
    category : { type : String},
    reviewsCount : { type : Number},
    isOutOfStock : { type : Boolean , default : false},
    users : [
        { email : { type : String , required : true}}
    ], default : [],
} , {timestamps:true} );

const Product = mongoose.models.Product || mongoose.model('Product' , productSchema);

export default Product;