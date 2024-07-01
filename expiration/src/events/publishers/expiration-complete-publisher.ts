import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects,
} from "@ecommercetut/commom";

class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationCompleted;
}

export default ExpirationCompletePublisher;
