
// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use std::process::Command;
use std::sync::Mutex;

lazy_static::lazy_static! {
    static ref PY_PROCESS: Mutex<Option<std::process::Child>> = Mutex::new(None);
    static ref MAKE_PROCESS: Mutex<Option<std::process::Child>> = Mutex::new(None);
}

// #[tauri::command]
// fn greet(name: &str) -> String {
// format!("Hello, {}! You've been greeted from Rust!", name)
// }

#[tauri::command]
fn connect_camera(connect: bool) -> String {
    let message = if connect {
        "[LOG] Camera is now connected.".to_string()
    } else {
        "[LOG] Camera is now disconnected.".to_string()
    };
    println!("{}", message);
    message
}

#[tauri::command]
fn connect_can(connect: bool) -> String {
    let message = if connect {
        "[LOG] CAN is now connected.".to_string()
    } else {
        "[LOG] CAN is now disconnected.".to_string()
    };
    println!("{}", message);
    message
}

#[tauri::command]
fn connect_led(connect: bool) -> String {
    let message = if connect {
        "[LOG] LED is now turned on.".to_string()
    } else {
        "[LOG] LED is now turned off.".to_string()
    };
    println!("{}", message);
    message
}

#[tauri::command]
fn sample_image() -> String {
    let message = format!("[LOG] Runned.");
    println!("{}", message);
    message
}

#[tauri::command]
fn run_solver(mode: &str, ctrltype: &str, speed: u8) -> String {
    let message = format!("[LOG] Runned.");
    println!("{}", message);
    println!("mode:{}, type:{}, speed:{}", mode, ctrltype, speed);
    message
}

#[tauri::command]
fn stop_solver() -> String {
    let message = format!("[LOG] Stopped.");
    println!("{}", message);
    message
}

#[tauri::command]
fn start_python_process() -> Result<String, String> {
    let child = Command::new("python3")
        .arg("../../Self-Solving-Rubik-Cube-firmware/Webcam/post_capture.py")
        .spawn()
        .expect("Failed to start post_capture.py");
        // .map_err(|e| format!("Failed to start python: {}", e))?;

    *PY_PROCESS.lock().unwrap() = Some(child);
    Ok("[LOG] Python process started.".to_string())
}

#[tauri::command]
fn start_make_process() -> Result<String, String> {
    let child = Command::new("make")
        .arg("-C")
        .arg("../../CANViewer")
        .arg("run")
        .spawn()
        .expect("Failed to start CANViewer");
        // .map_err(|e| format!("Failed to start make: {}", e))?;

    *MAKE_PROCESS.lock().unwrap() = Some(child);
    Ok("[LOG] Make process started.".to_string())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    if let Err(e) = start_python_process() {
        eprintln!("Failed to start python process: {}", e);
    }
    if let Err(e) = start_make_process() {
        eprintln!("Failed to start make process: {}", e);
    }

    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            connect_camera,
            connect_can,
            connect_led,
            sample_image,
            run_solver,
            stop_solver
        ])
        .on_window_event(|_window, event| {
            if let tauri::WindowEvent::CloseRequested { api, .. } = event {
                if let Some(mut child) = PY_PROCESS.lock().unwrap().take() {
                    let _ = child.kill();
                }
                if let Some(mut child) = MAKE_PROCESS.lock().unwrap().take() {
                    let _ = child.kill();
                }
            }
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
