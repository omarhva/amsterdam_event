package app.repositories;

import app.models.Identifiable;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.List;

@Transactional
public abstract class AbstractEntityRepositoryJpa<E extends Identifiable>
        implements EntityRepository<E> {

  private Class<E> theEntityClass;

  public AbstractEntityRepositoryJpa(Class<E> entityClass) {
    this.theEntityClass = entityClass;
    System.out.println("created" + this.getClass().getName() + "  "+this.theEntityClass.getSimpleName() );
  }

  @PersistenceContext
  protected EntityManager em;

  @Override
  public List<E> findAll() {
    TypedQuery<E> query =
            this.em.createQuery(
                    "select e from " + this.theEntityClass.getSimpleName() + " e",
                    theEntityClass);
    return query.getResultList();

  }

  @Override
  public E findById(long id) {
    TypedQuery<E> query =
      this.em.createQuery(
        "select e from " + this.theEntityClass.getSimpleName() + " e Where e.id =" + id,
        theEntityClass);
    return query.getSingleResult();
  }

  @Override
  public E save(E e) {
    if (e == null) {
      //insert
      this.em.persist(e);
    } else {
      //update
      this.em.merge(e);
    }
    return e;
  }

  @Override
  public boolean deletById(long id) {
    E e =findById(id);

    if (e !=null){
      this.em.remove(e);
      return true;
    }
    return false;
  }

  @Override
  public List<E> findByQuery(String jqplNAme, Object... params) {
    return null;
  }
}
