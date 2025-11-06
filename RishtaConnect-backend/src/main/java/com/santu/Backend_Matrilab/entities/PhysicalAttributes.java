package com.santu.Backend_Matrilab.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "physical_attributes", indexes = {
    @Index(name = "idx_physical_user_id", columnList = "user_id")
})
public class PhysicalAttributes extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonBackReference
    @NotNull(message = "User is required")
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @NotBlank(message = "Complexion is required")
    @Size(max = 30, message = "Complexion cannot exceed 30 characters")
    @Column(nullable = false, length = 30)
    private String complexion;

    @NotBlank(message = "Height is required")
    @Size(max = 20, message = "Height cannot exceed 20 characters")
    @Column(nullable = false, length = 20)
    private String height;

    @NotBlank(message = "Weight is required")
    @Size(max = 20, message = "Weight cannot exceed 20 characters")
    @Column(nullable = false, length = 20)
    private String weight;

    @NotBlank(message = "Eye color is required")
    @Size(max = 30, message = "Eye color cannot exceed 30 characters")
    @Column(name = "eye_color", nullable = false, length = 30)
    private String eyeColor;

    @NotBlank(message = "Hair color is required")
    @Size(max = 30, message = "Hair color cannot exceed 30 characters")
    @Column(name = "hair_color", nullable = false, length = 30)
    private String hairColor;

    @Size(max = 100, message = "Disability description cannot exceed 100 characters")
    @Column(length = 100)
    private String disability;

    public PhysicalAttributes() {
    }

    public PhysicalAttributes(Long id, String complexion, String height, String weight,
                            String eyeColor, String hairColor, String disability, User user) {
        this.id = id;
        this.complexion = complexion;
        this.height = height;
        this.weight = weight;
        this.eyeColor = eyeColor;
        this.hairColor = hairColor;
        this.disability = disability;
        this.user = user;
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

    public String getComplexion() {
        return complexion;
    }

    public void setComplexion(String complexion) {
        this.complexion = complexion;
    }

    public String getHeight() {
        return height;
    }

    public void setHeight(String height) {
        this.height = height;
    }

    public String getWeight() {
        return weight;
    }

    public void setWeight(String weight) {
        this.weight = weight;
    }

    public String getEyeColor() {
        return eyeColor;
    }

    public void setEyeColor(String eyeColor) {
        this.eyeColor = eyeColor;
    }

    public String getHairColor() {
        return hairColor;
    }

    public void setHairColor(String hairColor) {
        this.hairColor = hairColor;
    }

    public String getDisability() {
        return disability;
    }

    public void setDisability(String disability) {
        this.disability = disability;
    }
}
