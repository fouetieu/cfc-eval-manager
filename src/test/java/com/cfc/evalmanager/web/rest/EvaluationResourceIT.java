package com.cfc.evalmanager.web.rest;

import com.cfc.evalmanager.CfcEvalManagerApp;
import com.cfc.evalmanager.domain.Evaluation;
import com.cfc.evalmanager.domain.Objectif;
import com.cfc.evalmanager.domain.SessionEvaluation;
import com.cfc.evalmanager.domain.Personnel;
import com.cfc.evalmanager.repository.EvaluationRepository;
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
 * Integration tests for the {@link EvaluationResource} REST controller.
 */
@SpringBootTest(classes = CfcEvalManagerApp.class)
public class EvaluationResourceIT {

    private static final Instant DEFAULT_DATE_EVALUATION = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_EVALUATION = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_NOTE = 1;
    private static final Integer UPDATED_NOTE = 2;

    @Autowired
    private EvaluationRepository evaluationRepository;

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

    private MockMvc restEvaluationMockMvc;

    private Evaluation evaluation;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EvaluationResource evaluationResource = new EvaluationResource(evaluationRepository);
        this.restEvaluationMockMvc = MockMvcBuilders.standaloneSetup(evaluationResource)
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
    public static Evaluation createEntity(EntityManager em) {
        Evaluation evaluation = new Evaluation()
            .dateEvaluation(DEFAULT_DATE_EVALUATION)
            .note(DEFAULT_NOTE);
        // Add required entity
        Objectif objectif;
        if (TestUtil.findAll(em, Objectif.class).isEmpty()) {
            objectif = ObjectifResourceIT.createEntity(em);
            em.persist(objectif);
            em.flush();
        } else {
            objectif = TestUtil.findAll(em, Objectif.class).get(0);
        }
        evaluation.setObjectif(objectif);
        // Add required entity
        SessionEvaluation sessionEvaluation;
        if (TestUtil.findAll(em, SessionEvaluation.class).isEmpty()) {
            sessionEvaluation = SessionEvaluationResourceIT.createEntity(em);
            em.persist(sessionEvaluation);
            em.flush();
        } else {
            sessionEvaluation = TestUtil.findAll(em, SessionEvaluation.class).get(0);
        }
        evaluation.setSession(sessionEvaluation);
        // Add required entity
        Personnel personnel;
        if (TestUtil.findAll(em, Personnel.class).isEmpty()) {
            personnel = PersonnelResourceIT.createEntity(em);
            em.persist(personnel);
            em.flush();
        } else {
            personnel = TestUtil.findAll(em, Personnel.class).get(0);
        }
        evaluation.setPersonnel(personnel);
        return evaluation;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Evaluation createUpdatedEntity(EntityManager em) {
        Evaluation evaluation = new Evaluation()
            .dateEvaluation(UPDATED_DATE_EVALUATION)
            .note(UPDATED_NOTE);
        // Add required entity
        Objectif objectif;
        if (TestUtil.findAll(em, Objectif.class).isEmpty()) {
            objectif = ObjectifResourceIT.createUpdatedEntity(em);
            em.persist(objectif);
            em.flush();
        } else {
            objectif = TestUtil.findAll(em, Objectif.class).get(0);
        }
        evaluation.setObjectif(objectif);
        // Add required entity
        SessionEvaluation sessionEvaluation;
        if (TestUtil.findAll(em, SessionEvaluation.class).isEmpty()) {
            sessionEvaluation = SessionEvaluationResourceIT.createUpdatedEntity(em);
            em.persist(sessionEvaluation);
            em.flush();
        } else {
            sessionEvaluation = TestUtil.findAll(em, SessionEvaluation.class).get(0);
        }
        evaluation.setSession(sessionEvaluation);
        // Add required entity
        Personnel personnel;
        if (TestUtil.findAll(em, Personnel.class).isEmpty()) {
            personnel = PersonnelResourceIT.createUpdatedEntity(em);
            em.persist(personnel);
            em.flush();
        } else {
            personnel = TestUtil.findAll(em, Personnel.class).get(0);
        }
        evaluation.setPersonnel(personnel);
        return evaluation;
    }

    @BeforeEach
    public void initTest() {
        evaluation = createEntity(em);
    }

    @Test
    @Transactional
    public void createEvaluation() throws Exception {
        int databaseSizeBeforeCreate = evaluationRepository.findAll().size();

        // Create the Evaluation
        restEvaluationMockMvc.perform(post("/api/evaluations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(evaluation)))
            .andExpect(status().isCreated());

        // Validate the Evaluation in the database
        List<Evaluation> evaluationList = evaluationRepository.findAll();
        assertThat(evaluationList).hasSize(databaseSizeBeforeCreate + 1);
        Evaluation testEvaluation = evaluationList.get(evaluationList.size() - 1);
        assertThat(testEvaluation.getDateEvaluation()).isEqualTo(DEFAULT_DATE_EVALUATION);
        assertThat(testEvaluation.getNote()).isEqualTo(DEFAULT_NOTE);
    }

    @Test
    @Transactional
    public void createEvaluationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = evaluationRepository.findAll().size();

        // Create the Evaluation with an existing ID
        evaluation.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEvaluationMockMvc.perform(post("/api/evaluations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(evaluation)))
            .andExpect(status().isBadRequest());

        // Validate the Evaluation in the database
        List<Evaluation> evaluationList = evaluationRepository.findAll();
        assertThat(evaluationList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkDateEvaluationIsRequired() throws Exception {
        int databaseSizeBeforeTest = evaluationRepository.findAll().size();
        // set the field null
        evaluation.setDateEvaluation(null);

        // Create the Evaluation, which fails.

        restEvaluationMockMvc.perform(post("/api/evaluations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(evaluation)))
            .andExpect(status().isBadRequest());

        List<Evaluation> evaluationList = evaluationRepository.findAll();
        assertThat(evaluationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNoteIsRequired() throws Exception {
        int databaseSizeBeforeTest = evaluationRepository.findAll().size();
        // set the field null
        evaluation.setNote(null);

        // Create the Evaluation, which fails.

        restEvaluationMockMvc.perform(post("/api/evaluations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(evaluation)))
            .andExpect(status().isBadRequest());

        List<Evaluation> evaluationList = evaluationRepository.findAll();
        assertThat(evaluationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEvaluations() throws Exception {
        // Initialize the database
        evaluationRepository.saveAndFlush(evaluation);

        // Get all the evaluationList
        restEvaluationMockMvc.perform(get("/api/evaluations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(evaluation.getId().intValue())))
            .andExpect(jsonPath("$.[*].dateEvaluation").value(hasItem(DEFAULT_DATE_EVALUATION.toString())))
            .andExpect(jsonPath("$.[*].note").value(hasItem(DEFAULT_NOTE)));
    }
    
    @Test
    @Transactional
    public void getEvaluation() throws Exception {
        // Initialize the database
        evaluationRepository.saveAndFlush(evaluation);

        // Get the evaluation
        restEvaluationMockMvc.perform(get("/api/evaluations/{id}", evaluation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(evaluation.getId().intValue()))
            .andExpect(jsonPath("$.dateEvaluation").value(DEFAULT_DATE_EVALUATION.toString()))
            .andExpect(jsonPath("$.note").value(DEFAULT_NOTE));
    }

    @Test
    @Transactional
    public void getNonExistingEvaluation() throws Exception {
        // Get the evaluation
        restEvaluationMockMvc.perform(get("/api/evaluations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEvaluation() throws Exception {
        // Initialize the database
        evaluationRepository.saveAndFlush(evaluation);

        int databaseSizeBeforeUpdate = evaluationRepository.findAll().size();

        // Update the evaluation
        Evaluation updatedEvaluation = evaluationRepository.findById(evaluation.getId()).get();
        // Disconnect from session so that the updates on updatedEvaluation are not directly saved in db
        em.detach(updatedEvaluation);
        updatedEvaluation
            .dateEvaluation(UPDATED_DATE_EVALUATION)
            .note(UPDATED_NOTE);

        restEvaluationMockMvc.perform(put("/api/evaluations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEvaluation)))
            .andExpect(status().isOk());

        // Validate the Evaluation in the database
        List<Evaluation> evaluationList = evaluationRepository.findAll();
        assertThat(evaluationList).hasSize(databaseSizeBeforeUpdate);
        Evaluation testEvaluation = evaluationList.get(evaluationList.size() - 1);
        assertThat(testEvaluation.getDateEvaluation()).isEqualTo(UPDATED_DATE_EVALUATION);
        assertThat(testEvaluation.getNote()).isEqualTo(UPDATED_NOTE);
    }

    @Test
    @Transactional
    public void updateNonExistingEvaluation() throws Exception {
        int databaseSizeBeforeUpdate = evaluationRepository.findAll().size();

        // Create the Evaluation

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEvaluationMockMvc.perform(put("/api/evaluations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(evaluation)))
            .andExpect(status().isBadRequest());

        // Validate the Evaluation in the database
        List<Evaluation> evaluationList = evaluationRepository.findAll();
        assertThat(evaluationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEvaluation() throws Exception {
        // Initialize the database
        evaluationRepository.saveAndFlush(evaluation);

        int databaseSizeBeforeDelete = evaluationRepository.findAll().size();

        // Delete the evaluation
        restEvaluationMockMvc.perform(delete("/api/evaluations/{id}", evaluation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Evaluation> evaluationList = evaluationRepository.findAll();
        assertThat(evaluationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Evaluation.class);
        Evaluation evaluation1 = new Evaluation();
        evaluation1.setId(1L);
        Evaluation evaluation2 = new Evaluation();
        evaluation2.setId(evaluation1.getId());
        assertThat(evaluation1).isEqualTo(evaluation2);
        evaluation2.setId(2L);
        assertThat(evaluation1).isNotEqualTo(evaluation2);
        evaluation1.setId(null);
        assertThat(evaluation1).isNotEqualTo(evaluation2);
    }
}
