import { Request, Response } from 'express';
import Order from '../models/order.model';
import ProductsModel from '../models/products.model';
import { IRequest } from '../middlewares/auth.middleware'; // Sesuaikan path dengan lokasi file
import mail from '../utils/mail'; // Sesuaikan path dengan lokasi file mail.ts
import UserModel from '../models/user.models';

// Define the OrderItem interface
interface OrderItem {
  productId: string;
  quantity: number;
  name?: string; // Optional, will be added later
  price?: number; // Optional, will be added later
}

const OrderController = {
  createOrder: async (req: IRequest, res: Response) => {
    try {
      const { orderItems, grandTotal } = req.body;

      // Ensure orderItems is of type OrderItem[]
      const orderItemsTyped: OrderItem[] = orderItems;

      const createdBy = req.user?.id;

      if (!createdBy) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      // Fetch product details and update stock
      const updatedOrderItems = await Promise.all(orderItemsTyped.map(async (item) => {
        const product = await ProductsModel.findById(item.productId);
        if (!product) {
          throw new Error(`Product with ID ${item.productId} not found`);
        }
        if (item.quantity > product.qty) {
          throw new Error(`Insufficient stock for product ${product.name}`);
        }
        product.qty -= item.quantity;
        await product.save();

        return {
          ...item,
          name: product.name,
          price: product.price,
        };
      }));

      // Save new order
      const newOrder = new Order({
        grandTotal,
        orderItems: updatedOrderItems,
        createdBy,
        status: 'pending',
      });

      await newOrder.save();

      // Send invoice email
      const user = await UserModel.findById(createdBy);
      if (user) {
        const customerName = user.username;
        await mail.sendInvoiceEmail(user.email, newOrder, customerName);
      }

      res.status(201).json(newOrder);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(500).json({ message: errorMessage });
    }
  },

  getUserOrders: async (req: IRequest, res: Response) => {
    try {
      const createdBy = req.user?.id;
      if (!createdBy) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const { page = 1, limit = 10 } = req.query;

      const orders = await Order.find({ createdBy })
        .skip((Number(page) - 1) * Number(limit))
        .limit(Number(limit))
        .exec();

      const totalOrders = await Order.countDocuments({ createdBy });

      res.status(200).json({
        totalPages: Math.ceil(totalOrders / Number(limit)),
        currentPage: Number(page),
        orders,
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      res.status(500).json({ message: errorMessage });
    }
  },

  // Tambahkan fungsi lain jika diperlukan
};

export default OrderController;
