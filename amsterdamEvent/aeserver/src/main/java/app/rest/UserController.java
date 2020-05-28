package app.rest;


import app.models.User;
import app.models.helpers.UnAuthorizedException;
import app.models.helpers.UserNotFoundException;
import app.repositories.UserRepository;
import app.rest.security.JWTokenInfo;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping("/users")
public class UserController {

  @Autowired
  private UserRepository userRepo;

  @GetMapping("")
  public MappingJacksonValue getAllUsers(@RequestAttribute(value = JWTokenInfo.KEY) JWTokenInfo tokenInfo) {

    MappingJacksonValue mappingJacksonValue;
    if (!tokenInfo.isAdmin()) {
      throw new UnAuthorizedException("Can only handle ............");
    }
    mappingJacksonValue = new MappingJacksonValue(userRepo.findAll());

  return mappingJacksonValue;
  }

  @GetMapping("/{email}")
  public User getUserByEmail(
    @PathVariable String email) {

    User userById = userRepo.findByEmail(email);

    if(userById == null) {
      throw new UserNotFoundException("id = " + email);
    }

    return userById;
  }


  @DeleteMapping("/{email}")
  public ResponseEntity<User> deleteUser(@PathVariable String email,
                                         @RequestAttribute(value = JWTokenInfo.KEY) JWTokenInfo tokenInfo) {

    if(!tokenInfo.isAdmin()) {
      throw new UnAuthorizedException("only administrators can remove members");
    }

    User user = getUserByEmail(email);

    userRepo.delete(user);

    return ResponseEntity.ok(user);

  }

  @PutMapping("")
  public ResponseEntity<Object> updateUser(@RequestBody User user) {

    User userById = userRepo.findByEmail(user.getEmail());

    if(userById == null) {
      throw new UserNotFoundException("id = " + user.getEmail());
    }

    userRepo.save(user);

    return ResponseEntity.ok().build();
  }
}
