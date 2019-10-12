package com.cfc.evalmanager.repository;
import com.cfc.evalmanager.domain.SessionEvaluation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the SessionEvaluation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SessionEvaluationRepository extends JpaRepository<SessionEvaluation, Long> {

}
