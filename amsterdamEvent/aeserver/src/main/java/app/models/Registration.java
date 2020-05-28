package app.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import app.models.helpers.DataView;

import javax.persistence.*;
import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.Date;

@Entity

@NamedQueries({

  @NamedQuery(name = "AEvent_find_by_minRegistrations"
    , query = "SELECT a FROM Registration r INNER join AEvent a on r.aEvent.id = a.id GROUP BY r.id  HAVING count(r.aEvent.id) > ?1")

})
public class Registration implements Identifiable{

  private static int number = 1;
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "Registration_ids")
  @SequenceGenerator(name = "Registration_ids", initialValue = 30001 , allocationSize = 8)
  @JsonView(DataView.DynamicFilter.class)
  private long id;

  @JsonView(DataView.DynamicFilter.class)
  private String ticketCode;

  @JsonView(DataView.DynamicFilter.class)
  private Date submissionDate ;

  @ManyToOne(cascade = {CascadeType.ALL})


  @JsonIgnore
  @JsonView(DataView.DynamicFilter.class)
  public AEvent aEvent;

  public AEvent getaEvent() {
    return aEvent;
  }

  public void setaEvent(AEvent aEvent) {
    this.aEvent = aEvent;
  }



  public Registration() {
    number++;
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getTicketCode() {
    return ticketCode;
  }

  public void setTicketCode(String ticketCode) {
    this.ticketCode = ticketCode;
  }

  public Date getSubmissionDate() {
    return submissionDate;
  }

  public void setSubmissionDate(Date submissionDate) {
    this.submissionDate = submissionDate;
  }
  public static Registration createRandomRegistration() {
    Registration registration = new Registration();
    registration.setSubmissionDate(randomDate(new Date(2019, 9, 20), new Date(2019, 10, 29)));
    registration.setTicketCode("ticket-"+ number);


    return registration;
  }
  private static Date randomDate(Date start, Date end) {
    return new Date((long) (start.getTime() + Math.random() * (end.getTime() - start.getTime())));
  }
}
