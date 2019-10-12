package com.cfc.evalmanager.web.rest;

import com.cfc.evalmanager.CfcEvalManagerApp;
import com.cfc.evalmanager.domain.SessionEvaluation;
import com.cfc.evalmanager.repository.SessionEvaluationRepository;
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
 * Integration tests for the {@link SessionEvaluationResource} REST controller.
 */
@SpringBootTest(classes = CfcEvalManagerApp.class)
public class SessionEvaluationResourceIT {

    private static final String DEFAULT_LIBELLE = "AAAAAAAAAA";
    private static final String UPDATED_LIBELLE = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATE_DEBUT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_DEBUT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DATE_FIN = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_FIN = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Boolean DEFAULT_ACTIVE = false;
    private static final Boolean UPDATED_ACTIVE = true;

    @Autowired
    private SessionEvaluationRepository sessionEvaluationRepository;

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

    private MockMvc restSessionEvaluationMockMvc;

    private SessionEvaluation sessionEvaluation;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SessionEvaluationResource sessionEvaluationResource = new SessionEvaluationResource(sessionEvaluationRepository);
        this.restSessionEvaluationMockMvc = MockMvcBuilders.standaloneSetup(sessionEvaluationResource)
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
    public static SessionEvaluation createEntity(EntityManager em) {
        SessionEvaluation sessionEvaluation = new SessionEvaluation()
            .libelle(DEFAULT_LIBELLE)
            .dateDebut(DEFAULT_DATE_DEBUT)
            .dateFin(DEFAULT_DATE_FIN)
            .active(DEFAULT_ACTIVE);
        return sessionEvaluation;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SessionEvaluation createUpdatedEntity(EntityManager em) {
        SessionEvaluation sessionEvaluation = new SessionEvaluation()
            .libelle(UPDATED_LIBELLE)
            .dateDebut(UPDATED_DATE_DEBUT)
            .dateFin(UPDATED_DATE_FIN)
            .active(UPDATED_ACTIVE);
        return sessionEvaluation;
    }

    @BeforeEach
    public void initTest() {
        sessionEvaluation = createEntity(em);
    }

    @Test
    @Transactional
    public void createSessionEvaluation() throws Exception {
        int databaseSizeBeforeCreate = sessionEvaluationRepository.findAll().size();

        // Create the SessionEvaluation
        restSessionEvaluationMockMvc.perform(post("/api/session-evaluations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sessionEvaluation)))
            .andExpect(status().isCreated());

        // Validate the SessionEvaluation in the database
        List<SessionEvaluation> sessionEvaluationList = sessionEvaluationRepository.findAll();
        assertThat(sessionEvaluationList).hasSize(databaseSizeBeforeCreate + 1);
        SessionEvaluation testSessionEvaluation = sessionEvaluationList.get(sessionEvaluationList.size() - 1);
        assertThat(testSessionEvaluation.getLibelle()).isEqualTo(DEFAULT_LIBELLE);
        assertThat(testSessionEvaluation.getDateDebut()).isEqualTo(DEFAULT_DATE_DEBUT);
        assertThat(testSessionEvaluation.getDateFin()).isEqualTo(DEFAULT_DATE_FIN);
        assertThat(testSessionEvaluation.isActive()).isEqualTo(DEFAULT_ACTIVE);
    }

    @Test
    @Transactional
    public void createSessionEvaluationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sessionEvaluationRepository.findAll().size();

        // Create the SessionEvaluation with an existing ID
        sessionEvaluation.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSessionEvaluationMockMvc.perform(post("/api/session-evaluations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sessionEvaluation)))
            .andExpect(status().isBadRequest());

        // Validate the SessionEvaluation in the database
        List<SessionEvaluation> sessionEvaluationList = sessionEvaluationRepository.findAll();
        assertThat(sessionEvaluationList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkLibelleIsRequired() throws Exception {
        int databaseSizeBeforeTest = sessionEvaluationRepository.findAll().size();
        // set the field null
        sessionEvaluation.setLibelle(null);

        // Create the SessionEvaluation, which fails.

        restSessionEvaluationMockMvc.perform(post("/api/session-evaluations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sessionEvaluation)))
            .andExpect(status().isBadRequest());

        List<SessionEvaluation> sessionEvaluationList = sessionEvaluationRepository.findAll();
        assertThat(sessionEvaluationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateDebutIsRequired() throws Exception {
        int databaseSizeBeforeTest = sessionEvaluationRepository.findAll().size();
        // set the field null
        sessionEvaluation.setDateDebut(null);

        // Create the SessionEvaluation, which fails.

        restSessionEvaluationMockMvc.perform(post("/api/session-evaluations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sessionEvaluation)))
            .andExpect(status().isBadRequest());

        List<SessionEvaluation> sessionEvaluationList = sessionEvaluationRepository.findAll();
        assertThat(sessionEvaluationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateFinIsRequired() throws Exception {
        int databaseSizeBeforeTest = sessionEvaluationRepository.findAll().size();
        // set the field null
        sessionEvaluation.setDateFin(null);

        // Create the SessionEvaluation, which fails.

        restSessionEvaluationMockMvc.perform(post("/api/session-evaluations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sessionEvaluation)))
            .andExpect(status().isBadRequest());

        List<SessionEvaluation> sessionEvaluationList = sessionEvaluationRepository.findAll();
        assertThat(sessionEvaluationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkActiveIsRequired() throws Exception {
        int databaseSizeBeforeTest = sessionEvaluationRepository.findAll().size();
        // set the field null
        sessionEvaluation.setActive(null);

        // Create the SessionEvaluation, which fails.

        restSessionEvaluationMockMvc.perform(post("/api/session-evaluations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sessionEvaluation)))
            .andExpect(status().isBadRequest());

        List<SessionEvaluation> sessionEvaluationList = sessionEvaluationRepository.findAll();
        assertThat(sessionEvaluationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSessionEvaluations() throws Exception {
        // Initialize the database
        sessionEvaluationRepository.saveAndFlush(sessionEvaluation);

        // Get all the sessionEvaluationList
        restSessionEvaluationMockMvc.perform(get("/api/session-evaluations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sessionEvaluation.getId().intValue())))
            .andExpect(jsonPath("$.[*].libelle").value(hasItem(DEFAULT_LIBELLE)))
            .andExpect(jsonPath("$.[*].dateDebut").value(hasItem(DEFAULT_DATE_DEBUT.toString())))
            .andExpect(jsonPath("$.[*].dateFin").value(hasItem(DEFAULT_DATE_FIN.toString())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getSessionEvaluation() throws Exception {
        // Initialize the database
        sessionEvaluationRepository.saveAndFlush(sessionEvaluation);

        // Get the sessionEvaluation
        restSessionEvaluationMockMvc.perform(get("/api/session-evaluations/{id}", sessionEvaluation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(sessionEvaluation.getId().intValue()))
            .andExpect(jsonPath("$.libelle").value(DEFAULT_LIBELLE))
            .andExpect(jsonPath("$.dateDebut").value(DEFAULT_DATE_DEBUT.toString()))
            .andExpect(jsonPath("$.dateFin").value(DEFAULT_DATE_FIN.toString()))
            .andExpect(jsonPath("$.active").value(DEFAULT_ACTIVE.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingSessionEvaluation() throws Exception {
        // Get the sessionEvaluation
        restSessionEvaluationMockMvc.perform(get("/api/session-evaluations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSessionEvaluation() throws Exception {
        // Initialize the database
        sessionEvaluationRepository.saveAndFlush(sessionEvaluation);

        int databaseSizeBeforeUpdate = sessionEvaluationRepository.findAll().size();

        // Update the sessionEvaluation
        SessionEvaluation updatedSessionEvaluation = sessionEvaluationRepository.findById(sessionEvaluation.getId()).get();
        // Disconnect from session so that the updates on updatedSessionEvaluation are not directly saved in db
        em.detach(updatedSessionEvaluation);
        updatedSessionEvaluation
            .libelle(UPDATED_LIBELLE)
            .dateDebut(UPDATED_DATE_DEBUT)
            .dateFin(UPDATED_DATE_FIN)
            .active(UPDATED_ACTIVE);

        restSessionEvaluationMockMvc.perform(put("/api/session-evaluations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSessionEvaluation)))
            .andExpect(status().isOk());

        // Validate the SessionEvaluation in the database
        List<SessionEvaluation> sessionEvaluationList = sessionEvaluationRepository.findAll();
        assertThat(sessionEvaluationList).hasSize(databaseSizeBeforeUpdate);
        SessionEvaluation testSessionEvaluation = sessionEvaluationList.get(sessionEvaluationList.size() - 1);
        assertThat(testSessionEvaluation.getLibelle()).isEqualTo(UPDATED_LIBELLE);
        assertThat(testSessionEvaluation.getDateDebut()).isEqualTo(UPDATED_DATE_DEBUT);
        assertThat(testSessionEvaluation.getDateFin()).isEqualTo(UPDATED_DATE_FIN);
        assertThat(testSessionEvaluation.isActive()).isEqualTo(UPDATED_ACTIVE);
    }

    @Test
    @Transactional
    public void updateNonExistingSessionEvaluation() throws Exception {
        int databaseSizeBeforeUpdate = sessionEvaluationRepository.findAll().size();

        // Create the SessionEvaluation

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSessionEvaluationMockMvc.perform(put("/api/session-evaluations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sessionEvaluation)))
            .andExpect(status().isBadRequest());

        // Validate the SessionEvaluation in the database
        List<SessionEvaluation> sessionEvaluationList = sessionEvaluationRepository.findAll();
        assertThat(sessionEvaluationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSessionEvaluation() throws Exception {
        // Initialize the database
        sessionEvaluationRepository.saveAndFlush(sessionEvaluation);

        int databaseSizeBeforeDelete = sessionEvaluationRepository.findAll().size();

        // Delete the sessionEvaluation
        restSessionEvaluationMockMvc.perform(delete("/api/session-evaluations/{id}", sessionEvaluation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SessionEvaluation> sessionEvaluationList = sessionEvaluationRepository.findAll();
        assertThat(sessionEvaluationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SessionEvaluation.class);
        SessionEvaluation sessionEvaluation1 = new SessionEvaluation();
        sessionEvaluation1.setId(1L);
        SessionEvaluation sessionEvaluation2 = new SessionEvaluation();
        sessionEvaluation2.setId(sessionEvaluation1.getId());
        assertThat(sessionEvaluation1).isEqualTo(sessionEvaluation2);
        sessionEvaluation2.setId(2L);
        assertThat(sessionEvaluation1).isNotEqualTo(sessionEvaluation2);
        sessionEvaluation1.setId(null);
        assertThat(sessionEvaluation1).isNotEqualTo(sessionEvaluation2);
    }
}
