use serde::{Deserialize, Serialize};
use std::path::PathBuf;

/// Resolves paths to magic-context config files.
pub fn resolve_user_config_path() -> PathBuf {
    let config_dir = std::env::var("XDG_CONFIG_HOME")
        .map(PathBuf::from)
        .unwrap_or_else(|_| {
            dirs::home_dir()
                .unwrap_or_default()
                .join(".config")
        });
    config_dir
        .join("opencode")
        .join("magic-context.jsonc")
}

pub fn resolve_project_config_path(project_path: &str) -> PathBuf {
    PathBuf::from(project_path).join("magic-context.jsonc")
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct ConfigFile {
    pub path: String,
    pub exists: bool,
    pub content: String,
    pub source: String, // "user" or "project"
}

pub fn read_config(path: &PathBuf, source: &str) -> ConfigFile {
    let exists = path.exists();
    let content = if exists {
        std::fs::read_to_string(path).unwrap_or_default()
    } else {
        String::new()
    };

    ConfigFile {
        path: path.to_string_lossy().to_string(),
        exists,
        content,
        source: source.to_string(),
    }
}

pub fn write_config(path: &PathBuf, content: &str) -> Result<(), String> {
    if let Some(parent) = path.parent() {
        std::fs::create_dir_all(parent)
            .map_err(|e| format!("Failed to create directory: {}", e))?;
    }
    std::fs::write(path, content)
        .map_err(|e| format!("Failed to write config: {}", e))?;
    Ok(())
}
