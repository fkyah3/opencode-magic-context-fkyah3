# fkyah3/opencode-magic-context-fkyah3 — 本地化增强的 Magic Context 分支

> 基于 [cortexkit/opencode-magic-context](https://github.com/cortexkit/opencode-magic-context)
> 这些 bug 在社区挂了几个月，没人愿意修 Windows 平台的问题。我们修了。

---

## 本分支做了什么 / What This Fork Does

### 1. TUI 侧边栏修复 / Sidebar Rendering Fix

Magic Context 的 TUI 侧边栏（token 用量、compartment 状态、记忆统计等）在 OpenCode fork 中始终空白。

**根因**：OpenCode fork 的 `TuiOptions` Zod schema 使用 `.strict()`，遇到未声明的 `show_thinking: true` 字段时整个配置解析失败返回 `{}`，`plugin_origins` 为空，外部 TUI 插件永不加载。

**修复**：在 OpenCode fork（opencode-fkyah3）中为 `TuiOptions` 新增 `show_thinking: z.boolean().optional()`。

### 2. 侧边栏中文本地化 / Chinese Localization

- 16 个 UI 标签全量汉化（系统提示 / 压缩区 / 事实 / 记忆 / 对话 / 工具调用 / 工具定义 + 开销 / 历史记录 / 内存 / 状态 / 队列 / 笔记 / 智能笔记 / 梦境 / 上次运行）
- 时间单位本地化（刚刚 / 分钟前 / 小时前 / 天前）
- `LOCALE` 常量 + `t(zh, en)` 辅助函数实现中英文一键切换
- 侧边栏头部显示 OMO 版本号

> 汉化文件位于运行时缓存目录（`~/.cache/opencode/packages/`），非仓库源码层级。如需正式集成请参考修改内容。

---

## 加载路径说明 / How It Loads（给开发者）

```
tui.json "plugin" → PluginLoader → Npm.add() → 安装到 ~/.cache/opencode/packages/@cortexkit/opencode-magic-context@latest/
→ import(entry) 加载 TSX 源文件
```

注意：`Npm.add()` 检测到目录存在即跳过更新，不检测新版本。修改后需清理缓存或手动覆盖。

---

## 目录结构 / Directory Layout

| 路径 | 说明 |
|------|------|
| `fkyah3_dev/README.md` | 本文件 |

---

## 开源许可 / License

MIT（继承上游 cortexkit/opencode-magic-context）
