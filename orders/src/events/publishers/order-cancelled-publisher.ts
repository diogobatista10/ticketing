import { Publisher, Subjects, OrderCancelledEvent } from "@ecommercetut/commom";

class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}

export default OrderCancelledPublisher;
