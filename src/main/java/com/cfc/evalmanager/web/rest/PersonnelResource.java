package com.cfc.evalmanager.web.rest;

import com.cfc.evalmanager.domain.Personnel;
import com.cfc.evalmanager.repository.PersonnelRepository;
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
 * REST controller for managing {@link com.cfc.evalmanager.domain.Personnel}.
 */
@RestController
@RequestMapping("/api")
public class PersonnelResource {

    private final Logger log = LoggerFactory.getLogger(PersonnelResource.class);

    private static final String ENTITY_NAME = "personnel";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PersonnelRepository personnelRepository;

    public PersonnelResource(PersonnelRepository personnelRepository) {
        this.personnelRepository = personnelRepository;
    }

    /**
     * {@code POST  /personnels} : Create a new personnel.
     *
     * @param personnel the personnel to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new personnel, or with status {@code 400 (Bad Request)} if the personnel has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/personnels")
    public ResponseEntity<Personnel> createPersonnel(@Valid @RequestBody Personnel personnel) throws URISyntaxException {
        log.debug("REST request to save Personnel : {}", personnel);
        if (personnel.getId() != null) {
            throw new BadRequestAlertException("A new personnel cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Personnel result = personnelRepository.save(personnel);
        return ResponseEntity.created(new URI("/api/personnels/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /personnels} : Updates an existing personnel.
     *
     * @param personnel the personnel to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated personnel,
     * or with status {@code 400 (Bad Request)} if the personnel is not valid,
     * or with status {@code 500 (Internal Server Error)} if the personnel couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/personnels")
    public ResponseEntity<Personnel> updatePersonnel(@Valid @RequestBody Personnel personnel) throws URISyntaxException {
        log.debug("REST request to update Personnel : {}", personnel);
        if (personnel.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Personnel result = personnelRepository.save(personnel);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, personnel.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /personnels} : get all the personnels.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of personnels in body.
     */
    @GetMapping("/personnels")
    public List<Personnel> getAllPersonnels() {
        log.debug("REST request to get all Personnels");
        return personnelRepository.findAll();
    }

    /**
     * {@code GET  /personnels/:id} : get the "id" personnel.
     *
     * @param id the id of the personnel to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the personnel, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/personnels/{id}")
    public ResponseEntity<Personnel> getPersonnel(@PathVariable Long id) {
        log.debug("REST request to get Personnel : {}", id);
        Optional<Personnel> personnel = personnelRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(personnel);
    }

    /**
     * {@code DELETE  /personnels/:id} : delete the "id" personnel.
     *
     * @param id the id of the personnel to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/personnels/{id}")
    public ResponseEntity<Void> deletePersonnel(@PathVariable Long id) {
        log.debug("REST request to delete Personnel : {}", id);
        personnelRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
