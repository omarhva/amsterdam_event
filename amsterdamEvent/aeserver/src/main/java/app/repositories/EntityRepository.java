package app.repositories;

import app.models.Identifiable;
import java.util.List;

public interface EntityRepository<E extends Identifiable> {

  public static final String persistenceMode = "JPAB";

  public List<E> findAll();

  public E findById(long id);
  public E save (E e);

  public boolean deletById(long id);
  List<E> findByQuery(String jqplNAme, Object ... params);

}
