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

const productDetails = async (req, res) => {
    try {
        const result = await Product.findOne({ _id: req.params.id });

        if (result) {
            res.status(200).json({ message: "Product Found", result });
        }
        else {
            res.status(404).json({ message: "Product not found hi" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
        console.error(error);
    }
};

const productRating = async (req, res) => {
    const productId = req.params.id;
    const { star, review, userId, userName, userPhoto } = req.body;
    try {
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        let alreadyRated = product.rating.find(
            (rating) => rating.postedby?.toString() === userId.toString()
        );

        if (alreadyRated) {
            const updateRating = await Product.updateOne(
                {
                    "rating": { $elemMatch: alreadyRated }
                },
                {
                    $set: {
                        "rating.$.star": star,
                        "rating.$.review": review,
                        "rating.$.userName": userName,
                        "rating.$.userPhoto": userPhoto,
                    }
                },
                {
                    new: true
                }
            );
        } else {
            const rateProduct = await Product.findByIdAndUpdate(
                productId, {
                $push: {
                    rating: {
                        star: star,
                        review: review,
                        userName: userName,
                        userPhoto: userPhoto,
                        postedby: userId,
                    }
                }
            },
                {
                    new: true
                }
            );
        }

        const getAllRating = await Product.findById(productId);
        let totalRating = getAllRating.rating.length;
        let ratingSum = getAllRating.rating.map((item) => item.star).reduce((prev, curr) => prev + curr, 0);
        let actualRating = Math.round(ratingSum / totalRating);

        const finalProduct = await Product.findByIdAndUpdate(
            productId, {
            totalRating: actualRating
        },
            { new: true }
        );

        return res.status(200).json({ message: "Thanks for Feedback", product: finalProduct });

        // return res.status(200).json({ message: "Request successful", finalProduct });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { addProuduct, findProducts, productDetails, productRating }