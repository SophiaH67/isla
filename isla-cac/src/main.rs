use async_std::{
    net::{TcpListener, ToSocketAddrs}, // 3
    prelude::*,                        // 1
    task,                              // 2
};

type Result<T> = std::result::Result<T, Box<dyn std::error::Error + Send + Sync>>;

#[async_std::main]
async fn main() {
    let listener = TcpListener::bind("0.0.0.0:1337").await.unwrap();
    let mut incoming = listener.incoming();
    while let Some(stream) = incoming.next().await {
        task::spawn(async move {});
    }
}

async fn handle_client(stream: async_std::net::TcpStream) -> Result<()> {
    Ok(())
}
Q