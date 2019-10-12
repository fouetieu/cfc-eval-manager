package com.cfc.evalmanager.web.rest;

import com.cfc.evalmanager.domain.Objectif;
import com.cfc.evalmanager.repository.ObjectifRepository;
import com.cfc.evalmanager.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.cfc.evalmanager.domain.Objectif}.
 */
@RestController
@RequestMapping("/api")
public class ObjectifResource {

    private final Logger log = LoggerFactory.getLogger(ObjectifResource.class);

    private static final String ENTITY_NAME = "objectif";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ObjectifRepository objectifRepository;

    public ObjectifResource(ObjectifRepository objectifRepository) {
        this.objectifRepository = objectifRepository;
    }

    /**
     * {@code POST  /objectifs} : Create a new objectif.
     *
     * @param objectif the objectif to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new objectif, or with status {@code 400 (Bad Request)} if the objectif has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/objectifs")
    public ResponseEntity<Objectif> createObjectif(@Valid @RequestBody Objectif objectif) throws URISyntaxException {
        log.debug("REST request to save Objectif : {}", objectif);
        if (objectif.getId() != null) {
            throw new BadRequestAlertException("A new objectif cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Objectif result = objectifRepository.save(objectif);
        return ResponseEntity.created(new URI("/api/objectifs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /objectifs} : Updates an existing objectif.
     *
     * @param objectif the objectif to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated objectif,
     * or with status {@code 400 (Bad Request)} if the objectif is not valid,
     * or with status {@code 500 (Internal Server Error)} if the objectif couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/objectifs")
    public ResponseEntity<Objectif> updateObjectif(@Valid @RequestBody Objectif objectif) throws URISyntaxException {
        log.debug("REST request to update Objectif : {}", objectif);
        if (objectif.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Objectif result = objectifRepository.save(objectif);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, objectif.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /objectifs} : get all the objectifs.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of objectifs in body.
     */
    @GetMapping("/objectifs")
    public List<Objectif> getAllObjectifs() {
        log.debug("REST request to get all Objectifs");
        return objectifRepository.findAll();
    }

    /**
     * {@code GET  /objectifs/:id} : get the "id" objectif.
     *
     * @param id the id of the objectif to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the objectif, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/objectifs/{id}")
    public ResponseEntity<Objectif> getObjectif(@PathVariable Long id) {
        log.debug("REST request to get Objectif : {}", id);
        Optional<Objectif> objectif = objectifRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(objectif);
    }

    /**
     * {@code DELETE  /objectifs/:id} : delete the "id" objectif.
     *
     * @param id the id of the objectif to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/objectifs/{id}")
    public ResponseEntity<Void> deleteObjectif(@PathVariable Long id) {
        log.debug("REST request to delete Objectif : {}", id);
        objectifRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
