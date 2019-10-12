package com.cfc.evalmanager.repository;
import com.cfc.evalmanager.domain.Reporting;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Reporting entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReportingRepository extends JpaRepository<Reporting, Long> {

}
