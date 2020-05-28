package app.repositories;

import app.models.Registration;
import org.springframework.stereotype.Repository;

@Repository("REGISTRATION.JPAB")
public class RegistrationsRepositoryJpaAb extends AbstractEntityRepositoryJpa<Registration> {


  public RegistrationsRepositoryJpaAb() {
    super(Registration.class);
  }
}
