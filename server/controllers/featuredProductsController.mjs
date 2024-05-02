import FeaturedProducts from "../models/FeaturedProducts.mjs";

export const getFeaturedProducts = async (req, res) => {
  try {
    const featuredProducts = await FeaturedProducts.find({
      featured: true,
    }).populate("products");
    res.json(featuredProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving featured products" });
  }
};