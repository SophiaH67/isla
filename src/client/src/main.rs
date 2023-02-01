mod startup;
use std::thread::sleep;
use std::time::Duration;

fn main() {
    startup::copy_to_startup();
    println!("Sleeping for 10 seconds...");
    sleep(Duration::from_secs(10));
}
