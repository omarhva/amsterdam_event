package app.repositories;

import app.models.AEvent;
import org.springframework.stereotype.Repository;

@Repository("AEVENTS.JPAB")
public class AEventsRepositoryJpaAb extends AbstractEntityRepositoryJpa<AEvent>{

  public AEventsRepositoryJpaAb() {
    super(AEvent.class);
  }
}
