package com.example.back.repositories;

import com.example.back.domain.Beer;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class BeerRepository {

    private Map<Integer, Beer> beers = new HashMap<>();

    public List<Beer> findAll() {
        return new ArrayList<>(this.beers.values());
    }

    public void create(final Beer beer) {
        this.beers.put(beer.getId(), beer);
    }
}
