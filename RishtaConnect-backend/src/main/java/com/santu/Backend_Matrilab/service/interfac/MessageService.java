package com.santu.Backend_Matrilab.service.interfac;

import com.santu.Backend_Matrilab.dto.request.SendMessageRequest;
import com.santu.Backend_Matrilab.dto.response.ConversationDTO;
import com.santu.Backend_Matrilab.dto.response.MessageDTO;

import java.util.List;

public interface MessageService {
    
    MessageDTO sendMessage(Long senderId, SendMessageRequest request);
    
    List<ConversationDTO> getUserConversations(Long userId);
    
    List<MessageDTO> getConversationMessages(Long userId, Long otherUserId);
    
    void markMessagesAsRead(Long conversationId, Long userId);
    
    Long getUnreadMessageCount(Long userId);
    
    void deleteMessage(Long messageId, Long userId);
}
