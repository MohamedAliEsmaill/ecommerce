import User from "../models/User.mjs";


/**
 * this function is added product to cart for the current user
 * 
 */
export async function addCart(req, res, next) {
    try {
        if (!req.user) {
            return res.status(401).json({
                error: "Unauthorized: User not found"
            });
        }
        let userId = req.user._id;
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
    catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
}

/**
 * this function is get cart for the current user
 * 
 */
export async function getCart(req, res, next) {
    try {
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
    } catch (e) {
        res.status(400).json({
            message: e.message
        });
    }
}

/**
 * this function is calculate Occurrences of Products in cert 
 * @result:{ 'productId': 'Occurrence'}
 */
export function countProductOccurrences(cart) {
    const productIds = new Map();
    for (const productId of cart) {
        const productIdString = productId.toString();
        if (productIds.has(productIdString)) {
            productIds.set(productIdString, productIds.get(productIdString) + 1);
        } else {
            productIds.set(productIdString, 1);
        }
    }
    const productIdsCount = Object.fromEntries(productIds);
    return productIdsCount;
}
