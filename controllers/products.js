const Product = require('../models/products');

const getAllProducts = async(req, res) => {

    const { company, name, sort, select } = req.query;
    const queryObject = {};
    if(company){
        queryObject.company = company;
        console.log(queryObject);
    }
    if(name){
        queryObject.name = {$regex : name, $options : 'i'};      // $regex for pattern matching
        console.log(queryObject);
    }

    let apiData = Product.find(queryObject);       //just Product.find({}); gives all products
                                                    // find(req.query); filters according to the query in url
    if(sort){
        apiData = apiData.sort(sort);
    }

    if(select){
        let remComma2 = select.replace(',',' ');     //to remove comma bw two elements and add a space in url to pass it to select()
        let remComma = select.split(',').join(' ');   // to remove comma bw more than 2 eles and join witha space
        apiData = apiData.select(remComma);
    }

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 10;
    let skip = (page - 1)*limit;

    apiData = apiData.skip(skip).limit(limit);

    const myData = await apiData; 
    console.log(req.query);                       
    res.status(200).json({ myData });
};

const getAllProductsTesting = async(req, res) => {
    
    const myData = await Product.find(req.query).select('price');                        
    res.status(200).json({ myData });
};

module.exports = {getAllProducts, getAllProductsTesting};