// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
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
    let message = format!("[LOG] Image sampling command sent.");
    println!("{}", message);
    message
}

#[tauri::command]
fn run_solver(mode: &str, ctrlType: &str, speed: u8) -> String {
    let message = format!("[LOG] Runned.");
    println!("{}", message);
    println!("mode:{}, type:{}, speed:{}", mode, ctrlType, speed);
    message
}

#[tauri::command]
fn stop_solver() -> String {
    let message = format!("[LOG] Stopped.");
    println!("{}", message);
    message
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
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
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
