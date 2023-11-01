const Product = require("../models/productScema")

const addProuduct = async (req, res) => {
    try {
        let product = new Product(req.body)
        let result = await product.save()

        res.status(200).json({ message: "product save successfully", result })
    } catch (error) {
        res.status(200).json({ message: "Internal Server Error" })
        console.log(error)
    }
}

// //fix
// const getAllProducts = async (req, res) => {
//     try {
//         const result = await Product.find()
//         res.status(200).json({ message: " here are the products ", result })
//     } catch (error) {
//         res.status(200).json({ message: "Internal Server Error" })
//         console.log(error)
//     }
// }

// //fix
// const getProducts = async (req, res) => {
//     try {

//         // Use a single query to find products based on criteria
//         const result = await Product.find({ categories: "fruit" });

//         if (result.length === 0) {
//             // Handle the case where no products match the criteria
//             return res.status(404).json({ message: "No products found" });
//         }

//         // Send a success response with the found products
//         res.status(200).json({ message: "Here are the products", result });
//     } catch (error) {
//         // Handle server errors and log them
//         console.error(error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// };

// //fix
// const findProducts = async (req, res) => {
//     try {
//         const searchStr = req.body.searchString;
//         const query = {
//             $or: [
//                 { name: { $regex: searchStr, $options: 'i' } },
//                 { categories: { $regex: searchStr, $options: 'i' } },
//             ],
//         };
//         const result = await Product.find(query);

//         if (result.length === 0) {
//             return res.status(404).json({ message: "No products found" });
//         }
//         res.status(200).json({ message: "Here are the products", result });
//     } catch (error) {

//         console.error(error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// };

//star
const findProducts = async (req, res) => {
    try {
        const { key, page, limit } = req.query
        // const skip = (page - 1) * limit
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const search = key ? {
            $or: [
                { name: { $regex: key, $options: 'i' } },
                { categories: { $regex: key, $options: 'i' } },
            ]
        } : {}

        //const result = await Product.find(search);
        const result = await Product.find(search)
            .skip(skip)
            .limit(parseInt(limit));

        // if (result.length === 0) {
        //     return res.status(404).json({ message: "No products found",result });
        // }

        res.status(200).json({ message: "Here are the products", result });
    } catch (error) {

        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

//(http://127.0.0.1:7000/api/v2/product/findProducts?key=fr&page=1&limit=2)

//star
// const productDetails = async (req, res) => {
//     try {
//         let result = await Product.findOne({ _id: req.params.id })

//         res.status(200).json({ message: "Product Found", result })
//     } catch (error) {
//         res.status(404).json({ message: "Internal Server Error" })
//         console.log(error)
//     }
// }

const productDetails = async (req, res) => {
    try {
        const result = await Product.findOne({ _id: req.params.id });

        if (result) {
            res.status(200).json({ message: "Product Found", result });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
        console.error(error);
    }
};


module.exports = { addProuduct, findProducts, productDetails }