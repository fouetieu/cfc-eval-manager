package com.cfc.evalmanager.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A PlanDaction.
 */
@Entity
@Table(name = "plan_daction")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PlanDaction implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "tache", nullable = false)
    private String tache;

    @Lob
    @Column(name = "description")
    private String description;

    @Column(name = "date_debut")
    private Instant dateDebut;

    @Column(name = "date_f_in")
    private Instant dateFIn;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("planDactions")
    private Objectif objectif;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("planDactions")
    private Personnel personnel;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTache() {
        return tache;
    }

    public PlanDaction tache(String tache) {
        this.tache = tache;
        return this;
    }

    public void setTache(String tache) {
        this.tache = tache;
    }

    public String getDescription() {
        return description;
    }

    public PlanDaction description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Instant getDateDebut() {
        return dateDebut;
    }

    public PlanDaction dateDebut(Instant dateDebut) {
        this.dateDebut = dateDebut;
        return this;
    }

    public void setDateDebut(Instant dateDebut) {
        this.dateDebut = dateDebut;
    }

    public Instant getDateFIn() {
        return dateFIn;
    }

    public PlanDaction dateFIn(Instant dateFIn) {
        this.dateFIn = dateFIn;
        return this;
    }

    public void setDateFIn(Instant dateFIn) {
        this.dateFIn = dateFIn;
    }

    public Objectif getObjectif() {
        return objectif;
    }

    public PlanDaction objectif(Objectif objectif) {
        this.objectif = objectif;
        return this;
    }

    public void setObjectif(Objectif objectif) {
        this.objectif = objectif;
    }

    public Personnel getPersonnel() {
        return personnel;
    }

    public PlanDaction personnel(Personnel personnel) {
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
        if (!(o instanceof PlanDaction)) {
            return false;
        }
        return id != null && id.equals(((PlanDaction) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "PlanDaction{" +
            "id=" + getId() +
            ", tache='" + getTache() + "'" +
            ", description='" + getDescription() + "'" +
            ", dateDebut='" + getDateDebut() + "'" +
            ", dateFIn='" + getDateFIn() + "'" +
            "}";
    }
}
