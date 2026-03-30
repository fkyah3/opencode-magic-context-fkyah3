use tauri::State;
use crate::{db, log_parser, config, AppState};

// ── Memory commands ─────────────────────────────────────────

#[tauri::command]
pub fn get_projects(state: State<'_, AppState>) -> Result<Vec<db::ProjectInfo>, String> {
    let path = state.get_db_path()?;
    let conn = db::open_readonly(&path).map_err(|e| e.to_string())?;
    db::get_projects(&conn).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn get_memories(
    state: State<'_, AppState>,
    project: Option<String>,
    status: Option<String>,
    category: Option<String>,
    search: Option<String>,
    limit: Option<i64>,
    offset: Option<i64>,
) -> Result<Vec<db::Memory>, String> {
    let path = state.get_db_path()?;
    let conn = db::open_readonly(&path).map_err(|e| e.to_string())?;
    db::get_memories(
        &conn,
        project.as_deref(),
        status.as_deref(),
        category.as_deref(),
        search.as_deref(),
        limit.unwrap_or(100),
        offset.unwrap_or(0),
    )
    .map_err(|e| e.to_string())
}

#[tauri::command]
pub fn get_memory_stats(
    state: State<'_, AppState>,
    project: Option<String>,
) -> Result<db::MemoryStats, String> {
    let path = state.get_db_path()?;
    let conn = db::open_readonly(&path).map_err(|e| e.to_string())?;
    db::get_memory_stats(&conn, project.as_deref()).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn update_memory_status(
    state: State<'_, AppState>,
    memory_id: i64,
    status: String,
) -> Result<(), String> {
    let path = state.get_db_path()?;
    let conn = db::open_readwrite(&path).map_err(|e| e.to_string())?;
    db::update_memory_status(&conn, memory_id, &status).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn update_memory_content(
    state: State<'_, AppState>,
    memory_id: i64,
    content: String,
) -> Result<(), String> {
    let path = state.get_db_path()?;
    let conn = db::open_readwrite(&path).map_err(|e| e.to_string())?;
    db::update_memory_content(&conn, memory_id, &content).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn delete_memory(state: State<'_, AppState>, memory_id: i64) -> Result<(), String> {
    let path = state.get_db_path()?;
    let conn = db::open_readwrite(&path).map_err(|e| e.to_string())?;
    db::delete_memory(&conn, memory_id).map_err(|e| e.to_string())
}

// ── Session commands ────────────────────────────────────────

#[tauri::command]
pub fn get_sessions(state: State<'_, AppState>) -> Result<Vec<db::SessionSummary>, String> {
    let path = state.get_db_path()?;
    let conn = db::open_readonly(&path).map_err(|e| e.to_string())?;
    db::get_sessions(&conn).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn get_compartments(
    state: State<'_, AppState>,
    session_id: String,
) -> Result<Vec<db::Compartment>, String> {
    let path = state.get_db_path()?;
    let conn = db::open_readonly(&path).map_err(|e| e.to_string())?;
    db::get_compartments(&conn, &session_id).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn get_session_facts(
    state: State<'_, AppState>,
    session_id: String,
) -> Result<Vec<db::SessionFact>, String> {
    let path = state.get_db_path()?;
    let conn = db::open_readonly(&path).map_err(|e| e.to_string())?;
    db::get_session_facts(&conn, &session_id).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn get_session_notes(
    state: State<'_, AppState>,
    session_id: String,
) -> Result<Vec<db::SessionNote>, String> {
    let path = state.get_db_path()?;
    let conn = db::open_readonly(&path).map_err(|e| e.to_string())?;
    db::get_session_notes(&conn, &session_id).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn get_session_meta(
    state: State<'_, AppState>,
    session_id: String,
) -> Result<Option<db::SessionMetaRow>, String> {
    let path = state.get_db_path()?;
    let conn = db::open_readonly(&path).map_err(|e| e.to_string())?;
    db::get_session_meta(&conn, &session_id).map_err(|e| e.to_string())
}

// ── Dreamer commands ────────────────────────────────────────

#[tauri::command]
pub fn get_dream_queue(state: State<'_, AppState>) -> Result<Vec<db::DreamQueueEntry>, String> {
    let path = state.get_db_path()?;
    let conn = db::open_readonly(&path).map_err(|e| e.to_string())?;
    db::get_dream_queue(&conn).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn get_dream_state(state: State<'_, AppState>) -> Result<Vec<db::DreamStateEntry>, String> {
    let path = state.get_db_path()?;
    let conn = db::open_readonly(&path).map_err(|e| e.to_string())?;
    db::get_dream_state(&conn).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn enqueue_dream(
    state: State<'_, AppState>,
    project_path: String,
    reason: String,
) -> Result<i64, String> {
    let path = state.get_db_path()?;
    let conn = db::open_readwrite(&path).map_err(|e| e.to_string())?;
    db::enqueue_dream(&conn, &project_path, &reason).map_err(|e| e.to_string())
}

// ── Log commands ────────────────────────────────────────────

#[tauri::command]
pub fn get_log_entries(max_lines: Option<usize>) -> Vec<log_parser::LogEntry> {
    let log_path = log_parser::resolve_log_path();
    log_parser::read_log_tail(&log_path, max_lines.unwrap_or(500))
}

#[tauri::command]
pub fn get_cache_events(max_lines: Option<usize>) -> Vec<log_parser::CacheEvent> {
    let log_path = log_parser::resolve_log_path();
    let entries = log_parser::read_log_tail(&log_path, max_lines.unwrap_or(2000));
    log_parser::extract_cache_events(&entries)
}

#[tauri::command]
pub fn get_session_cache_stats(max_lines: Option<usize>, limit: Option<usize>) -> Vec<log_parser::SessionCacheStats> {
    let log_path = log_parser::resolve_log_path();
    let entries = log_parser::read_log_tail(&log_path, max_lines.unwrap_or(5000));
    let events = log_parser::extract_cache_events(&entries);
    log_parser::aggregate_session_cache_stats(&events, limit.unwrap_or(5))
}

// ── Config commands ─────────────────────────────────────────

#[tauri::command]
pub fn get_config(source: String, project_path: Option<String>) -> config::ConfigFile {
    match source.as_str() {
        "project" => {
            let proj = project_path.unwrap_or_else(|| ".".to_string());
            let path = config::resolve_project_config_path(&proj);
            config::read_config(&path, "project")
        }
        _ => {
            let path = config::resolve_user_config_path();
            config::read_config(&path, "user")
        }
    }
}

#[tauri::command]
pub fn save_config(source: String, content: String) -> Result<(), String> {
    let path = match source.as_str() {
        "user" => config::resolve_user_config_path(),
        _ => return Err("Only user config editing is supported in V1".to_string()),
    };
    config::write_config(&path, &content)
}

// ── Health commands ─────────────────────────────────────────

#[tauri::command]
pub fn get_db_health(state: State<'_, AppState>) -> db::DbHealth {
    match state.get_db_path() {
        Ok(path) => db::get_db_health(&path),
        Err(_) => db::DbHealth {
            exists: false,
            path: "Not found".to_string(),
            size_bytes: 0,
            wal_size_bytes: 0,
            table_counts: Vec::new(),
        },
    }
}
