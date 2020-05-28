package app.repositories;

import app.models.AEvent;
import app.models.helpers.AEventStatus;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

@Transactional
@Repository()
@Primary
public class AEventsRepositoryJpa implements AEventsRepository {


  @PersistenceContext
  EntityManager em;

  @Override
  public List<AEvent> findAll() {
    TypedQuery<AEvent> query = this.em.createNamedQuery("AEvent-find_ALL", AEvent.class);

    return query.getResultList();


  }

  @Override
  public AEvent findById(long id) {
    return this.em.find(AEvent.class, id);
  }


  @Override
  public AEvent save(AEvent aEvent) {

    return this.em.merge(aEvent);
  }

  public AEventsRepositoryJpa() {
  }

  @Override
  public boolean deletById(long id) {
    AEvent aEvent1 = findById(id);
    if (aEvent1 != null) {
      this.em.remove(aEvent1);
      return true;
    }
    return false;
  }

  @Override
  public List<AEvent> findByQuery(String jqplNAme, Object... params) {

    TypedQuery<AEvent> query = this.em.createNamedQuery(jqplNAme, AEvent.class);

    for (int i = 0; i < params.length; i++) {

      query.setParameter(i + 1, params[i]);
    }

    return query.getResultList();


  }
}
