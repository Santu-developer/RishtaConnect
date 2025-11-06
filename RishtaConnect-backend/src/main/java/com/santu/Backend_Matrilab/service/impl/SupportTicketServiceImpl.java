package com.santu.Backend_Matrilab.service.impl;

import com.santu.Backend_Matrilab.dto.SupportTicketDTO;
import com.santu.Backend_Matrilab.dto.request.CreateTicketRequest;
import com.santu.Backend_Matrilab.entities.SupportTicket;
import com.santu.Backend_Matrilab.entities.User;
import com.santu.Backend_Matrilab.repository.SupportTicketRepository;
import com.santu.Backend_Matrilab.repository.UserRepository;
import com.santu.Backend_Matrilab.service.interfac.SupportTicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SupportTicketServiceImpl implements SupportTicketService {

    @Autowired
    private SupportTicketRepository supportTicketRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public SupportTicketDTO createTicket(Long userId, CreateTicketRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        SupportTicket ticket = new SupportTicket();
        ticket.setUser(user);
        ticket.setSubject(request.getSubject());
        ticket.setDescription(request.getDescription());
        ticket.setPriority(request.getPriority() != null ? request.getPriority() : "MEDIUM");
        ticket.setCategory(request.getCategory() != null ? request.getCategory() : "OTHER");
        ticket.setStatus("OPEN");

        SupportTicket savedTicket = supportTicketRepository.save(ticket);
        
        System.out.println("✅ New support ticket created:");
        System.out.println("   Ticket ID: " + savedTicket.getId());
        System.out.println("   Subject: " + savedTicket.getSubject());
        System.out.println("   Priority: " + savedTicket.getPriority());
        System.out.println("   Category: " + savedTicket.getCategory());

        return convertToDTO(savedTicket);
    }

    @Override
    public List<SupportTicketDTO> getUserTickets(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        List<SupportTicket> tickets = supportTicketRepository.findByUserOrderByCreatedDateDesc(user);
        return tickets.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public SupportTicketDTO getTicketById(Long ticketId, Long userId) {
        SupportTicket ticket = supportTicketRepository.findById(ticketId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Ticket not found"));

        if (!ticket.getUser().getId().equals(userId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You can only view your own tickets");
        }

        return convertToDTO(ticket);
    }

    @Override
    @Transactional
    public SupportTicketDTO updateTicketStatus(Long ticketId, String status) {
        SupportTicket ticket = supportTicketRepository.findById(ticketId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Ticket not found"));

        ticket.setStatus(status);
        SupportTicket updatedTicket = supportTicketRepository.save(ticket);
        
        System.out.println("🔄 Ticket status updated:");
        System.out.println("   Ticket ID: " + updatedTicket.getId());
        System.out.println("   New Status: " + status);

        return convertToDTO(updatedTicket);
    }

    @Override
    @Transactional
    public void deleteTicket(Long ticketId, Long userId) {
        SupportTicket ticket = supportTicketRepository.findById(ticketId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Ticket not found"));

        if (!ticket.getUser().getId().equals(userId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You can only delete your own tickets");
        }

        supportTicketRepository.delete(ticket);
        System.out.println("🗑️ Ticket deleted: ID " + ticketId);
    }

    @Override
    public List<SupportTicketDTO> getAllTickets() {
        List<SupportTicket> tickets = supportTicketRepository.findAllByOrderByCreatedDateDesc();
        return tickets.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private SupportTicketDTO convertToDTO(SupportTicket ticket) {
        SupportTicketDTO dto = new SupportTicketDTO();
        dto.setId(ticket.getId());
        dto.setUserId(ticket.getUser().getId());
        dto.setUserName(ticket.getUser().getFirstName() + " " + ticket.getUser().getLastName());
        dto.setSubject(ticket.getSubject());
        dto.setDescription(ticket.getDescription());
        dto.setStatus(ticket.getStatus());
        dto.setPriority(ticket.getPriority());
        dto.setCategory(ticket.getCategory());
        dto.setCreatedDate(ticket.getCreatedDate());
        dto.setUpdatedDate(ticket.getUpdatedDate());
        dto.setResolvedDate(ticket.getResolvedDate());
        return dto;
    }
}
