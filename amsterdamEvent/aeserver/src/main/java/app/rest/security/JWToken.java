package app.rest.security;

import app.models.User;
import app.models.helpers.AuthenticationException;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

public class JWToken {

  // A claim indicating if the user is an administrator
  public static final String JWT_USERNAME_CLAIM = "sub";
  public static final String JWT_USERID_CLAIM = "id";
  public static final String JWT_ADMIN_CLAIM = "admin";

  private String username = "YSN";
  //private long userId = 0l;
  private Long userId = 0L;
  private boolean admin = false;

  public JWToken() {
  }

  public JWToken(String username, Long userId, boolean admin) {
    this.username = username;
    this.userId = userId;
    this.admin = admin;
  }

  //Generate a Json Web Token
  public String encode(String passphrase, String issuer, int expiration) {

    Key key = getKey(passphrase);

    String token = Jwts.builder()
      .claim(JWT_USERNAME_CLAIM,this.username)
      .claim(JWT_USERID_CLAIM,this.userId)
      .claim(JWT_ADMIN_CLAIM,this.admin)
      .setIssuer(issuer) // registered claim
      .setIssuedAt(new Date()) // registered claim
      .setExpiration(new Date(System.currentTimeMillis() + expiration * 1000)) // registered claim
      .signWith(key, SignatureAlgorithm.HS512)
      .compact();

    return token;
  }

  private static Key getKey(String passPhrase) {
    byte hmacKey[] = passPhrase.getBytes(StandardCharsets.UTF_8);
    Key key = new SecretKeySpec(hmacKey, SignatureAlgorithm.HS512.getJcaName());
    return key;
  }

  public static JWTokenInfo decode(String encodedToken, String passphrase) throws AuthenticationException {
    try {
      // Validate the token
      Key key = getKey(passphrase);
      Jws<Claims> jws = Jwts.parser().setSigningKey(key).parseClaimsJws(encodedToken);
      Claims claims = jws.getBody();

//      JWToken jwTokenw = new JWToken(
//        claims.get(JWT_USERNAME_CLAIM).toString(),
//        Long.valueOf(claims.get(JWT_USERID_CLAIM).toString()),
//        (boolean) claims.get(JWT_ADMIN_CLAIM)
//          );

          JWTokenInfo jwToken = new JWTokenInfo();

      jwToken.setEmail(claims.get(Claims.SUBJECT).toString());


      String isAdminString = claims.get(JWT_ADMIN_CLAIM).toString();
      jwToken.setAdmin(Boolean.parseBoolean(isAdminString));

      return jwToken;

    } catch (ExpiredJwtException | MalformedJwtException |
      UnsupportedJwtException | IllegalArgumentException| SignatureException e) {
      throw new AuthenticationException(e.getMessage());
    }
  }

}
