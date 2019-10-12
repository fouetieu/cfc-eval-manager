package com.cfc.evalmanager.repository;
import com.cfc.evalmanager.domain.Objectif;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Objectif entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ObjectifRepository extends JpaRepository<Objectif, Long> {

}
