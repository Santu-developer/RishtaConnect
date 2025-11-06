package com.santu.Backend_Matrilab.service.impl;

import com.santu.Backend_Matrilab.dto.request.SendMessageRequest;
import com.santu.Backend_Matrilab.dto.response.ConversationDTO;
import com.santu.Backend_Matrilab.dto.response.MessageDTO;
import com.santu.Backend_Matrilab.entities.Conversation;
import com.santu.Backend_Matrilab.entities.Gallery;
import com.santu.Backend_Matrilab.entities.Message;
import com.santu.Backend_Matrilab.entities.User;
import com.santu.Backend_Matrilab.repository.ConversationRepository;
import com.santu.Backend_Matrilab.repository.GalleryRepository;
import com.santu.Backend_Matrilab.repository.MessageRepository;
import com.santu.Backend_Matrilab.repository.UserRepository;
import com.santu.Backend_Matrilab.service.interfac.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MessageServiceImpl implements MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private ConversationRepository conversationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GalleryRepository galleryRepository;

    @Override
    @Transactional
    public MessageDTO sendMessage(Long senderId, SendMessageRequest request) {
        User sender = userRepository.findById(senderId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Sender not found"));

        User receiver = userRepository.findById(request.getReceiverId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Receiver not found"));

        // Find or create conversation
        Conversation conversation = conversationRepository
                .findConversationBetweenUsers(sender, receiver)
                .orElseGet(() -> {
                    Conversation newConversation = new Conversation();
                    newConversation.setUser1(sender);
                    newConversation.setUser2(receiver);
                    return conversationRepository.save(newConversation);
                });

        // Create message
        Message message = new Message();
        message.setConversation(conversation);
        message.setSender(sender);
        message.setReceiver(receiver);
        message.setContent(request.getContent());
        message.setIsRead(false);

        Message savedMessage = messageRepository.save(message);

        // Update conversation timestamp
        conversation.setUpdatedAt(LocalDateTime.now());
        conversationRepository.save(conversation);

        return convertToMessageDTO(savedMessage);
    }

    @Override
    public List<ConversationDTO> getUserConversations(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        List<Conversation> conversations = conversationRepository.findAllByUser(user);

        return conversations.stream()
                .map(conversation -> convertToConversationDTO(conversation, user))
                .collect(Collectors.toList());
    }

    @Override
    public List<MessageDTO> getConversationMessages(Long userId, Long otherUserId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        User otherUser = userRepository.findById(otherUserId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Other user not found"));

        Optional<Conversation> conversationOpt = conversationRepository
                .findConversationBetweenUsers(user, otherUser);

        if (conversationOpt.isEmpty()) {
            return new ArrayList<>();
        }

        Conversation conversation = conversationOpt.get();
        List<Message> messages = messageRepository.findByConversationOrderBySentAtAsc(conversation);

        return messages.stream()
                .map(this::convertToMessageDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void markMessagesAsRead(Long conversationId, Long userId) {
        Conversation conversation = conversationRepository.findById(conversationId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Conversation not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        List<Message> unreadMessages = messageRepository
                .findUnreadMessagesInConversation(conversation, user);

        for (Message message : unreadMessages) {
            message.setIsRead(true);
            message.setReadAt(LocalDateTime.now());
        }

        messageRepository.saveAll(unreadMessages);
    }

    @Override
    public Long getUnreadMessageCount(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        return messageRepository.countUnreadMessagesByUser(user);
    }

    @Override
    @Transactional
    public void deleteMessage(Long messageId, Long userId) {
        Message message = messageRepository.findById(messageId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Message not found"));

        if (!message.getSender().getId().equals(userId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You can only delete your own messages");
        }

        messageRepository.delete(message);
    }

    private MessageDTO convertToMessageDTO(Message message) {
        MessageDTO dto = new MessageDTO();
        dto.setId(message.getId());
        dto.setConversationId(message.getConversation().getId());
        dto.setSenderId(message.getSender().getId());
        dto.setSenderName(message.getSender().getFirstName() + " " + message.getSender().getLastName());
        dto.setReceiverId(message.getReceiver().getId());
        dto.setReceiverName(message.getReceiver().getFirstName() + " " + message.getReceiver().getLastName());
        dto.setContent(message.getContent());
        dto.setIsRead(message.getIsRead());
        dto.setSentAt(message.getSentAt());
        dto.setReadAt(message.getReadAt());
        return dto;
    }

    private ConversationDTO convertToConversationDTO(Conversation conversation, User currentUser) {
        ConversationDTO dto = new ConversationDTO();
        dto.setId(conversation.getId());
        dto.setCreatedAt(conversation.getCreatedAt());
        dto.setUpdatedAt(conversation.getUpdatedAt());

        // Determine the other user
        User otherUser = conversation.getUser1().getId().equals(currentUser.getId())
                ? conversation.getUser2()
                : conversation.getUser1();

        dto.setOtherUserId(otherUser.getId());
        dto.setOtherUserName(otherUser.getFirstName() + " " + otherUser.getLastName());

        // Get profile picture
        Optional<Gallery> profilePicture = galleryRepository
                .findByUserAndIsProfilePicture(otherUser, true)
                .stream()
                .findFirst();

        dto.setOtherUserProfilePicture(profilePicture.map(Gallery::getImageUrl).orElse(null));

        // Get last message
        List<Message> messages = conversation.getMessages();
        if (!messages.isEmpty()) {
            Message lastMessage = messages.get(messages.size() - 1);
            dto.setLastMessage(lastMessage.getContent());
            dto.setLastMessageTime(lastMessage.getSentAt());
        }

        // Count unread messages
        Long unreadCount = messageRepository.countUnreadMessagesInConversation(conversation, currentUser);
        dto.setUnreadCount(unreadCount);

        return dto;
    }
}
