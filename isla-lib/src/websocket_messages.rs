pub struct IslaMessage {
    pub id: u64, // Randomly generated ID for this message
    pub message_type: IslaMessageType,
    pub data: IslaMessageData,
}

pub struct IslaMessageData {
    pub data_type: IslaMessageDataType,
    pub data: Vec<u8>,
}

pub enum IslaMessageDataType {
    // The data is a string
    String,
    // The data is a binary blob
    Binary,
}

pub enum IslaMessageType {
    // The message is a request from the client to the server
    Request,
    // The message is a response from the server to the client
    Response,
    // The message is a notification from the server to the client
    Notification,
}
