const reviewModel = require("../model/reviewModel");
const factory = require("../utility/factory.js");

// async function getAllReviews(req,res)
// {
//     try{
//         const reviews= await reviewModel.find()
//         res.status(200).json({
//             reviews
//         })
//     }
//     catch(err)
//     {
//         res.status(201).json({
//             err: err.message
//         })
//     }
// }
// async function createReview(req,res)
// {
//     try 
//     {
//         const review = await reviewModel.create(req.body);
//         res.status(200).json({
//             review
//         })
//     }
//     catch(err)
//     {
//         err.status(201).json({
//             err: err.message
//         })
//     }
// }
// module.exports.createReview = createReview;
// module.exports.getAllReviews =getAllReviews;

module.exports.getReview = factory.getElement(reviewModel);
module.exports.getAllReviews = factory.getAllElement(reviewModel);
module.exports.updateReview = factory.updateElement(reviewModel);
module.exports.deleteReview = factory.deleteElement(reviewModel);
module.exports.createReview = factory.createElement(reviewModel);