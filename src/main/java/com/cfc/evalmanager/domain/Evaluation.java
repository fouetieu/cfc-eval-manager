package com.cfc.evalmanager.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A Evaluation.
 */
@Entity
@Table(name = "evaluation")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Evaluation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "date_evaluation", nullable = false)
    private Instant dateEvaluation;

    @NotNull
    @Column(name = "note", nullable = false)
    private Integer note;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("evaluations")
    private Objectif objectif;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("evaluations")
    private SessionEvaluation session;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("evaluations")
    private Personnel personnel;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDateEvaluation() {
        return dateEvaluation;
    }

    public Evaluation dateEvaluation(Instant dateEvaluation) {
        this.dateEvaluation = dateEvaluation;
        return this;
    }

    public void setDateEvaluation(Instant dateEvaluation) {
        this.dateEvaluation = dateEvaluation;
    }

    public Integer getNote() {
        return note;
    }

    public Evaluation note(Integer note) {
        this.note = note;
        return this;
    }

    public void setNote(Integer note) {
        this.note = note;
    }

    public Objectif getObjectif() {
        return objectif;
    }

    public Evaluation objectif(Objectif objectif) {
        this.objectif = objectif;
        return this;
    }

    public void setObjectif(Objectif objectif) {
        this.objectif = objectif;
    }

    public SessionEvaluation getSession() {
        return session;
    }

    public Evaluation session(SessionEvaluation sessionEvaluation) {
        this.session = sessionEvaluation;
        return this;
    }

    public void setSession(SessionEvaluation sessionEvaluation) {
        this.session = sessionEvaluation;
    }

    public Personnel getPersonnel() {
        return personnel;
    }

    public Evaluation personnel(Personnel personnel) {
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
        if (!(o instanceof Evaluation)) {
            return false;
        }
        return id != null && id.equals(((Evaluation) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Evaluation{" +
            "id=" + getId() +
            ", dateEvaluation='" + getDateEvaluation() + "'" +
            ", note=" + getNote() +
            "}";
    }
}
