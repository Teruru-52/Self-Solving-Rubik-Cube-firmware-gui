# Tauri + React

This template should help get you started developing with Tauri and React in Vite.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

## Getting Started

For Desktop development, run:

```bash
npm run tauri dev
```

For Android development, run:

```bash
npm run tauri android dev
```

## Building Error

```bash
lsof -i :1420
```

Then,

```bash
kill -9 <PID>
```

## Format

```bash
npx prettier . --write
```
