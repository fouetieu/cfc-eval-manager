package com.cfc.evalmanager.web.rest;

import com.cfc.evalmanager.CfcEvalManagerApp;
import com.cfc.evalmanager.domain.Personnel;
import com.cfc.evalmanager.repository.PersonnelRepository;
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
 * Integration tests for the {@link PersonnelResource} REST controller.
 */
@SpringBootTest(classes = CfcEvalManagerApp.class)
public class PersonnelResourceIT {

    private static final String DEFAULT_MATRICULE = "AAAAAAAAAA";
    private static final String UPDATED_MATRICULE = "BBBBBBBBBB";

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_POSTE = "AAAAAAAAAA";
    private static final String UPDATED_POSTE = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATE_NAISS = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_NAISS = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_SEXE = "AAAAAAAAAA";
    private static final String UPDATED_SEXE = "BBBBBBBBBB";

    @Autowired
    private PersonnelRepository personnelRepository;

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

    private MockMvc restPersonnelMockMvc;

    private Personnel personnel;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PersonnelResource personnelResource = new PersonnelResource(personnelRepository);
        this.restPersonnelMockMvc = MockMvcBuilders.standaloneSetup(personnelResource)
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
    public static Personnel createEntity(EntityManager em) {
        Personnel personnel = new Personnel()
            .matricule(DEFAULT_MATRICULE)
            .nom(DEFAULT_NOM)
            .poste(DEFAULT_POSTE)
            .dateNaiss(DEFAULT_DATE_NAISS)
            .sexe(DEFAULT_SEXE);
        return personnel;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Personnel createUpdatedEntity(EntityManager em) {
        Personnel personnel = new Personnel()
            .matricule(UPDATED_MATRICULE)
            .nom(UPDATED_NOM)
            .poste(UPDATED_POSTE)
            .dateNaiss(UPDATED_DATE_NAISS)
            .sexe(UPDATED_SEXE);
        return personnel;
    }

    @BeforeEach
    public void initTest() {
        personnel = createEntity(em);
    }

    @Test
    @Transactional
    public void createPersonnel() throws Exception {
        int databaseSizeBeforeCreate = personnelRepository.findAll().size();

        // Create the Personnel
        restPersonnelMockMvc.perform(post("/api/personnels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(personnel)))
            .andExpect(status().isCreated());

        // Validate the Personnel in the database
        List<Personnel> personnelList = personnelRepository.findAll();
        assertThat(personnelList).hasSize(databaseSizeBeforeCreate + 1);
        Personnel testPersonnel = personnelList.get(personnelList.size() - 1);
        assertThat(testPersonnel.getMatricule()).isEqualTo(DEFAULT_MATRICULE);
        assertThat(testPersonnel.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testPersonnel.getPoste()).isEqualTo(DEFAULT_POSTE);
        assertThat(testPersonnel.getDateNaiss()).isEqualTo(DEFAULT_DATE_NAISS);
        assertThat(testPersonnel.getSexe()).isEqualTo(DEFAULT_SEXE);
    }

    @Test
    @Transactional
    public void createPersonnelWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = personnelRepository.findAll().size();

        // Create the Personnel with an existing ID
        personnel.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPersonnelMockMvc.perform(post("/api/personnels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(personnel)))
            .andExpect(status().isBadRequest());

        // Validate the Personnel in the database
        List<Personnel> personnelList = personnelRepository.findAll();
        assertThat(personnelList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkMatriculeIsRequired() throws Exception {
        int databaseSizeBeforeTest = personnelRepository.findAll().size();
        // set the field null
        personnel.setMatricule(null);

        // Create the Personnel, which fails.

        restPersonnelMockMvc.perform(post("/api/personnels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(personnel)))
            .andExpect(status().isBadRequest());

        List<Personnel> personnelList = personnelRepository.findAll();
        assertThat(personnelList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNomIsRequired() throws Exception {
        int databaseSizeBeforeTest = personnelRepository.findAll().size();
        // set the field null
        personnel.setNom(null);

        // Create the Personnel, which fails.

        restPersonnelMockMvc.perform(post("/api/personnels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(personnel)))
            .andExpect(status().isBadRequest());

        List<Personnel> personnelList = personnelRepository.findAll();
        assertThat(personnelList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPersonnels() throws Exception {
        // Initialize the database
        personnelRepository.saveAndFlush(personnel);

        // Get all the personnelList
        restPersonnelMockMvc.perform(get("/api/personnels?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(personnel.getId().intValue())))
            .andExpect(jsonPath("$.[*].matricule").value(hasItem(DEFAULT_MATRICULE)))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].poste").value(hasItem(DEFAULT_POSTE)))
            .andExpect(jsonPath("$.[*].dateNaiss").value(hasItem(DEFAULT_DATE_NAISS.toString())))
            .andExpect(jsonPath("$.[*].sexe").value(hasItem(DEFAULT_SEXE)));
    }
    
    @Test
    @Transactional
    public void getPersonnel() throws Exception {
        // Initialize the database
        personnelRepository.saveAndFlush(personnel);

        // Get the personnel
        restPersonnelMockMvc.perform(get("/api/personnels/{id}", personnel.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(personnel.getId().intValue()))
            .andExpect(jsonPath("$.matricule").value(DEFAULT_MATRICULE))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM))
            .andExpect(jsonPath("$.poste").value(DEFAULT_POSTE))
            .andExpect(jsonPath("$.dateNaiss").value(DEFAULT_DATE_NAISS.toString()))
            .andExpect(jsonPath("$.sexe").value(DEFAULT_SEXE));
    }

    @Test
    @Transactional
    public void getNonExistingPersonnel() throws Exception {
        // Get the personnel
        restPersonnelMockMvc.perform(get("/api/personnels/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePersonnel() throws Exception {
        // Initialize the database
        personnelRepository.saveAndFlush(personnel);

        int databaseSizeBeforeUpdate = personnelRepository.findAll().size();

        // Update the personnel
        Personnel updatedPersonnel = personnelRepository.findById(personnel.getId()).get();
        // Disconnect from session so that the updates on updatedPersonnel are not directly saved in db
        em.detach(updatedPersonnel);
        updatedPersonnel
            .matricule(UPDATED_MATRICULE)
            .nom(UPDATED_NOM)
            .poste(UPDATED_POSTE)
            .dateNaiss(UPDATED_DATE_NAISS)
            .sexe(UPDATED_SEXE);

        restPersonnelMockMvc.perform(put("/api/personnels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPersonnel)))
            .andExpect(status().isOk());

        // Validate the Personnel in the database
        List<Personnel> personnelList = personnelRepository.findAll();
        assertThat(personnelList).hasSize(databaseSizeBeforeUpdate);
        Personnel testPersonnel = personnelList.get(personnelList.size() - 1);
        assertThat(testPersonnel.getMatricule()).isEqualTo(UPDATED_MATRICULE);
        assertThat(testPersonnel.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testPersonnel.getPoste()).isEqualTo(UPDATED_POSTE);
        assertThat(testPersonnel.getDateNaiss()).isEqualTo(UPDATED_DATE_NAISS);
        assertThat(testPersonnel.getSexe()).isEqualTo(UPDATED_SEXE);
    }

    @Test
    @Transactional
    public void updateNonExistingPersonnel() throws Exception {
        int databaseSizeBeforeUpdate = personnelRepository.findAll().size();

        // Create the Personnel

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPersonnelMockMvc.perform(put("/api/personnels")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(personnel)))
            .andExpect(status().isBadRequest());

        // Validate the Personnel in the database
        List<Personnel> personnelList = personnelRepository.findAll();
        assertThat(personnelList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePersonnel() throws Exception {
        // Initialize the database
        personnelRepository.saveAndFlush(personnel);

        int databaseSizeBeforeDelete = personnelRepository.findAll().size();

        // Delete the personnel
        restPersonnelMockMvc.perform(delete("/api/personnels/{id}", personnel.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Personnel> personnelList = personnelRepository.findAll();
        assertThat(personnelList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Personnel.class);
        Personnel personnel1 = new Personnel();
        personnel1.setId(1L);
        Personnel personnel2 = new Personnel();
        personnel2.setId(personnel1.getId());
        assertThat(personnel1).isEqualTo(personnel2);
        personnel2.setId(2L);
        assertThat(personnel1).isNotEqualTo(personnel2);
        personnel1.setId(null);
        assertThat(personnel1).isNotEqualTo(personnel2);
    }
}
