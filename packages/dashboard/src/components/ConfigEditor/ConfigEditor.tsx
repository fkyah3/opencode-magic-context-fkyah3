import { createSignal, createResource, Show } from "solid-js";
import { getConfig, saveConfig } from "../../lib/api";

export default function ConfigEditor() {
  const [source, setSource] = createSignal<"user" | "project">("user");
  const [config, { refetch }] = createResource(source, (s) => getConfig(s));
  const [editContent, setEditContent] = createSignal<string | null>(null);
  const [saveStatus, setSaveStatus] = createSignal<string | null>(null);

  const currentContent = () => editContent() ?? config()?.content ?? "";

  const handleEdit = () => {
    setEditContent(config()?.content ?? "");
  };

  const handleSave = async () => {
    const content = editContent();
    if (content === null) return;
    try {
      await saveConfig(source(), content);
      setSaveStatus("✓ Saved");
      setEditContent(null);
      refetch();
      setTimeout(() => setSaveStatus(null), 2000);
    } catch (err) {
      setSaveStatus(`✕ Error: ${err}`);
      setTimeout(() => setSaveStatus(null), 4000);
    }
  };

  const handleReset = () => {
    setEditContent(null);
  };

  return (
    <>
      <div class="section-header">
        <h1 class="section-title">Configuration</h1>
        <div class="section-actions">
          <Show when={saveStatus()}>
            <span style={{ "font-size": "12px", color: saveStatus()!.startsWith("✓") ? "var(--green)" : "var(--red)" }}>
              {saveStatus()}
            </span>
          </Show>
        </div>
      </div>

      <div class="tab-pills">
        <button
          class={`tab-pill ${source() === "user" ? "active" : ""}`}
          onClick={() => { setSource("user"); setEditContent(null); }}
        >
          User Config
        </button>
        <button
          class={`tab-pill ${source() === "project" ? "active" : ""}`}
          onClick={() => { setSource("project"); setEditContent(null); }}
        >
          Project Config
        </button>
      </div>

      <div class="scroll-area">
        <Show
          when={!config.loading}
          fallback={<div class="empty-state">Loading config...</div>}
        >
          {/* File info */}
          <div style={{ "margin-bottom": "12px" }}>
            <table class="kv-table">
              <tbody>
                <tr>
                  <td>Path</td>
                  <td style={{ "word-break": "break-all" }}>{config()?.path ?? "—"}</td>
                </tr>
                <tr>
                  <td>Exists</td>
                  <td>{config()?.exists ? "✓ Yes" : "✕ No"}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Show
            when={config()?.exists}
            fallback={
              <div class="empty-state">
                <span class="empty-state-icon">⚙️</span>
                <span>Config file not found at {config()?.path}</span>
                <button class="btn primary sm" onClick={handleEdit}>
                  Create config file
                </button>
              </div>
            }
          >
            <Show
              when={editContent() !== null}
              fallback={
                <div>
                  <pre
                    style={{
                      background: "var(--bg-base)",
                      border: "1px solid var(--border)",
                      "border-radius": "var(--radius-md)",
                      padding: "12px",
                      "font-family": "var(--mono-font)",
                      "font-size": "12px",
                      "line-height": "1.6",
                      "white-space": "pre-wrap",
                      "word-break": "break-word",
                      "overflow-y": "auto",
                      "max-height": "calc(100vh - 260px)",
                    }}
                  >
                    {config()?.content}
                  </pre>
                  <div style={{ "margin-top": "12px" }}>
                    <button class="btn sm" onClick={handleEdit}>Edit</button>
                  </div>
                </div>
              }
            >
              <textarea
                class="code-editor"
                style={{ "min-height": "calc(100vh - 300px)" }}
                value={currentContent()}
                onInput={(e) => setEditContent(e.currentTarget.value)}
              />
              <div style={{ display: "flex", gap: "8px", "margin-top": "12px" }}>
                <button class="btn primary sm" onClick={handleSave}>Save</button>
                <button class="btn sm" onClick={handleReset}>Cancel</button>
              </div>
            </Show>
          </Show>
        </Show>
      </div>
    </>
  );
}
