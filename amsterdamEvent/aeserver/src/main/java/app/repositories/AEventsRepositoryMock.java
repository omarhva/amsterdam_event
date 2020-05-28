package app.repositories;


import app.models.AEvent;
import app.models.Registration;
import app.models.helpers.AEventStatus;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class AEventsRepositoryMock implements AEventsRepository {
  private ArrayList<AEvent> aEvents = new ArrayList<>();
  private long latestId = 30000;


  private long generateNewId() {
    this.latestId++;
    return this.latestId;
  }


  @Override
  public List<AEvent> findAll() {

    return aEvents;
  }

  public AEventsRepositoryMock() {
    for (int i = 0; i < 8; i++) {

      aEvents.add(addRandomEvent(i));

    }
  }

  public AEvent findById(long id) {
    for (AEvent ae : aEvents) {
      if (ae.getId() == id) {
        return ae;
      }

    } return null;
  }

  @Override
  public AEvent save(AEvent aEvent) {
    if (aEvent.getId() == 0L) {
      // this is a new event
      aEvent.setId(this.generateNewId());
    } else {
      // update existing event
      boolean removed =
        this.aEvents.removeIf(ae -> aEvent.getId() == ae.getId());

    }

    this.aEvents.add(aEvent);
    return aEvent;
  }

  @Override
  public boolean deletById(long id) {
    AEvent aEvent1 = findById(id);
    return aEvents.remove(aEvent1);
  }

  @Override
  public List<AEvent> findByQuery(String jqplNAme, Object... params) {
    return null;
  }




  @Override
  public String toString() {
    return aEvents + " ";
  }

//  @Override
//  public List<AEvent> findByQuery(String jqplNAme, Object... params) {
//    return null;
//  }

  public AEvent addRandomEvent(int i) {
    Registration registration = Registration.createRandomRegistration();
    AEvent ai = new AEvent();
    ai.setTitel("backend aEvent-" + i);
    ai.setStart(this.randomDate(new Date(2019, 9, 20), new Date(2019, 10, 29)));
    ai.setEnd(this.randomDate(ai.getStart(), new Date(2019, 10, 30)));
    ai.setStatus(getRandomStatue());
    ai.setParticipationFee(generateRandomNumber());
    ai.setMaxParticipants((int) Math.round(Math.random() * 5000));
    ai.setDescription("Screening Brazil" + (i));
    ai.addRegistration(registration);
    return ai;
  }

  public Date randomDate(Date start, Date end) {
    return new Date((long) (start.getTime() + Math.random() * (end.getTime() - start.getTime())));
  }

  public int generateRandomNumber() {
    int num = 0;
    int min = 0;
    int max = 20;
    long highlightedNumber;
    highlightedNumber = Math.round((Math.random() * (max - min) + min) * 100) / 100;
    return (int) highlightedNumber;
  }

  public AEventStatus getRandomStatue() {
    Random rn = new Random();
    int answer = rn.nextInt(3) + 1;
    double key = Math.floor(Math.random() * Math.floor(3) + 1);
    if (key == 1) {
      return AEventStatus.DRAFT;
    }
    if (key == 2) {
      return AEventStatus.PUBLISHED;
    }
    if (key == 3) {
      return AEventStatus.PUBLISHED;
    } else {
      return AEventStatus.CANCELLED;
    }
  }
//  @Override
//  public List<AEvent> findByQuery(String jqplNAme, Object... params) {
//    return null;
//  }

}
