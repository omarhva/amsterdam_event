package app;

import app.models.AEvent;
import app.models.Registration;
import app.models.User;
import app.repositories.AEventsRepository;
import app.repositories.RegistrationsRepository;
import app.repositories.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.transaction.Transactional;
import java.util.List;


@SpringBootApplication
public class AeserverApplication implements CommandLineRunner {

  private Logger logger = LoggerFactory.getLogger(this.getClass());

  @Autowired
  AEventsRepository aEventsRepository;

  @Autowired
  RegistrationsRepository registrationsRepository;

  @Autowired
  UserRepository userRepository;

  public static void main(String[] args) {


    SpringApplication.run(AeserverApplication.class, args);

    System.out.println("\n-------------------------Finish 100%----------------------");

  }

  @Override
  @Transactional
  public void run(String... args) throws Exception {
    createInitialAEvents();
    logger.info("All Aeventd ->{}", aEventsRepository.findAll());
    logger.info("All Registrations ->{}", registrationsRepository.findAll());

  }

  private void createInitialAEvents() {


    List<AEvent> aEvents = this.aEventsRepository.findAll();
    List<Registration> registrations = this.registrationsRepository.findAll();

    if (aEvents.size() > 0) return;
    if (registrations.size() > 0) return;
    System.out.println("some AEvents data");

    for (int i = 0; i < 9; i++) {
      AEvent aEvent = AEvent.createRandomAevent();
      User user = new User();

      user.setEmail("YSN"+ i + "@gmail.com");
      user.setName("YSN000"+ i);
      user.setAdmin(true);
      user.setHashedPassWord(user.getName());

      Registration registration = Registration.createRandomRegistration();
      aEvent = this.aEventsRepository.save(aEvent);
      user = this.userRepository.save(user);
      registration = this.registrationsRepository.save(registration);
      aEvent.addRegistration(registration);



    }

  }

}
