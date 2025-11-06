package com.santu.Backend_Matrilab.repository;

import com.santu.Backend_Matrilab.entities.Conversation;
import com.santu.Backend_Matrilab.entities.Message;
import com.santu.Backend_Matrilab.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

    List<Message> findByConversationOrderBySentAtAsc(Conversation conversation);

    @Query("SELECT COUNT(m) FROM Message m WHERE m.receiver = :user AND m.isRead = false")
    Long countUnreadMessagesByUser(@Param("user") User user);

    @Query("SELECT COUNT(m) FROM Message m WHERE m.conversation = :conversation AND m.receiver = :user AND m.isRead = false")
    Long countUnreadMessagesInConversation(@Param("conversation") Conversation conversation, @Param("user") User user);

    @Query("SELECT m FROM Message m WHERE m.conversation = :conversation AND m.receiver = :user AND m.isRead = false")
    List<Message> findUnreadMessagesInConversation(@Param("conversation") Conversation conversation, @Param("user") User user);
}
