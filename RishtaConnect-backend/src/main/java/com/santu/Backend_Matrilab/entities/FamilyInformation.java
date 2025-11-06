package com.santu.Backend_Matrilab.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "family_information", indexes = {
    @Index(name = "idx_family_user_id", columnList = "user_id")
})
public class FamilyInformation extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonBackReference
    @NotNull(message = "User is required")
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @NotBlank(message = "Father's name is required")
    @Size(max = 100, message = "Father's name cannot exceed 100 characters")
    @Column(name = "fathers_name", nullable = false, length = 100)
    private String fathersName;

    @NotBlank(message = "Father's profession is required")
    @Size(max = 100, message = "Father's profession cannot exceed 100 characters")
    @Column(name = "fathers_profession", nullable = false, length = 100)
    private String fathersProfession;

    @NotBlank(message = "Father's contact is required")
    @Size(max = 20, message = "Father's contact cannot exceed 20 characters")
    @Column(name = "fathers_contact", nullable = false, length = 20)
    private String fathersContact;

    @NotBlank(message = "Mother's name is required")
    @Size(max = 100, message = "Mother's name cannot exceed 100 characters")
    @Column(name = "mothers_name", nullable = false, length = 100)
    private String mothersName;

    @NotBlank(message = "Mother's profession is required")
    @Size(max = 100, message = "Mother's profession cannot exceed 100 characters")
    @Column(name = "mothers_profession", nullable = false, length = 100)
    private String mothersProfession;

    @NotBlank(message = "Mother's contact is required")
    @Size(max = 20, message = "Mother's contact cannot exceed 20 characters")
    @Column(name = "mothers_contact", nullable = false, length = 20)
    private String mothersContact;

    @Min(value = 0, message = "Total brothers cannot be negative")
    @Column(name = "total_brother", nullable = false)
    private int totalBrother = 0;

    @Min(value = 0, message = "Total sisters cannot be negative")
    @Column(name = "total_sister", nullable = false)
    private int totalSister = 0;

    public FamilyInformation() {
    }

    public FamilyInformation(Long id, User user, String fathersName, String fathersProfession,
                           String fathersContact, String mothersName, String mothersProfession,
                           String mothersContact, int totalBrother, int totalSister) {
        this.id = id;
        this.user = user;
        this.fathersName = fathersName;
        this.fathersProfession = fathersProfession;
        this.fathersContact = fathersContact;
        this.mothersName = mothersName;
        this.mothersProfession = mothersProfession;
        this.mothersContact = mothersContact;
        this.totalBrother = totalBrother;
        this.totalSister = totalSister;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getFathersName() {
        return fathersName;
    }

    public void setFathersName(String fathersName) {
        this.fathersName = fathersName;
    }

    public String getFathersProfession() {
        return fathersProfession;
    }

    public void setFathersProfession(String fathersProfession) {
        this.fathersProfession = fathersProfession;
    }

    public String getFathersContact() {
        return fathersContact;
    }

    public void setFathersContact(String fathersContact) {
        this.fathersContact = fathersContact;
    }

    public String getMothersName() {
        return mothersName;
    }

    public void setMothersName(String mothersName) {
        this.mothersName = mothersName;
    }

    public String getMothersProfession() {
        return mothersProfession;
    }

    public void setMothersProfession(String mothersProfession) {
        this.mothersProfession = mothersProfession;
    }

    public String getMothersContact() {
        return mothersContact;
    }

    public void setMothersContact(String mothersContact) {
        this.mothersContact = mothersContact;
    }

    public int getTotalBrother() {
        return totalBrother;
    }

    public void setTotalBrother(int totalBrother) {
        this.totalBrother = totalBrother;
    }

    public int getTotalSister() {
        return totalSister;
    }

    public void setTotalSister(int totalSister) {
        this.totalSister = totalSister;
    }
}
