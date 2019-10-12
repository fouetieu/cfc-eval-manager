package com.cfc.evalmanager.repository;
import com.cfc.evalmanager.domain.Personnel;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Personnel entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PersonnelRepository extends JpaRepository<Personnel, Long> {

}
