import Order from "../models/Order.mjs";

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user");
    if (order) {
      res.json(order);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  } catch (error) {
    res.status(500);
    throw new Error("Error while fetching order");
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const user = req.user;

    const totalOrders = await Order.countDocuments({ user: user._id });
    const totalPages = Math.ceil(totalOrders / limit);

    const orders = await Order.find({ user: user._id })
      .populate("user")
      .skip(startIndex)
      .limit(limit);

    const pagination = {
      currentPage: page,
      totalPages: totalPages,
      totalOrders: totalOrders,
    };

    res.json({ orders, pagination });
  } catch (error) {
    res.status(500);
    throw new Error("Error while fetching orders");
  }
};

export const addOrder = async (req, res) => {
  const { products, totalPrice, address } = req.body;

  const processedProducts = Object.entries(products).flatMap(
    ([productId, quantity]) => {
      return Array(quantity).fill(productId);
    }
  );

  if (!products || Object.keys(products).length === 0) {
    res.status(400).json({
      error: "No products in the order, please add products to the order",
    });
    return;
  }

  try {
    const createdOrder = await Order.create({
      products: processedProducts,
      totalPrice,
      address,
      user: req.user._id,
      date: Date.now(),
    });

    req.user.carts = [];
    req.user.orders.push(createdOrder._id);
    await req.user.save();

    res.status(201).json(createdOrder);
  } catch (error) {
    console.error("Error while creating the order:", error);
    res.status(500).json({ error: "Error while creating the order" });
  }
};

export const updateOrderToAccepted = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.status = "accepted";

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  } catch (error) {
    res.status(500);
    throw new Error("Error while updating order to accepted");
  }
};

export const updateOrderToRejected = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.status = "rejected";

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  } catch (error) {
    res.status(500);
    throw new Error("Error while updating order to rejected");
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      if (order.status === "pending") {
        await order.deleteOne();
        res.json({ message: "Order deleted" });
      } else {
        res.status(400);
        throw new Error("Order only be cancelled if it is pending");
      }
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  } catch (error) {
    res.status(500);
    throw new Error("Error while deleting order");
  }
};
