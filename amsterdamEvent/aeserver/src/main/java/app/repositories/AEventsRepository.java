package app.repositories;

import app.models.AEvent;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AEventsRepository  {

   List<AEvent> findAll();

   AEvent findById(long id);
   AEvent save (AEvent aEvent);

   boolean deletById(long id);

  List<AEvent> findByQuery(String jqplNAme, Object... params);



}
