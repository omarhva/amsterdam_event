package app.repositories;

import app.models.AEvent;
import app.models.Registration;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Transactional
@Repository()
@Primary
public class RegistrationsRepositoryJpa implements RegistrationsRepository {


  @PersistenceContext
  EntityManager em;

  @Override
  public List<Registration> findByQuery(String jqplNAme, Object... params) {
    return null;
  }

  @Override
  public List<Registration> findAll() {
    TypedQuery<Registration> query = this.em.createQuery("SELECT r FROM Registration r", Registration.class);

    return query.getResultList();

  }

  @Override
  public Registration findById(long id) {
    return this.em.find(Registration.class,id);
  }

  @Override
  public Registration save(Registration registration) {
    if (registration.getId() == 0L) {
      //insert
      this.em.persist(registration);
      return registration;
    } else {
      //update
      return this.em.merge(registration);
    }
  }

  @Override
  public boolean deletById(long id) {
    Registration registration =findById(id);
    if (registration !=null){
      this.em.remove(registration);
      return true;
    }
    return false;
  }
}
