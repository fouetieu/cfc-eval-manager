package com.cfc.evalmanager.web.rest;

import com.cfc.evalmanager.CfcEvalManagerApp;
import com.cfc.evalmanager.domain.Reporting;
import com.cfc.evalmanager.domain.Objectif;
import com.cfc.evalmanager.domain.Personnel;
import com.cfc.evalmanager.repository.ReportingRepository;
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
import java.util.List;

import static com.cfc.evalmanager.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ReportingResource} REST controller.
 */
@SpringBootTest(classes = CfcEvalManagerApp.class)
public class ReportingResourceIT {

    private static final String DEFAULT_LIBELLE = "AAAAAAAAAA";
    private static final String UPDATED_LIBELLE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final byte[] DEFAULT_DOCUMENT = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_DOCUMENT = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_DOCUMENT_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_DOCUMENT_CONTENT_TYPE = "image/png";

    @Autowired
    private ReportingRepository reportingRepository;

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

    private MockMvc restReportingMockMvc;

    private Reporting reporting;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ReportingResource reportingResource = new ReportingResource(reportingRepository);
        this.restReportingMockMvc = MockMvcBuilders.standaloneSetup(reportingResource)
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
    public static Reporting createEntity(EntityManager em) {
        Reporting reporting = new Reporting()
            .libelle(DEFAULT_LIBELLE)
            .description(DEFAULT_DESCRIPTION)
            .document(DEFAULT_DOCUMENT)
            .documentContentType(DEFAULT_DOCUMENT_CONTENT_TYPE);
        // Add required entity
        Objectif objectif;
        if (TestUtil.findAll(em, Objectif.class).isEmpty()) {
            objectif = ObjectifResourceIT.createEntity(em);
            em.persist(objectif);
            em.flush();
        } else {
            objectif = TestUtil.findAll(em, Objectif.class).get(0);
        }
        reporting.setObjectif(objectif);
        // Add required entity
        Personnel personnel;
        if (TestUtil.findAll(em, Personnel.class).isEmpty()) {
            personnel = PersonnelResourceIT.createEntity(em);
            em.persist(personnel);
            em.flush();
        } else {
            personnel = TestUtil.findAll(em, Personnel.class).get(0);
        }
        reporting.setPersonnel(personnel);
        return reporting;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Reporting createUpdatedEntity(EntityManager em) {
        Reporting reporting = new Reporting()
            .libelle(UPDATED_LIBELLE)
            .description(UPDATED_DESCRIPTION)
            .document(UPDATED_DOCUMENT)
            .documentContentType(UPDATED_DOCUMENT_CONTENT_TYPE);
        // Add required entity
        Objectif objectif;
        if (TestUtil.findAll(em, Objectif.class).isEmpty()) {
            objectif = ObjectifResourceIT.createUpdatedEntity(em);
            em.persist(objectif);
            em.flush();
        } else {
            objectif = TestUtil.findAll(em, Objectif.class).get(0);
        }
        reporting.setObjectif(objectif);
        // Add required entity
        Personnel personnel;
        if (TestUtil.findAll(em, Personnel.class).isEmpty()) {
            personnel = PersonnelResourceIT.createUpdatedEntity(em);
            em.persist(personnel);
            em.flush();
        } else {
            personnel = TestUtil.findAll(em, Personnel.class).get(0);
        }
        reporting.setPersonnel(personnel);
        return reporting;
    }

    @BeforeEach
    public void initTest() {
        reporting = createEntity(em);
    }

    @Test
    @Transactional
    public void createReporting() throws Exception {
        int databaseSizeBeforeCreate = reportingRepository.findAll().size();

        // Create the Reporting
        restReportingMockMvc.perform(post("/api/reportings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reporting)))
            .andExpect(status().isCreated());

        // Validate the Reporting in the database
        List<Reporting> reportingList = reportingRepository.findAll();
        assertThat(reportingList).hasSize(databaseSizeBeforeCreate + 1);
        Reporting testReporting = reportingList.get(reportingList.size() - 1);
        assertThat(testReporting.getLibelle()).isEqualTo(DEFAULT_LIBELLE);
        assertThat(testReporting.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testReporting.getDocument()).isEqualTo(DEFAULT_DOCUMENT);
        assertThat(testReporting.getDocumentContentType()).isEqualTo(DEFAULT_DOCUMENT_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void createReportingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = reportingRepository.findAll().size();

        // Create the Reporting with an existing ID
        reporting.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restReportingMockMvc.perform(post("/api/reportings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reporting)))
            .andExpect(status().isBadRequest());

        // Validate the Reporting in the database
        List<Reporting> reportingList = reportingRepository.findAll();
        assertThat(reportingList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkLibelleIsRequired() throws Exception {
        int databaseSizeBeforeTest = reportingRepository.findAll().size();
        // set the field null
        reporting.setLibelle(null);

        // Create the Reporting, which fails.

        restReportingMockMvc.perform(post("/api/reportings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reporting)))
            .andExpect(status().isBadRequest());

        List<Reporting> reportingList = reportingRepository.findAll();
        assertThat(reportingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllReportings() throws Exception {
        // Initialize the database
        reportingRepository.saveAndFlush(reporting);

        // Get all the reportingList
        restReportingMockMvc.perform(get("/api/reportings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(reporting.getId().intValue())))
            .andExpect(jsonPath("$.[*].libelle").value(hasItem(DEFAULT_LIBELLE)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].documentContentType").value(hasItem(DEFAULT_DOCUMENT_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].document").value(hasItem(Base64Utils.encodeToString(DEFAULT_DOCUMENT))));
    }
    
    @Test
    @Transactional
    public void getReporting() throws Exception {
        // Initialize the database
        reportingRepository.saveAndFlush(reporting);

        // Get the reporting
        restReportingMockMvc.perform(get("/api/reportings/{id}", reporting.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(reporting.getId().intValue()))
            .andExpect(jsonPath("$.libelle").value(DEFAULT_LIBELLE))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.documentContentType").value(DEFAULT_DOCUMENT_CONTENT_TYPE))
            .andExpect(jsonPath("$.document").value(Base64Utils.encodeToString(DEFAULT_DOCUMENT)));
    }

    @Test
    @Transactional
    public void getNonExistingReporting() throws Exception {
        // Get the reporting
        restReportingMockMvc.perform(get("/api/reportings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateReporting() throws Exception {
        // Initialize the database
        reportingRepository.saveAndFlush(reporting);

        int databaseSizeBeforeUpdate = reportingRepository.findAll().size();

        // Update the reporting
        Reporting updatedReporting = reportingRepository.findById(reporting.getId()).get();
        // Disconnect from session so that the updates on updatedReporting are not directly saved in db
        em.detach(updatedReporting);
        updatedReporting
            .libelle(UPDATED_LIBELLE)
            .description(UPDATED_DESCRIPTION)
            .document(UPDATED_DOCUMENT)
            .documentContentType(UPDATED_DOCUMENT_CONTENT_TYPE);

        restReportingMockMvc.perform(put("/api/reportings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedReporting)))
            .andExpect(status().isOk());

        // Validate the Reporting in the database
        List<Reporting> reportingList = reportingRepository.findAll();
        assertThat(reportingList).hasSize(databaseSizeBeforeUpdate);
        Reporting testReporting = reportingList.get(reportingList.size() - 1);
        assertThat(testReporting.getLibelle()).isEqualTo(UPDATED_LIBELLE);
        assertThat(testReporting.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testReporting.getDocument()).isEqualTo(UPDATED_DOCUMENT);
        assertThat(testReporting.getDocumentContentType()).isEqualTo(UPDATED_DOCUMENT_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingReporting() throws Exception {
        int databaseSizeBeforeUpdate = reportingRepository.findAll().size();

        // Create the Reporting

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReportingMockMvc.perform(put("/api/reportings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reporting)))
            .andExpect(status().isBadRequest());

        // Validate the Reporting in the database
        List<Reporting> reportingList = reportingRepository.findAll();
        assertThat(reportingList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteReporting() throws Exception {
        // Initialize the database
        reportingRepository.saveAndFlush(reporting);

        int databaseSizeBeforeDelete = reportingRepository.findAll().size();

        // Delete the reporting
        restReportingMockMvc.perform(delete("/api/reportings/{id}", reporting.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Reporting> reportingList = reportingRepository.findAll();
        assertThat(reportingList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Reporting.class);
        Reporting reporting1 = new Reporting();
        reporting1.setId(1L);
        Reporting reporting2 = new Reporting();
        reporting2.setId(reporting1.getId());
        assertThat(reporting1).isEqualTo(reporting2);
        reporting2.setId(2L);
        assertThat(reporting1).isNotEqualTo(reporting2);
        reporting1.setId(null);
        assertThat(reporting1).isNotEqualTo(reporting2);
    }
}
