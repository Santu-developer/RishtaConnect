package com.santu.Backend_Matrilab.controller;

import com.santu.Backend_Matrilab.dto.SupportTicketDTO;
import com.santu.Backend_Matrilab.dto.request.CreateTicketRequest;
import com.santu.Backend_Matrilab.service.interfac.SupportTicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/support-tickets")
@CrossOrigin(origins = "http://localhost:3000")
public class SupportTicketController {

    @Autowired
    private SupportTicketService supportTicketService;

    @PostMapping("/create/{userId}")
    public ResponseEntity<SupportTicketDTO> createTicket(
            @PathVariable Long userId,
            @RequestBody CreateTicketRequest request) {
        SupportTicketDTO ticket = supportTicketService.createTicket(userId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ticket);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<SupportTicketDTO>> getUserTickets(@PathVariable Long userId) {
        List<SupportTicketDTO> tickets = supportTicketService.getUserTickets(userId);
        return ResponseEntity.ok(tickets);
    }

    @GetMapping("/{ticketId}/user/{userId}")
    public ResponseEntity<SupportTicketDTO> getTicketById(
            @PathVariable Long ticketId,
            @PathVariable Long userId) {
        SupportTicketDTO ticket = supportTicketService.getTicketById(ticketId, userId);
        return ResponseEntity.ok(ticket);
    }

    @PutMapping("/{ticketId}/status")
    public ResponseEntity<SupportTicketDTO> updateTicketStatus(
            @PathVariable Long ticketId,
            @RequestBody Map<String, String> request) {
        String status = request.get("status");
        SupportTicketDTO ticket = supportTicketService.updateTicketStatus(ticketId, status);
        return ResponseEntity.ok(ticket);
    }

    @DeleteMapping("/{ticketId}/user/{userId}")
    public ResponseEntity<Void> deleteTicket(
            @PathVariable Long ticketId,
            @PathVariable Long userId) {
        supportTicketService.deleteTicket(ticketId, userId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/all")
    public ResponseEntity<List<SupportTicketDTO>> getAllTickets() {
        List<SupportTicketDTO> tickets = supportTicketService.getAllTickets();
        return ResponseEntity.ok(tickets);
    }
}
