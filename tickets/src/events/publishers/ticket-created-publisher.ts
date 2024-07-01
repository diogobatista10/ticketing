import { Publisher, Subjects, TicketCreatedEvent } from "@ecommercetut/commom";

class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}

export default TicketCreatedPublisher;
