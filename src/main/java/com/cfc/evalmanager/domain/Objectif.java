package com.cfc.evalmanager.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A Objectif.
 */
@Entity
@Table(name = "objectif")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Objectif implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "libelle", nullable = false)
    private String libelle;

    
    @Lob
    @Column(name = "livrable", nullable = false)
    private String livrable;

    
    @Lob
    @Column(name = "indicateur", nullable = false)
    private String indicateur;

    @NotNull
    @Column(name = "date_fin", nullable = false)
    private Instant dateFin;

    @OneToMany(mappedBy = "objectif")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<PlanDaction> planDactions = new HashSet<>();

    @OneToMany(mappedBy = "objectif")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Reporting> reportings = new HashSet<>();

    @OneToMany(mappedBy = "objectif")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Evaluation> evaluations = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("objectifs")
    private Personnel personnel;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLibelle() {
        return libelle;
    }

    public Objectif libelle(String libelle) {
        this.libelle = libelle;
        return this;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

    public String getLivrable() {
        return livrable;
    }

    public Objectif livrable(String livrable) {
        this.livrable = livrable;
        return this;
    }

    public void setLivrable(String livrable) {
        this.livrable = livrable;
    }

    public String getIndicateur() {
        return indicateur;
    }

    public Objectif indicateur(String indicateur) {
        this.indicateur = indicateur;
        return this;
    }

    public void setIndicateur(String indicateur) {
        this.indicateur = indicateur;
    }

    public Instant getDateFin() {
        return dateFin;
    }

    public Objectif dateFin(Instant dateFin) {
        this.dateFin = dateFin;
        return this;
    }

    public void setDateFin(Instant dateFin) {
        this.dateFin = dateFin;
    }

    public Set<PlanDaction> getPlanDactions() {
        return planDactions;
    }

    public Objectif planDactions(Set<PlanDaction> planDactions) {
        this.planDactions = planDactions;
        return this;
    }

    public Objectif addPlanDaction(PlanDaction planDaction) {
        this.planDactions.add(planDaction);
        planDaction.setObjectif(this);
        return this;
    }

    public Objectif removePlanDaction(PlanDaction planDaction) {
        this.planDactions.remove(planDaction);
        planDaction.setObjectif(null);
        return this;
    }

    public void setPlanDactions(Set<PlanDaction> planDactions) {
        this.planDactions = planDactions;
    }

    public Set<Reporting> getReportings() {
        return reportings;
    }

    public Objectif reportings(Set<Reporting> reportings) {
        this.reportings = reportings;
        return this;
    }

    public Objectif addReporting(Reporting reporting) {
        this.reportings.add(reporting);
        reporting.setObjectif(this);
        return this;
    }

    public Objectif removeReporting(Reporting reporting) {
        this.reportings.remove(reporting);
        reporting.setObjectif(null);
        return this;
    }

    public void setReportings(Set<Reporting> reportings) {
        this.reportings = reportings;
    }

    public Set<Evaluation> getEvaluations() {
        return evaluations;
    }

    public Objectif evaluations(Set<Evaluation> evaluations) {
        this.evaluations = evaluations;
        return this;
    }

    public Objectif addEvaluation(Evaluation evaluation) {
        this.evaluations.add(evaluation);
        evaluation.setObjectif(this);
        return this;
    }

    public Objectif removeEvaluation(Evaluation evaluation) {
        this.evaluations.remove(evaluation);
        evaluation.setObjectif(null);
        return this;
    }

    public void setEvaluations(Set<Evaluation> evaluations) {
        this.evaluations = evaluations;
    }

    public Personnel getPersonnel() {
        return personnel;
    }

    public Objectif personnel(Personnel personnel) {
        this.personnel = personnel;
        return this;
    }

    public void setPersonnel(Personnel personnel) {
        this.personnel = personnel;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Objectif)) {
            return false;
        }
        return id != null && id.equals(((Objectif) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Objectif{" +
            "id=" + getId() +
            ", libelle='" + getLibelle() + "'" +
            ", livrable='" + getLivrable() + "'" +
            ", indicateur='" + getIndicateur() + "'" +
            ", dateFin='" + getDateFin() + "'" +
            "}";
    }
}
