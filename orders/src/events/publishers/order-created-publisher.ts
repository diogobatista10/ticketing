import { Publisher, Subjects, OrderCreatedEvent } from "@ecommercetut/commom";

class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}

export default OrderCreatedPublisher;
