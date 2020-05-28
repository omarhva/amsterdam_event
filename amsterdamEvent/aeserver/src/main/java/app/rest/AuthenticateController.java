package app.rest;

import app.models.User;
import app.models.helpers.AuthenticationException;
import app.models.helpers.OriginFilter;
import app.repositories.UserRepository;
import app.rest.security.JWToken;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/authenticate")
public class AuthenticateController {

  @Autowired
  OriginFilter originFilter;

  @Autowired
  UserRepository userRepo;

  @PostMapping("/users")
  public ResponseEntity<Object> createUser(@RequestBody ObjectNode signupInfo) {

    String email = signupInfo.get("email") == null ? null : signupInfo.get("email").asText();
    String name = signupInfo.get("name") == null ? null : signupInfo.get("name").asText();

    User user = new User();
    user.setEmail(email);
    user.setName(name);
    user.setHashedPassWord("Not yet");
    user.setAdmin(true);

    User savedUser = userRepo.save(user);
    URI location = ServletUriComponentsBuilder.
      fromCurrentRequest().path("/{id}").
      buildAndExpand(savedUser.getEmail()).toUri();

    return ResponseEntity.created(location).body(savedUser);
  }

  @PostMapping("/login")
  public ResponseEntity<User> authenticateUser(
    @RequestBody ObjectNode signupInfo,
    HttpServletRequest request,
    HttpServletResponse response
  ) throws AuthenticationException {

    String email = signupInfo.get("eMail") == null ? null : signupInfo.get("eMail").asText();
    String password = signupInfo.get("passWord") == null ? null : signupInfo.get("passWord").asText();
    //String name = signupInfo.get("name") == null  ? null : signupInfo.get("name").asText();

    //User user = userRepo.findByEmail(email);

    User user = new User();

    List<User> users = userRepo.findAll();

    for (User user1 : users) {

      if (user1.getEmail().equals(email)) {
        user = user1;
      }

    }
    User user1 = userRepo.fingById(user.getId());

    if (user1 == null) {
      throw new AuthenticationException("Invalid user and/or password");
    }

    if (!user1.validateEncodedPassword(password)) {
      throw new AuthenticationException("Invalid user and/or password");
    }

    JWToken jwToken = new JWToken(user1.getName(), user1.getId(), user1.isAdmin());
    // Issue a token for the user valid for some time
    String tokenString = jwToken.encode(originFilter.passphrase,
      originFilter.issuer, originFilter.expiration);

    return ResponseEntity.accepted()
      .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokenString)
      .body(user1);
  }


}
