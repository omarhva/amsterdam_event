package app.repositories;

import app.models.AEvent;
import app.models.User;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Repository()
public class UserRepositoryJPA implements UserRepository{

  @PersistenceContext
  private EntityManager em;

  @Override
  public User save(User user) {
    return this.em.merge(user);

  }

  @Override
  public void delete(User user) {

    User toRemove = em.merge(user);

    em.remove(toRemove);

  }

  @Override
  public User findByEmail(String email) {

    return em.find(User.class,email);
  }

  @Override
  public User fingById(long id) {
    return this.em.find(User.class, id);

  }

  @Override
  public List<User> findAll() {

    TypedQuery<User> query = em.createQuery("SELECT u FROM User u",User.class);

    return query.getResultList();
  }

}
