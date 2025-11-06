package com.santu.Backend_Matrilab.repository;

import com.santu.Backend_Matrilab.entities.SupportTicket;
import com.santu.Backend_Matrilab.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SupportTicketRepository extends JpaRepository<SupportTicket, Long> {

    List<SupportTicket> findByUserId(Long userId);

    List<SupportTicket> findByUserOrderByCreatedDateDesc(User user);

    List<SupportTicket> findByUserIdAndStatus(Long userId, String status);

    List<SupportTicket> findByStatus(String status);

    List<SupportTicket> findByPriority(String priority);

    List<SupportTicket> findAllByOrderByCreatedDateDesc();

    long countByUserIdAndStatus(Long userId, String status);

    long countByStatus(String status);
}

