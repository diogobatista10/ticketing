import { Publisher, Subjects, PaymentCreatedEvent } from "@ecommercetut/commom";

class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}

export default PaymentCreatedPublisher;
