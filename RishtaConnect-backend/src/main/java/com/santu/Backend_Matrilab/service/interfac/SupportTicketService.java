package com.santu.Backend_Matrilab.service.interfac;

import com.santu.Backend_Matrilab.dto.SupportTicketDTO;
import com.santu.Backend_Matrilab.dto.request.CreateTicketRequest;

import java.util.List;

public interface SupportTicketService {
    
    SupportTicketDTO createTicket(Long userId, CreateTicketRequest request);
    
    List<SupportTicketDTO> getUserTickets(Long userId);
    
    SupportTicketDTO getTicketById(Long ticketId, Long userId);
    
    SupportTicketDTO updateTicketStatus(Long ticketId, String status);
    
    void deleteTicket(Long ticketId, Long userId);
    
    List<SupportTicketDTO> getAllTickets();
}
