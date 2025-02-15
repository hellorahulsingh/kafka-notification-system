# Kafka Notification System

A Kafka-based microservices architecture for handling various types of notifications including Email, SMS, Push, and Browser notifications, with support for logging, retry mechanisms, and dead letter queues.

---

## **Project Structure**

```plaintext
kafka-notification-system/
│
├── docker-compose.yaml      # Docker Compose for Kafka, Zookeeper, and microservices
│
├── services/
│   ├── email-service/       # Microservice for Email notifications
│   ├── sms-service/         # Microservice for SMS/OTP notifications
│   ├── push-service/        # Microservice for Push notifications
│   ├── browser-service/     # Microservice for Browser notifications
│   ├── dlq-service/         # Microservice for Retry & Dead Letter Queue
│   └── logging-service/     # Microservice for Logging and Auditing
│
├── producer-service/        # Main application producing events to Kafka
│
├── schemas/                 # JSON schemas for Kafka events
│
├── configs/
│   ├── kafka/               # Kafka configurations
│   └── supabase/            # Supabase connection configs (if needed)
│
└── shared/                  # Shared utilities, libraries, and common code
```

---

## **Step-by-Step Implementation**

### **STEP 1: Initial Setup**

```plaintext
kafka-notification-system/
│
├── docker-compose.yaml      # Docker Compose with Kafka, Zookeeper, and Producer
│
├── producer-service/        # Placeholder for the first microservice (Event Producer)
│   ├── Dockerfile
│   └── app.js
│
└── shared/                  # Shared libraries and utilities
```

---

### **STEP 2: Email Notification Microservice**

```plaintext
notification-email-service/
│
├── Dockerfile
├── app.js
└── package.json
```

- **`Dockerfile`**: Docker configuration for the email service.
- **`app.js`**: Kafka consumer for handling email notification events.
- **`package.json`**: Node.js dependencies including `kafkajs` and `nodemailer`.

---

### **STEP 3: SMS Notification Microservice**

```plaintext
notification-sms-service/
│
├── Dockerfile
├── app.js
└── package.json
```

- **`Dockerfile`**: Docker configuration for the SMS service.
- **`app.js`**: Kafka consumer for handling SMS notification events.
- **`package.json`**: Node.js dependencies including `kafkajs`.

---

## **Setup Instructions**

### **Prerequisites**

- Docker and Docker Compose installed on your machine.
- Basic knowledge of Kafka, Docker, and Node.js.

---

### **Installation Steps**

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-repo/kafka-notification-system.git
   cd kafka-notification-system
   ```

2. **Create necessary Kafka topics**:
   ```bash
   docker exec -it kafka1 kafka-topics --create --topic notifications.email --partitions 1 --replication-factor 1 --bootstrap-server kafka1:19092
   docker exec -it kafka1 kafka-topics --create --topic notifications.sms --partitions 1 --replication-factor 1 --bootstrap-server kafka1:19092
   ```

3. **Run the Docker Compose setup**:
   ```bash
   docker-compose up --build
   ```

---

## **Services Overview**

### **Producer Service**
- Publishes notification events (email, SMS, push, browser) to Kafka topics.

### **Email Notification Service**
- Listens to the `notifications.email` topic and sends emails using `nodemailer`.

### **SMS Notification Service**
- Listens to the `notifications.sms` topic and sends SMS messages (implementation pending).

---

## **Future Implementations**

- **Push Notification Microservice**:
  - Handles push notifications for mobile and web.
- **Browser Notification Microservice**:
  - Sends real-time browser notifications.
- **DLQ Service**:
  - Implements retry and dead letter queue handling for failed messages.
- **Logging Service**:
  - Centralized logging and auditing for all microservices.
- **Schema Validation**:
  - JSON schema validation for all Kafka events.

---

## **Environment Variables**

| Variable          | Description                                          |
|-------------------|------------------------------------------------------|
| `KAFKA_BROKER`    | Kafka broker address (e.g., `kafka1:19092`)         |
| `EMAIL_USER`      | Gmail or SMTP user for email service                |
| `EMAIL_PASS`      | Gmail or SMTP password for email service            |

---

## **Contributing**

- Fork the repository.
- Create a new branch.
- Implement your feature or fix.
- Submit a pull request.

---

## **License**

This project is licensed under the MIT License.

---

WIP