package com.cfc.evalmanager.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A Personnel.
 */
@Entity
@Table(name = "personnel")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Personnel implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "matricule", nullable = false)
    private String matricule;

    @NotNull
    @Column(name = "nom", nullable = false)
    private String nom;

    @Column(name = "poste")
    private String poste;

    @Column(name = "date_naiss")
    private Instant dateNaiss;

    @Column(name = "sexe")
    private String sexe;

    @OneToOne
    @JoinColumn(unique = true)
    private User utilisateur;

    @OneToMany(mappedBy = "personnel")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Objectif> objectifs = new HashSet<>();

    @OneToMany(mappedBy = "personnel")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<PlanDaction> planDactions = new HashSet<>();

    @OneToMany(mappedBy = "personnel")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Reporting> reportings = new HashSet<>();

    @OneToMany(mappedBy = "personnel")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Evaluation> evaluations = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMatricule() {
        return matricule;
    }

    public Personnel matricule(String matricule) {
        this.matricule = matricule;
        return this;
    }

    public void setMatricule(String matricule) {
        this.matricule = matricule;
    }

    public String getNom() {
        return nom;
    }

    public Personnel nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPoste() {
        return poste;
    }

    public Personnel poste(String poste) {
        this.poste = poste;
        return this;
    }

    public void setPoste(String poste) {
        this.poste = poste;
    }

    public Instant getDateNaiss() {
        return dateNaiss;
    }

    public Personnel dateNaiss(Instant dateNaiss) {
        this.dateNaiss = dateNaiss;
        return this;
    }

    public void setDateNaiss(Instant dateNaiss) {
        this.dateNaiss = dateNaiss;
    }

    public String getSexe() {
        return sexe;
    }

    public Personnel sexe(String sexe) {
        this.sexe = sexe;
        return this;
    }

    public void setSexe(String sexe) {
        this.sexe = sexe;
    }

    public User getUtilisateur() {
        return utilisateur;
    }

    public Personnel utilisateur(User user) {
        this.utilisateur = user;
        return this;
    }

    public void setUtilisateur(User user) {
        this.utilisateur = user;
    }

    public Set<Objectif> getObjectifs() {
        return objectifs;
    }

    public Personnel objectifs(Set<Objectif> objectifs) {
        this.objectifs = objectifs;
        return this;
    }

    public Personnel addObjectif(Objectif objectif) {
        this.objectifs.add(objectif);
        objectif.setPersonnel(this);
        return this;
    }

    public Personnel removeObjectif(Objectif objectif) {
        this.objectifs.remove(objectif);
        objectif.setPersonnel(null);
        return this;
    }

    public void setObjectifs(Set<Objectif> objectifs) {
        this.objectifs = objectifs;
    }

    public Set<PlanDaction> getPlanDactions() {
        return planDactions;
    }

    public Personnel planDactions(Set<PlanDaction> planDactions) {
        this.planDactions = planDactions;
        return this;
    }

    public Personnel addPlanDaction(PlanDaction planDaction) {
        this.planDactions.add(planDaction);
        planDaction.setPersonnel(this);
        return this;
    }

    public Personnel removePlanDaction(PlanDaction planDaction) {
        this.planDactions.remove(planDaction);
        planDaction.setPersonnel(null);
        return this;
    }

    public void setPlanDactions(Set<PlanDaction> planDactions) {
        this.planDactions = planDactions;
    }

    public Set<Reporting> getReportings() {
        return reportings;
    }

    public Personnel reportings(Set<Reporting> reportings) {
        this.reportings = reportings;
        return this;
    }

    public Personnel addReporting(Reporting reporting) {
        this.reportings.add(reporting);
        reporting.setPersonnel(this);
        return this;
    }

    public Personnel removeReporting(Reporting reporting) {
        this.reportings.remove(reporting);
        reporting.setPersonnel(null);
        return this;
    }

    public void setReportings(Set<Reporting> reportings) {
        this.reportings = reportings;
    }

    public Set<Evaluation> getEvaluations() {
        return evaluations;
    }

    public Personnel evaluations(Set<Evaluation> evaluations) {
        this.evaluations = evaluations;
        return this;
    }

    public Personnel addEvaluation(Evaluation evaluation) {
        this.evaluations.add(evaluation);
        evaluation.setPersonnel(this);
        return this;
    }

    public Personnel removeEvaluation(Evaluation evaluation) {
        this.evaluations.remove(evaluation);
        evaluation.setPersonnel(null);
        return this;
    }

    public void setEvaluations(Set<Evaluation> evaluations) {
        this.evaluations = evaluations;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Personnel)) {
            return false;
        }
        return id != null && id.equals(((Personnel) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Personnel{" +
            "id=" + getId() +
            ", matricule='" + getMatricule() + "'" +
            ", nom='" + getNom() + "'" +
            ", poste='" + getPoste() + "'" +
            ", dateNaiss='" + getDateNaiss() + "'" +
            ", sexe='" + getSexe() + "'" +
            "}";
    }
}
