package app.repositories;

import app.models.AEvent;
import app.models.Registration;

import java.util.List;

public interface RegistrationsRepository {

  public List<Registration> findAll();

  public Registration findById(long id);

  public Registration save(Registration registration);

  public boolean deletById(long id);

  List<Registration> findByQuery(String jqplNAme, Object... params);
}
