package app.repositories;

import app.models.User;

import java.util.List;

public interface UserRepository {

  List<User> findAll();

  User save(User user);

  void delete(User user);


  User findByEmail(String email);

  User fingById(long id);
}
