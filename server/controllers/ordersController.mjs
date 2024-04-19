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

    const totalOrders = await Order.countDocuments();
    const totalPages = Math.ceil(totalOrders / limit);

    const orders = await Order.find({})
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
  const { products, totalPrice } = req.body;

  if (products && products.length === 0) {
    res.status(400);
    throw new Error(
      "No products in the order, please add products to the order"
    );
  }

  const createdOrder = await Order.create({
    products,
    totalPrice,
    user: req.user._id,
    date: Date.now(),
  });

  try {
    createdOrder.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500);
    throw new Error("Error while creating the order");
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
      await order.deleteOne();
      res.json({ message: "Order deleted" });
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  } catch (error) {
    res.status(500);
    throw new Error("Error while deleting order");
  }
};
