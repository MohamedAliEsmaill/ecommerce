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
        let currentUser = await User.findOne({ _id: userId }).populate('carts');
        let products = currentUser.carts;
        let productCountMap = countProductOccurrences(products);
        const productsArray = [];
        for (const [productId, count] of productCountMap.entries()) {
            if (count >= 1) {
                const product = products.find((p) => p._id.toString() === productId);
                if (product) {
                    const clonedProduct = {
                        '_id': product._id,
                        'name': product.name,
                        'price': product.price,
                        'desc': product.desc,
                        'stock': product.stock,
                        'images': product.images,
                        'count': count
                    }
                    productsArray.push(clonedProduct);
                }
            }
        }
        res.status(200).json({
            message: "Retrieved product occurrences in the cart for the current user",
            data: productsArray
        });
    } catch (e) {
        res.status(400).json({
            message: e.message
        });
    }
}


/**
 * this function is delete product from cart for the current user
 *
 */
export async function deleteCart(req, res, next) {
    try {
        if (!req.user) {
            return res.status(401).json({
                error: "Unauthorized: User not found"
            });
        }
        let userId = req.user._id;
        let currentUser = await User.findById(userId);
        const productId = req.body.productId;

        if (!productId) {
            return res.status(400).json({
                error: "Product ID is required."
            });
        }
        const productIndex = currentUser.carts.indexOf(productId);
        if (productIndex === -1) {
            return res.status(404).json({
                error: "Product not found in cart."
            });
        }
        currentUser.carts.splice(productIndex, 1);
        await currentUser.save();
        res.status(200).json({
            message: "Product removed from cart for the current user."
        });
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
}


/**
 * this function is calculate Occurrences of Products in cert 
 * @result:{ 'productId': 'Occurrence'}
 */
export function countProductOccurrences(cart) {
    const productCountMap = new Map();
    cart.forEach((product) => {
        const productId = product._id.toString();
        if (productCountMap.has(productId)) {
            productCountMap.set(productId, productCountMap.get(productId) + 1);
        } else {
            productCountMap.set(productId, 1);
        }
    });
    return productCountMap;
}
