import { Schema, model, Document } from 'mongoose';

enum OrderStatus {
  Pending = 'pending',
  Completed = 'completed',
  Cancelled = 'cancelled',
}

interface OrderItem {
  name: string;
  productId: Schema.Types.ObjectId; // Ubah ke Schema.Types.ObjectId
  price: number;
  quantity: number;
}

interface Order extends Document {
  grandTotal: number;
  orderItems: OrderItem[];
  createdBy: Schema.Types.ObjectId; // Ubah ke Schema.Types.ObjectId
  status: OrderStatus;
}

const orderItemSchema = new Schema<OrderItem>({
  name: { type: String, required: true },
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true }, // Pastikan penggunaan Schema.Types.ObjectId
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1, max: 5 },
});

const orderSchema = new Schema<Order>({
  grandTotal: { type: Number, required: true },
  orderItems: [orderItemSchema],
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Pastikan penggunaan Schema.Types.ObjectId
  status: { type: String, enum: Object.values(OrderStatus), default: OrderStatus.Pending },
});

export default model<Order>('Order', orderSchema);
