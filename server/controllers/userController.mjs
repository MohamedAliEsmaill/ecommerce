import User from "../models/User.mjs";


/**
 * this function is added product to cart for the current user
 * 
 */
export async function addCart(req, res, next) {
    if (!req.user) {
        return res.status(401).json({
            error: "Unauthorized: User not found"
        });
    }
    let userId = req.user._id;
    console.log(userId);
    let currentUser = await User.findOne(userId);
    const productId = req.body.productId;

    if (!productId) {
        return res.status(400).json({
            error: "product ID is required."
        });
    }
    currentUser.carts.push(productId);
    await currentUser.save();
    res.status(200).json({
        message: "add product to cart for current user "
    });
}

/**
 * this function is get cart for the current user
 * 
 */
export async function getCart(req, res, next) {
    if (!req.user) {
        return res.status(401).json({
            error: "Unauthorized: User not found"
        });
    }
    let userId = req.user._id;
    let currentUser = await User.findOne(userId);
    let products = countProductOccurrences(currentUser.carts);
    res.status(200).json({
        message: "add product to cart for current user ",
        data: products
    });
}

/**
 * this function is calculate Occurrences of Products in cert 
 * @result:{ 'productId': 'Occurrence'}
 */
function countProductOccurrences(cart) {
    const productCountMap = new Map();
    for (const productId of cart) {
        if (productCountMap.has(productId)) {
            productCountMap.set(productId, productCountMap.get(productId) + 1);
        } else {
            productCountMap.set(productId, 1);
        }
    }
    const productCountObject = Object.fromEntries(productCountMap);
    return productCountObject;
}
