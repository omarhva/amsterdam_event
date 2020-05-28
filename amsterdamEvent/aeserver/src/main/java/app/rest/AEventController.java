package app.rest;

import app.models.Registration;
import app.models.helpers.AEventStatus;
import app.repositories.AEventsRepository;

import app.repositories.EntityRepository;
import app.repositories.RegistrationsRepository;
import com.fasterxml.jackson.annotation.JsonView;
import app.models.helpers.AEventNotFoundException;
import app.models.AEvent;
import app.models.helpers.DataView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Primary;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/aevents")
public class AEventController {

//  @Qualifier("AEVENTS."+ EntityRepository.persistenceMode)
//  @Autowired
//  private EntityRepository<AEvent> repo;
//
//   @Qualifier("REGISTRATION."+ EntityRepository.persistenceMode)
//   @Autowired
//   private EntityRepository<Registration> registrationsRepository;


  @Autowired
  AEventsRepository repo;


  @Autowired
  RegistrationsRepository registrationsRepository;


  @GetMapping(path = "", produces = "application/json")
  @JsonView(DataView.DynamicFilter.class)
  public MappingJacksonValue getAllAEvents(@RequestParam(required = false) String titel,
                                    @RequestParam(required = false) String status,
                                    @RequestParam(required = false) Long minRegistrations) {


    int para = (titel != null ? 1 : 0) + (minRegistrations != null ? 1 : 0) + (status != null ? 1 : 0);
    if (para > 1) {
      throw new AEventNotFoundException("that is impossible!! can only handle one request ");
    }

    MappingJacksonValue mappingJacksonValue =null;

    if (titel != null) {
    mappingJacksonValue = new MappingJacksonValue(
      repo.findByQuery("AEvent_find_by_title","%"+ titel+"%"));

    }
    else if (minRegistrations != null){
      mappingJacksonValue = new MappingJacksonValue(
        repo.findByQuery("AEvent_find_by_minRegistrations",minRegistrations.longValue()));
    }

    else if (status != null) {
      mappingJacksonValue = new MappingJacksonValue(
        repo.findByQuery("AEvent-find_by_status" ,AEventStatus.valueOf(status)));
    }
    else {

      mappingJacksonValue = new MappingJacksonValue(repo.findAll());


    }
    return mappingJacksonValue;

  }

  @JsonView(DataView.DynamicFilter.class)
  @GetMapping(path = "/{id}")
  public AEvent getAEventById(@PathVariable Long id) throws AEventNotFoundException {
    AEvent aEvent = repo.findById(id);
    if (aEvent == null) {
      throw new AEventNotFoundException("Avent-id= " + id + " Not found.");
    } else
      return aEvent;
  }

  @JsonView(DataView.DynamicFilter.class)
  @PostMapping(path = "")
  public ResponseEntity<AEvent> createAEvent(@RequestBody AEvent aEvent) {


    AEvent savedAEvent = repo.save(aEvent);


    URI location = ServletUriComponentsBuilder.
      fromCurrentRequest().path("/{id}").
      buildAndExpand(savedAEvent.getId()).toUri();

    return ResponseEntity.created(location)
      .body(savedAEvent);
  }

  @JsonView(DataView.DynamicFilter.class)
  @DeleteMapping(path = "/{id}")
  public boolean deletAEvent(@PathVariable Long id) throws AEventNotFoundException {
    boolean status = false;

    if (!repo.deletById(id)) {
      throw new AEventNotFoundException("AEvent-id= " + id + " does not match path parameter= " + id + ".");
    } else {

      repo.deletById(id);
      status = true;
    }
    return status;
  }

  @JsonView(DataView.DynamicFilter.class)
  @PutMapping(path = "/{id}")
  public boolean putAEvent(@RequestBody AEvent aEvent, @PathVariable long id) {
    boolean status = false;
    AEvent ae = repo.findById(id);
    if (ae == null) {
      throw new AEventNotFoundException("AEvent-id= " + id + " does not match path parameter= " + id);

    }
    if (ae != null) {
      ae.setTitel(aEvent.getTitel());
      ae.setStart(aEvent.getStart());
      ae.setEnd(aEvent.getEnd());
      ae.setStatus(aEvent.getStatus());
      ae.setParticipationFee(aEvent.getParticipationFee());
      ae.setMaxParticipants(aEvent.getMaxParticipants());
      ae.setDescription(aEvent.getDescription());
      status = true;

    } else {
      repo.save(aEvent);
      status = false;
    }
    return status;
  }

  @JsonView(DataView.DynamicFilter.class)
  @PostMapping(path = "/{id}/register")
  public ResponseEntity<Object> createResgistration(@PathVariable int id,
                                                    @RequestBody Date startDateTime) {


    AEvent aEvent = repo.findById(id);

    if (aEvent == null) {
      throw new AEventNotFoundException("AEvent-id= " + id + " is not found ");
    }
    Registration registration = Registration.createRandomRegistration();
    registration.setSubmissionDate(startDateTime);
    aEvent.addRegistration(registration);
    registrationsRepository.save(registration);

    this.putAEvent(aEvent,id);


    URI location = ServletUriComponentsBuilder.
      fromCurrentRequest().
      path("/{id}").
      buildAndExpand(registration.getId()).
      toUri();
    return ResponseEntity.created(location)
      .body(aEvent);
  }



}
