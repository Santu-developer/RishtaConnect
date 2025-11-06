-- Create support_tickets table if it doesn't exist

CREATE TABLE IF NOT EXISTS support_tickets (
    id BIGINT NOT NULL AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    subject VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'OPEN',
    priority VARCHAR(20) DEFAULT 'MEDIUM',
    category VARCHAR(50) DEFAULT 'OTHER',
    created_date DATETIME,
    updated_date DATETIME,
    resolved_date DATETIME,
    PRIMARY KEY (id),
    CONSTRAINT fk_support_tickets_user FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    INDEX idx_ticket_user_id (user_id),
    INDEX idx_ticket_status (status),
    INDEX idx_ticket_priority (priority),
    INDEX idx_ticket_created_date (created_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Verify the table was created
DESCRIBE support_tickets;
