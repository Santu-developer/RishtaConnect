package com.santu.Backend_Matrilab.dto.request;

public class PhysicalAttributesDTO {



    private Long id;
    private String complexion;
    private String height;
    private String weight;
    private String eyeColor;
    private String hairColor;
    private String disability;
    private Long userId; // ID of the associated user

    // Default constructor
    public PhysicalAttributesDTO() {
    }

    // Parameterized constructor
    public PhysicalAttributesDTO(Long id, String complexion, String height, String weight,
                                 String eyeColor, String hairColor, String disability, Long userId) {
        this.id = id;
        this.complexion = complexion;
        this.height = height;
        this.weight = weight;
        this.eyeColor = eyeColor;
        this.hairColor = hairColor;
        this.disability = disability;
        this.userId = userId;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
