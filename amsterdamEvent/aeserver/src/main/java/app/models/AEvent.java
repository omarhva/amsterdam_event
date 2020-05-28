package app.models;

import app.models.helpers.AEventStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import app.models.helpers.DataView;

import javax.persistence.*;
import java.util.*;


@Entity



@NamedQueries({
  @NamedQuery(name = "AEvent-find_ALL" , query = "SELECT ae FROM AEvent ae"),
  @NamedQuery(name = "AEvent-find_by_status"
    , query = "SELECT ae FROM AEvent ae WHERE ae.status = ?1 "),

  @NamedQuery(name="AEvent_find_by_title",
    query="SELECT ae from AEvent ae WHERE ae.titel like ?1 ")

})


public class AEvent implements Identifiable {
  private static int number = 0;
  @Id
  //@GeneratedValue(strategy = GenerationType.AUTO)
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "AEvent_ids")
  @SequenceGenerator(name = "AEvent_ids", initialValue = 1001 , allocationSize = 8)
  @JsonView(DataView.DynamicFilter.class)
  private long id;

  @JsonView(DataView.DynamicFilter.class)
  private String titel;

  @JsonView(DataView.DynamicFilter.class)
  private Date start;

  @JsonView(DataView.DynamicFilter.class)
  private Date end;

  @JsonView(DataView.DynamicFilter.class)
  private int participationFee;

  @JsonView(DataView.DynamicFilter.class)
  private int maxParticipants;

  @JsonView(DataView.DynamicFilter.class)
  private String description;

  @Enumerated(EnumType.STRING)
  @JsonView(DataView.DynamicFilter.class)
  private AEventStatus status;



  @OneToMany(mappedBy = "aEvent", cascade = {CascadeType.ALL})

  @JsonView(DataView.DynamicFilter.class)
  public List<Registration> registrations;

  public List<Registration> getRegistrations() {
    return registrations;
  }

  public void addRegistration(Registration registration)
  {
    this.registrations.add(registration);
    registration.setaEvent(this);
  }

  public void removeRegistration(Registration registration) {
    this.registrations.remove(registration);
  }


  public void setRegistrations(List<Registration> registrations) {
    this.registrations = registrations;
  }

  public AEvent(String titel) {

    this.titel = titel;

  }

  public AEvent() {
    this.registrations = new ArrayList<>();
    number++;
  }

  public Date getStart() {
    return start;
  }

  public void setStart(Date start) {
    this.start = start;
  }

  public Date getEnd() {
    return end;
  }

  public void setEnd(Date end) {
    this.end = end;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public AEventStatus getStatus() {
    return status;
  }

  public void setStatus(AEventStatus status) {
    this.status = status;
  }


  public int getParticipationFee() {
    return participationFee;
  }

  public void setParticipationFee(int participationFee) {
    this.participationFee = participationFee;
  }

  public int getMaxParticipants() {
    return maxParticipants;
  }

  public void setMaxParticipants(int maxParticipants) {
    this.maxParticipants = maxParticipants;
  }


  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getTitel() {
    return titel;
  }

  public void setTitel(String titel) {
    this.titel = titel;
  }


  @Override
  public String toString() {
    return " AEvent{ " +
      "id: " + id + "\n" +
      "titel: " + titel + "\n" +
      "start: " + start + "\n" +
      "end: " + end + "\n" +
      "description: " + description + "\n" +
      "status: " + status + "\n";
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    AEvent aEvent = (AEvent) o;
    return id == aEvent.id;
  }

  @Override
  public int hashCode() {
    return Objects.hash(id);
  }


  public static AEvent createRandomAevent() {
    AEvent ai = new AEvent();
    ai.setTitel("backend aEvent-" + number);
    ai.setStart(randomDate(new Date(2019, 9, 20), new Date(2019, 10, 29)));
    ai.setEnd(randomDate(ai.getStart(), new Date(2019, 10, 30)));
    ai.setStatus(getRandomStatue());
    ai.setParticipationFee(generateRandomNumber());
    ai.setMaxParticipants((int) Math.round(Math.random() * 5000));
    ai.setDescription("Screening Brazil" + (number));
    return ai;
  }

  private static Date randomDate(Date start, Date end) {
    return new Date((long) (start.getTime() + Math.random() * (end.getTime() - start.getTime())));
  }

  private static int generateRandomNumber() {
    int num = 0;
    int min = 0;
    int max = 20;
    long highlightedNumber;
    highlightedNumber = Math.round((Math.random() * (max - min) + min) * 100) / 100;
    return (int) highlightedNumber;
  }

  private static AEventStatus getRandomStatue() {
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


}


