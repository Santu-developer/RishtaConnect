package com.santu.Backend_Matrilab.controller;

import com.santu.Backend_Matrilab.dto.request.SendMessageRequest;
import com.santu.Backend_Matrilab.dto.response.ConversationDTO;
import com.santu.Backend_Matrilab.dto.response.MessageDTO;
import com.santu.Backend_Matrilab.service.interfac.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "http://localhost:3000")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @PostMapping("/send/{senderId}")
    public ResponseEntity<MessageDTO> sendMessage(
            @PathVariable Long senderId,
            @RequestBody SendMessageRequest request) {
        MessageDTO message = messageService.sendMessage(senderId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(message);
    }

    @GetMapping("/conversations/{userId}")
    public ResponseEntity<List<ConversationDTO>> getUserConversations(@PathVariable Long userId) {
        List<ConversationDTO> conversations = messageService.getUserConversations(userId);
        return ResponseEntity.ok(conversations);
    }

    @GetMapping("/conversation/{userId}/{otherUserId}")
    public ResponseEntity<List<MessageDTO>> getConversationMessages(
            @PathVariable Long userId,
            @PathVariable Long otherUserId) {
        List<MessageDTO> messages = messageService.getConversationMessages(userId, otherUserId);
        return ResponseEntity.ok(messages);
    }

    @PutMapping("/mark-read/{conversationId}/{userId}")
    public ResponseEntity<Void> markMessagesAsRead(
            @PathVariable Long conversationId,
            @PathVariable Long userId) {
        messageService.markMessagesAsRead(conversationId, userId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/unread-count/{userId}")
    public ResponseEntity<Long> getUnreadMessageCount(@PathVariable Long userId) {
        Long count = messageService.getUnreadMessageCount(userId);
        return ResponseEntity.ok(count);
    }

    @DeleteMapping("/{messageId}/{userId}")
    public ResponseEntity<Void> deleteMessage(
            @PathVariable Long messageId,
            @PathVariable Long userId) {
        messageService.deleteMessage(messageId, userId);
        return ResponseEntity.noContent().build();
    }
}
