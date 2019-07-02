package com.example.back.controllers;

import com.example.back.domain.Beer;
import com.example.back.dto.BeerDto;
import com.example.back.repositories.BeerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/beers")
public class BeerController {

    private BeerRepository beerRepository;

    private Logger logger = LoggerFactory.getLogger(BeerController.class);

    public BeerController(BeerRepository beerRepository) {
        this.beerRepository = beerRepository;
    }

    @GetMapping
    public List<Beer> findAll() {
        logger.info("Finding all beers...");
        return this.beerRepository.findAll();
    }

    @PostMapping
    public void create(@RequestBody final BeerDto beerDto) {
        logger.info("Creating beer: {}", beerDto);
        final Beer beer = mapBeerDtoToBeer(beerDto);
        this.beerRepository.create(beer);
    }

    private Beer mapBeerDtoToBeer(final BeerDto beerDto) {
        return new Beer(beerDto.getId(), beerDto.getName(), beerDto.getBrewery());
    }
}
