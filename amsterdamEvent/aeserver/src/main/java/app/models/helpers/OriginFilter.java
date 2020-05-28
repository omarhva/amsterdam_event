package app.models.helpers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.net.http.HttpHeaders;

@Configuration
public class OriginFilter implements WebMvcConfigurer {

  @Value("${jwt.issuer:MyOrganisation}")
  public String issuer;

  @Value("${jwt.pass-phrase}")
  public String passphrase;

  @Value("${jwt.expiration-seconds}")
  public int expiration;

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**")
      .allowedHeaders("GET", "POST", "PUT", "DELETE")
      .allowedOrigins("http://localhost:4200")
      .allowCredentials(true)
      .allowedHeaders("*")
      .exposedHeaders("Authorization")
    ;

  }
}
