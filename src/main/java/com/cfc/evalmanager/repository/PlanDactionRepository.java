package com.cfc.evalmanager.repository;
import com.cfc.evalmanager.domain.PlanDaction;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PlanDaction entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PlanDactionRepository extends JpaRepository<PlanDaction, Long> {

}
