package com.santu.Backend_Matrilab.repository;


import com.santu.Backend_Matrilab.entities.PurchaseHistory;
import com.santu.Backend_Matrilab.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PurchaseHistoryRepository extends JpaRepository<PurchaseHistory, Long> {
    List<PurchaseHistory> findByUser(User user);
    List<PurchaseHistory> findByUser_Id(Long userId);
    boolean existsByUser_IdAndStatus(Long userId, String status);
}