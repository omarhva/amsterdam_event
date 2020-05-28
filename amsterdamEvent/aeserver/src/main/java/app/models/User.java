package app.models;

import app.models.helpers.DataView;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import java.util.Objects;


import javax.persistence.*;


@Entity

public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "User_ids")
  @SequenceGenerator(name = "User_ids", initialValue = 2001 , allocationSize = 8)
  @JsonView(DataView.DynamicFilter.class)
  private long id;

  @JsonView(DataView.DynamicFilter.class)
  private String email;

  @JsonView(DataView.DynamicFilter.class)
  private String name;

  @JsonIgnore
  @JsonView(DataView.DynamicFilter.class)

  private String hashedPassWord;

  public User() {
  }

  @JsonView(DataView.DynamicFilter.class)
  private boolean admin;

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getHashedPassWord() {
    return hashedPassWord;
  }

  public void setHashedPassWord(String hashedPassWord) {
    this.hashedPassWord = hashedPassWord;
  }

  public boolean isAdmin() {
    return admin;
  }

  public void setAdmin(boolean admin) {
    this.admin = admin;
  }
  public boolean validateEncodedPassword(String hashedPassWord) {
    return this.name.equals(hashedPassWord);
  }

  public boolean validateNameWithPassword(String name) {
    return this.hashedPassWord.equals(name);
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    User user = (User) o;
    return Objects.equals(email, user.email);
  }

  @Override
  public int hashCode() {
    return Objects.hash(email);
  }
}
