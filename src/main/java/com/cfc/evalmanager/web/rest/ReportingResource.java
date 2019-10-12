package com.cfc.evalmanager.web.rest;

import com.cfc.evalmanager.domain.Reporting;
import com.cfc.evalmanager.repository.ReportingRepository;
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
 * REST controller for managing {@link com.cfc.evalmanager.domain.Reporting}.
 */
@RestController
@RequestMapping("/api")
public class ReportingResource {

    private final Logger log = LoggerFactory.getLogger(ReportingResource.class);

    private static final String ENTITY_NAME = "reporting";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ReportingRepository reportingRepository;

    public ReportingResource(ReportingRepository reportingRepository) {
        this.reportingRepository = reportingRepository;
    }

    /**
     * {@code POST  /reportings} : Create a new reporting.
     *
     * @param reporting the reporting to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new reporting, or with status {@code 400 (Bad Request)} if the reporting has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/reportings")
    public ResponseEntity<Reporting> createReporting(@Valid @RequestBody Reporting reporting) throws URISyntaxException {
        log.debug("REST request to save Reporting : {}", reporting);
        if (reporting.getId() != null) {
            throw new BadRequestAlertException("A new reporting cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Reporting result = reportingRepository.save(reporting);
        return ResponseEntity.created(new URI("/api/reportings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /reportings} : Updates an existing reporting.
     *
     * @param reporting the reporting to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated reporting,
     * or with status {@code 400 (Bad Request)} if the reporting is not valid,
     * or with status {@code 500 (Internal Server Error)} if the reporting couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/reportings")
    public ResponseEntity<Reporting> updateReporting(@Valid @RequestBody Reporting reporting) throws URISyntaxException {
        log.debug("REST request to update Reporting : {}", reporting);
        if (reporting.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Reporting result = reportingRepository.save(reporting);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, reporting.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /reportings} : get all the reportings.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of reportings in body.
     */
    @GetMapping("/reportings")
    public List<Reporting> getAllReportings() {
        log.debug("REST request to get all Reportings");
        return reportingRepository.findAll();
    }

    /**
     * {@code GET  /reportings/:id} : get the "id" reporting.
     *
     * @param id the id of the reporting to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the reporting, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/reportings/{id}")
    public ResponseEntity<Reporting> getReporting(@PathVariable Long id) {
        log.debug("REST request to get Reporting : {}", id);
        Optional<Reporting> reporting = reportingRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(reporting);
    }

    /**
     * {@code DELETE  /reportings/:id} : delete the "id" reporting.
     *
     * @param id the id of the reporting to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/reportings/{id}")
    public ResponseEntity<Void> deleteReporting(@PathVariable Long id) {
        log.debug("REST request to delete Reporting : {}", id);
        reportingRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
