package com.cfc.evalmanager.web.rest;

import com.cfc.evalmanager.CfcEvalManagerApp;
import com.cfc.evalmanager.domain.PlanDaction;
import com.cfc.evalmanager.domain.Objectif;
import com.cfc.evalmanager.domain.Personnel;
import com.cfc.evalmanager.repository.PlanDactionRepository;
import com.cfc.evalmanager.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.cfc.evalmanager.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link PlanDactionResource} REST controller.
 */
@SpringBootTest(classes = CfcEvalManagerApp.class)
public class PlanDactionResourceIT {

    private static final String DEFAULT_TACHE = "AAAAAAAAAA";
    private static final String UPDATED_TACHE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATE_DEBUT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_DEBUT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DATE_F_IN = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_F_IN = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private PlanDactionRepository planDactionRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restPlanDactionMockMvc;

    private PlanDaction planDaction;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PlanDactionResource planDactionResource = new PlanDactionResource(planDactionRepository);
        this.restPlanDactionMockMvc = MockMvcBuilders.standaloneSetup(planDactionResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PlanDaction createEntity(EntityManager em) {
        PlanDaction planDaction = new PlanDaction()
            .tache(DEFAULT_TACHE)
            .description(DEFAULT_DESCRIPTION)
            .dateDebut(DEFAULT_DATE_DEBUT)
            .dateFIn(DEFAULT_DATE_F_IN);
        // Add required entity
        Objectif objectif;
        if (TestUtil.findAll(em, Objectif.class).isEmpty()) {
            objectif = ObjectifResourceIT.createEntity(em);
            em.persist(objectif);
            em.flush();
        } else {
            objectif = TestUtil.findAll(em, Objectif.class).get(0);
        }
        planDaction.setObjectif(objectif);
        // Add required entity
        Personnel personnel;
        if (TestUtil.findAll(em, Personnel.class).isEmpty()) {
            personnel = PersonnelResourceIT.createEntity(em);
            em.persist(personnel);
            em.flush();
        } else {
            personnel = TestUtil.findAll(em, Personnel.class).get(0);
        }
        planDaction.setPersonnel(personnel);
        return planDaction;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PlanDaction createUpdatedEntity(EntityManager em) {
        PlanDaction planDaction = new PlanDaction()
            .tache(UPDATED_TACHE)
            .description(UPDATED_DESCRIPTION)
            .dateDebut(UPDATED_DATE_DEBUT)
            .dateFIn(UPDATED_DATE_F_IN);
        // Add required entity
        Objectif objectif;
        if (TestUtil.findAll(em, Objectif.class).isEmpty()) {
            objectif = ObjectifResourceIT.createUpdatedEntity(em);
            em.persist(objectif);
            em.flush();
        } else {
            objectif = TestUtil.findAll(em, Objectif.class).get(0);
        }
        planDaction.setObjectif(objectif);
        // Add required entity
        Personnel personnel;
        if (TestUtil.findAll(em, Personnel.class).isEmpty()) {
            personnel = PersonnelResourceIT.createUpdatedEntity(em);
            em.persist(personnel);
            em.flush();
        } else {
            personnel = TestUtil.findAll(em, Personnel.class).get(0);
        }
        planDaction.setPersonnel(personnel);
        return planDaction;
    }

    @BeforeEach
    public void initTest() {
        planDaction = createEntity(em);
    }

    @Test
    @Transactional
    public void createPlanDaction() throws Exception {
        int databaseSizeBeforeCreate = planDactionRepository.findAll().size();

        // Create the PlanDaction
        restPlanDactionMockMvc.perform(post("/api/plan-dactions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(planDaction)))
            .andExpect(status().isCreated());

        // Validate the PlanDaction in the database
        List<PlanDaction> planDactionList = planDactionRepository.findAll();
        assertThat(planDactionList).hasSize(databaseSizeBeforeCreate + 1);
        PlanDaction testPlanDaction = planDactionList.get(planDactionList.size() - 1);
        assertThat(testPlanDaction.getTache()).isEqualTo(DEFAULT_TACHE);
        assertThat(testPlanDaction.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testPlanDaction.getDateDebut()).isEqualTo(DEFAULT_DATE_DEBUT);
        assertThat(testPlanDaction.getDateFIn()).isEqualTo(DEFAULT_DATE_F_IN);
    }

    @Test
    @Transactional
    public void createPlanDactionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = planDactionRepository.findAll().size();

        // Create the PlanDaction with an existing ID
        planDaction.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPlanDactionMockMvc.perform(post("/api/plan-dactions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(planDaction)))
            .andExpect(status().isBadRequest());

        // Validate the PlanDaction in the database
        List<PlanDaction> planDactionList = planDactionRepository.findAll();
        assertThat(planDactionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTacheIsRequired() throws Exception {
        int databaseSizeBeforeTest = planDactionRepository.findAll().size();
        // set the field null
        planDaction.setTache(null);

        // Create the PlanDaction, which fails.

        restPlanDactionMockMvc.perform(post("/api/plan-dactions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(planDaction)))
            .andExpect(status().isBadRequest());

        List<PlanDaction> planDactionList = planDactionRepository.findAll();
        assertThat(planDactionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPlanDactions() throws Exception {
        // Initialize the database
        planDactionRepository.saveAndFlush(planDaction);

        // Get all the planDactionList
        restPlanDactionMockMvc.perform(get("/api/plan-dactions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(planDaction.getId().intValue())))
            .andExpect(jsonPath("$.[*].tache").value(hasItem(DEFAULT_TACHE)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].dateDebut").value(hasItem(DEFAULT_DATE_DEBUT.toString())))
            .andExpect(jsonPath("$.[*].dateFIn").value(hasItem(DEFAULT_DATE_F_IN.toString())));
    }
    
    @Test
    @Transactional
    public void getPlanDaction() throws Exception {
        // Initialize the database
        planDactionRepository.saveAndFlush(planDaction);

        // Get the planDaction
        restPlanDactionMockMvc.perform(get("/api/plan-dactions/{id}", planDaction.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(planDaction.getId().intValue()))
            .andExpect(jsonPath("$.tache").value(DEFAULT_TACHE))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.dateDebut").value(DEFAULT_DATE_DEBUT.toString()))
            .andExpect(jsonPath("$.dateFIn").value(DEFAULT_DATE_F_IN.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPlanDaction() throws Exception {
        // Get the planDaction
        restPlanDactionMockMvc.perform(get("/api/plan-dactions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePlanDaction() throws Exception {
        // Initialize the database
        planDactionRepository.saveAndFlush(planDaction);

        int databaseSizeBeforeUpdate = planDactionRepository.findAll().size();

        // Update the planDaction
        PlanDaction updatedPlanDaction = planDactionRepository.findById(planDaction.getId()).get();
        // Disconnect from session so that the updates on updatedPlanDaction are not directly saved in db
        em.detach(updatedPlanDaction);
        updatedPlanDaction
            .tache(UPDATED_TACHE)
            .description(UPDATED_DESCRIPTION)
            .dateDebut(UPDATED_DATE_DEBUT)
            .dateFIn(UPDATED_DATE_F_IN);

        restPlanDactionMockMvc.perform(put("/api/plan-dactions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPlanDaction)))
            .andExpect(status().isOk());

        // Validate the PlanDaction in the database
        List<PlanDaction> planDactionList = planDactionRepository.findAll();
        assertThat(planDactionList).hasSize(databaseSizeBeforeUpdate);
        PlanDaction testPlanDaction = planDactionList.get(planDactionList.size() - 1);
        assertThat(testPlanDaction.getTache()).isEqualTo(UPDATED_TACHE);
        assertThat(testPlanDaction.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testPlanDaction.getDateDebut()).isEqualTo(UPDATED_DATE_DEBUT);
        assertThat(testPlanDaction.getDateFIn()).isEqualTo(UPDATED_DATE_F_IN);
    }

    @Test
    @Transactional
    public void updateNonExistingPlanDaction() throws Exception {
        int databaseSizeBeforeUpdate = planDactionRepository.findAll().size();

        // Create the PlanDaction

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPlanDactionMockMvc.perform(put("/api/plan-dactions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(planDaction)))
            .andExpect(status().isBadRequest());

        // Validate the PlanDaction in the database
        List<PlanDaction> planDactionList = planDactionRepository.findAll();
        assertThat(planDactionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePlanDaction() throws Exception {
        // Initialize the database
        planDactionRepository.saveAndFlush(planDaction);

        int databaseSizeBeforeDelete = planDactionRepository.findAll().size();

        // Delete the planDaction
        restPlanDactionMockMvc.perform(delete("/api/plan-dactions/{id}", planDaction.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PlanDaction> planDactionList = planDactionRepository.findAll();
        assertThat(planDactionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PlanDaction.class);
        PlanDaction planDaction1 = new PlanDaction();
        planDaction1.setId(1L);
        PlanDaction planDaction2 = new PlanDaction();
        planDaction2.setId(planDaction1.getId());
        assertThat(planDaction1).isEqualTo(planDaction2);
        planDaction2.setId(2L);
        assertThat(planDaction1).isNotEqualTo(planDaction2);
        planDaction1.setId(null);
        assertThat(planDaction1).isNotEqualTo(planDaction2);
    }
}
