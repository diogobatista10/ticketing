import { Publisher, Subjects, TicketUpdatedEvent } from "@ecommercetut/commom";

class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}

export default TicketUpdatedPublisher;
