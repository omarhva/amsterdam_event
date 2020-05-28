package app.models.helpers;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class AEventNotFoundException extends RuntimeException {

  public AEventNotFoundException(String message) {
    super(message);
  }
}
