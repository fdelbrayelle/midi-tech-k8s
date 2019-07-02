package com.example.back.dto;

import java.io.Serializable;

public class BeerDto implements Serializable {

    private Integer id;
    private String name;
    private String brewery;

    public BeerDto() {

    }

    public BeerDto(Integer id, String name, String brewery) {
        this.id = id;
        this.name = name;
        this.brewery = brewery;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public String getBrewery() {
        return brewery;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setBrewery(String brewery) {
        this.brewery = brewery;
    }

    @Override
    public String toString() {
        return this.getId() + " - " + this.getName() + " - " + this.getBrewery();
    }
}
