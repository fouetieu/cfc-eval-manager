package com.cfc.evalmanager.web.rest;

import com.cfc.evalmanager.domain.PlanDaction;
import com.cfc.evalmanager.repository.PlanDactionRepository;
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
 * REST controller for managing {@link com.cfc.evalmanager.domain.PlanDaction}.
 */
@RestController
@RequestMapping("/api")
public class PlanDactionResource {

    private final Logger log = LoggerFactory.getLogger(PlanDactionResource.class);

    private static final String ENTITY_NAME = "planDaction";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PlanDactionRepository planDactionRepository;

    public PlanDactionResource(PlanDactionRepository planDactionRepository) {
        this.planDactionRepository = planDactionRepository;
    }

    /**
     * {@code POST  /plan-dactions} : Create a new planDaction.
     *
     * @param planDaction the planDaction to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new planDaction, or with status {@code 400 (Bad Request)} if the planDaction has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/plan-dactions")
    public ResponseEntity<PlanDaction> createPlanDaction(@Valid @RequestBody PlanDaction planDaction) throws URISyntaxException {
        log.debug("REST request to save PlanDaction : {}", planDaction);
        if (planDaction.getId() != null) {
            throw new BadRequestAlertException("A new planDaction cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PlanDaction result = planDactionRepository.save(planDaction);
        return ResponseEntity.created(new URI("/api/plan-dactions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /plan-dactions} : Updates an existing planDaction.
     *
     * @param planDaction the planDaction to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated planDaction,
     * or with status {@code 400 (Bad Request)} if the planDaction is not valid,
     * or with status {@code 500 (Internal Server Error)} if the planDaction couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/plan-dactions")
    public ResponseEntity<PlanDaction> updatePlanDaction(@Valid @RequestBody PlanDaction planDaction) throws URISyntaxException {
        log.debug("REST request to update PlanDaction : {}", planDaction);
        if (planDaction.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PlanDaction result = planDactionRepository.save(planDaction);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, planDaction.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /plan-dactions} : get all the planDactions.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of planDactions in body.
     */
    @GetMapping("/plan-dactions")
    public List<PlanDaction> getAllPlanDactions() {
        log.debug("REST request to get all PlanDactions");
        return planDactionRepository.findAll();
    }

    /**
     * {@code GET  /plan-dactions/:id} : get the "id" planDaction.
     *
     * @param id the id of the planDaction to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the planDaction, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/plan-dactions/{id}")
    public ResponseEntity<PlanDaction> getPlanDaction(@PathVariable Long id) {
        log.debug("REST request to get PlanDaction : {}", id);
        Optional<PlanDaction> planDaction = planDactionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(planDaction);
    }

    /**
     * {@code DELETE  /plan-dactions/:id} : delete the "id" planDaction.
     *
     * @param id the id of the planDaction to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/plan-dactions/{id}")
    public ResponseEntity<Void> deletePlanDaction(@PathVariable Long id) {
        log.debug("REST request to delete PlanDaction : {}", id);
        planDactionRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
