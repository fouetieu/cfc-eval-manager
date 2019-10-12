package com.cfc.evalmanager.web.rest;

import com.cfc.evalmanager.CfcEvalManagerApp;
import com.cfc.evalmanager.domain.Objectif;
import com.cfc.evalmanager.domain.Personnel;
import com.cfc.evalmanager.repository.ObjectifRepository;
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
 * Integration tests for the {@link ObjectifResource} REST controller.
 */
@SpringBootTest(classes = CfcEvalManagerApp.class)
public class ObjectifResourceIT {

    private static final String DEFAULT_LIBELLE = "AAAAAAAAAA";
    private static final String UPDATED_LIBELLE = "BBBBBBBBBB";

    private static final String DEFAULT_LIVRABLE = "AAAAAAAAAA";
    private static final String UPDATED_LIVRABLE = "BBBBBBBBBB";

    private static final String DEFAULT_INDICATEUR = "AAAAAAAAAA";
    private static final String UPDATED_INDICATEUR = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATE_FIN = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_FIN = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private ObjectifRepository objectifRepository;

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

    private MockMvc restObjectifMockMvc;

    private Objectif objectif;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ObjectifResource objectifResource = new ObjectifResource(objectifRepository);
        this.restObjectifMockMvc = MockMvcBuilders.standaloneSetup(objectifResource)
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
    public static Objectif createEntity(EntityManager em) {
        Objectif objectif = new Objectif()
            .libelle(DEFAULT_LIBELLE)
            .livrable(DEFAULT_LIVRABLE)
            .indicateur(DEFAULT_INDICATEUR)
            .dateFin(DEFAULT_DATE_FIN);
        // Add required entity
        Personnel personnel;
        if (TestUtil.findAll(em, Personnel.class).isEmpty()) {
            personnel = PersonnelResourceIT.createEntity(em);
            em.persist(personnel);
            em.flush();
        } else {
            personnel = TestUtil.findAll(em, Personnel.class).get(0);
        }
        objectif.setPersonnel(personnel);
        return objectif;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Objectif createUpdatedEntity(EntityManager em) {
        Objectif objectif = new Objectif()
            .libelle(UPDATED_LIBELLE)
            .livrable(UPDATED_LIVRABLE)
            .indicateur(UPDATED_INDICATEUR)
            .dateFin(UPDATED_DATE_FIN);
        // Add required entity
        Personnel personnel;
        if (TestUtil.findAll(em, Personnel.class).isEmpty()) {
            personnel = PersonnelResourceIT.createUpdatedEntity(em);
            em.persist(personnel);
            em.flush();
        } else {
            personnel = TestUtil.findAll(em, Personnel.class).get(0);
        }
        objectif.setPersonnel(personnel);
        return objectif;
    }

    @BeforeEach
    public void initTest() {
        objectif = createEntity(em);
    }

    @Test
    @Transactional
    public void createObjectif() throws Exception {
        int databaseSizeBeforeCreate = objectifRepository.findAll().size();

        // Create the Objectif
        restObjectifMockMvc.perform(post("/api/objectifs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(objectif)))
            .andExpect(status().isCreated());

        // Validate the Objectif in the database
        List<Objectif> objectifList = objectifRepository.findAll();
        assertThat(objectifList).hasSize(databaseSizeBeforeCreate + 1);
        Objectif testObjectif = objectifList.get(objectifList.size() - 1);
        assertThat(testObjectif.getLibelle()).isEqualTo(DEFAULT_LIBELLE);
        assertThat(testObjectif.getLivrable()).isEqualTo(DEFAULT_LIVRABLE);
        assertThat(testObjectif.getIndicateur()).isEqualTo(DEFAULT_INDICATEUR);
        assertThat(testObjectif.getDateFin()).isEqualTo(DEFAULT_DATE_FIN);
    }

    @Test
    @Transactional
    public void createObjectifWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = objectifRepository.findAll().size();

        // Create the Objectif with an existing ID
        objectif.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restObjectifMockMvc.perform(post("/api/objectifs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(objectif)))
            .andExpect(status().isBadRequest());

        // Validate the Objectif in the database
        List<Objectif> objectifList = objectifRepository.findAll();
        assertThat(objectifList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkLibelleIsRequired() throws Exception {
        int databaseSizeBeforeTest = objectifRepository.findAll().size();
        // set the field null
        objectif.setLibelle(null);

        // Create the Objectif, which fails.

        restObjectifMockMvc.perform(post("/api/objectifs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(objectif)))
            .andExpect(status().isBadRequest());

        List<Objectif> objectifList = objectifRepository.findAll();
        assertThat(objectifList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateFinIsRequired() throws Exception {
        int databaseSizeBeforeTest = objectifRepository.findAll().size();
        // set the field null
        objectif.setDateFin(null);

        // Create the Objectif, which fails.

        restObjectifMockMvc.perform(post("/api/objectifs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(objectif)))
            .andExpect(status().isBadRequest());

        List<Objectif> objectifList = objectifRepository.findAll();
        assertThat(objectifList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllObjectifs() throws Exception {
        // Initialize the database
        objectifRepository.saveAndFlush(objectif);

        // Get all the objectifList
        restObjectifMockMvc.perform(get("/api/objectifs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(objectif.getId().intValue())))
            .andExpect(jsonPath("$.[*].libelle").value(hasItem(DEFAULT_LIBELLE)))
            .andExpect(jsonPath("$.[*].livrable").value(hasItem(DEFAULT_LIVRABLE.toString())))
            .andExpect(jsonPath("$.[*].indicateur").value(hasItem(DEFAULT_INDICATEUR.toString())))
            .andExpect(jsonPath("$.[*].dateFin").value(hasItem(DEFAULT_DATE_FIN.toString())));
    }
    
    @Test
    @Transactional
    public void getObjectif() throws Exception {
        // Initialize the database
        objectifRepository.saveAndFlush(objectif);

        // Get the objectif
        restObjectifMockMvc.perform(get("/api/objectifs/{id}", objectif.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(objectif.getId().intValue()))
            .andExpect(jsonPath("$.libelle").value(DEFAULT_LIBELLE))
            .andExpect(jsonPath("$.livrable").value(DEFAULT_LIVRABLE.toString()))
            .andExpect(jsonPath("$.indicateur").value(DEFAULT_INDICATEUR.toString()))
            .andExpect(jsonPath("$.dateFin").value(DEFAULT_DATE_FIN.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingObjectif() throws Exception {
        // Get the objectif
        restObjectifMockMvc.perform(get("/api/objectifs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateObjectif() throws Exception {
        // Initialize the database
        objectifRepository.saveAndFlush(objectif);

        int databaseSizeBeforeUpdate = objectifRepository.findAll().size();

        // Update the objectif
        Objectif updatedObjectif = objectifRepository.findById(objectif.getId()).get();
        // Disconnect from session so that the updates on updatedObjectif are not directly saved in db
        em.detach(updatedObjectif);
        updatedObjectif
            .libelle(UPDATED_LIBELLE)
            .livrable(UPDATED_LIVRABLE)
            .indicateur(UPDATED_INDICATEUR)
            .dateFin(UPDATED_DATE_FIN);

        restObjectifMockMvc.perform(put("/api/objectifs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedObjectif)))
            .andExpect(status().isOk());

        // Validate the Objectif in the database
        List<Objectif> objectifList = objectifRepository.findAll();
        assertThat(objectifList).hasSize(databaseSizeBeforeUpdate);
        Objectif testObjectif = objectifList.get(objectifList.size() - 1);
        assertThat(testObjectif.getLibelle()).isEqualTo(UPDATED_LIBELLE);
        assertThat(testObjectif.getLivrable()).isEqualTo(UPDATED_LIVRABLE);
        assertThat(testObjectif.getIndicateur()).isEqualTo(UPDATED_INDICATEUR);
        assertThat(testObjectif.getDateFin()).isEqualTo(UPDATED_DATE_FIN);
    }

    @Test
    @Transactional
    public void updateNonExistingObjectif() throws Exception {
        int databaseSizeBeforeUpdate = objectifRepository.findAll().size();

        // Create the Objectif

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restObjectifMockMvc.perform(put("/api/objectifs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(objectif)))
            .andExpect(status().isBadRequest());

        // Validate the Objectif in the database
        List<Objectif> objectifList = objectifRepository.findAll();
        assertThat(objectifList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteObjectif() throws Exception {
        // Initialize the database
        objectifRepository.saveAndFlush(objectif);

        int databaseSizeBeforeDelete = objectifRepository.findAll().size();

        // Delete the objectif
        restObjectifMockMvc.perform(delete("/api/objectifs/{id}", objectif.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Objectif> objectifList = objectifRepository.findAll();
        assertThat(objectifList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Objectif.class);
        Objectif objectif1 = new Objectif();
        objectif1.setId(1L);
        Objectif objectif2 = new Objectif();
        objectif2.setId(objectif1.getId());
        assertThat(objectif1).isEqualTo(objectif2);
        objectif2.setId(2L);
        assertThat(objectif1).isNotEqualTo(objectif2);
        objectif1.setId(null);
        assertThat(objectif1).isNotEqualTo(objectif2);
    }
}
