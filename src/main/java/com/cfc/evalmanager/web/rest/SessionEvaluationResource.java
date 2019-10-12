package com.cfc.evalmanager.web.rest;

import com.cfc.evalmanager.domain.SessionEvaluation;
import com.cfc.evalmanager.repository.SessionEvaluationRepository;
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
 * REST controller for managing {@link com.cfc.evalmanager.domain.SessionEvaluation}.
 */
@RestController
@RequestMapping("/api")
public class SessionEvaluationResource {

    private final Logger log = LoggerFactory.getLogger(SessionEvaluationResource.class);

    private static final String ENTITY_NAME = "sessionEvaluation";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SessionEvaluationRepository sessionEvaluationRepository;

    public SessionEvaluationResource(SessionEvaluationRepository sessionEvaluationRepository) {
        this.sessionEvaluationRepository = sessionEvaluationRepository;
    }

    /**
     * {@code POST  /session-evaluations} : Create a new sessionEvaluation.
     *
     * @param sessionEvaluation the sessionEvaluation to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new sessionEvaluation, or with status {@code 400 (Bad Request)} if the sessionEvaluation has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/session-evaluations")
    public ResponseEntity<SessionEvaluation> createSessionEvaluation(@Valid @RequestBody SessionEvaluation sessionEvaluation) throws URISyntaxException {
        log.debug("REST request to save SessionEvaluation : {}", sessionEvaluation);
        if (sessionEvaluation.getId() != null) {
            throw new BadRequestAlertException("A new sessionEvaluation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SessionEvaluation result = sessionEvaluationRepository.save(sessionEvaluation);
        return ResponseEntity.created(new URI("/api/session-evaluations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /session-evaluations} : Updates an existing sessionEvaluation.
     *
     * @param sessionEvaluation the sessionEvaluation to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated sessionEvaluation,
     * or with status {@code 400 (Bad Request)} if the sessionEvaluation is not valid,
     * or with status {@code 500 (Internal Server Error)} if the sessionEvaluation couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/session-evaluations")
    public ResponseEntity<SessionEvaluation> updateSessionEvaluation(@Valid @RequestBody SessionEvaluation sessionEvaluation) throws URISyntaxException {
        log.debug("REST request to update SessionEvaluation : {}", sessionEvaluation);
        if (sessionEvaluation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SessionEvaluation result = sessionEvaluationRepository.save(sessionEvaluation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, sessionEvaluation.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /session-evaluations} : get all the sessionEvaluations.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of sessionEvaluations in body.
     */
    @GetMapping("/session-evaluations")
    public List<SessionEvaluation> getAllSessionEvaluations() {
        log.debug("REST request to get all SessionEvaluations");
        return sessionEvaluationRepository.findAll();
    }

    /**
     * {@code GET  /session-evaluations/:id} : get the "id" sessionEvaluation.
     *
     * @param id the id of the sessionEvaluation to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the sessionEvaluation, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/session-evaluations/{id}")
    public ResponseEntity<SessionEvaluation> getSessionEvaluation(@PathVariable Long id) {
        log.debug("REST request to get SessionEvaluation : {}", id);
        Optional<SessionEvaluation> sessionEvaluation = sessionEvaluationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(sessionEvaluation);
    }

    /**
     * {@code DELETE  /session-evaluations/:id} : delete the "id" sessionEvaluation.
     *
     * @param id the id of the sessionEvaluation to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/session-evaluations/{id}")
    public ResponseEntity<Void> deleteSessionEvaluation(@PathVariable Long id) {
        log.debug("REST request to delete SessionEvaluation : {}", id);
        sessionEvaluationRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
