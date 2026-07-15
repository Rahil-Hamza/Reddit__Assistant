# 🤖 AI Reddit Assistant

> A Chrome extension that integrates Google Gemini directly into Reddit, enabling AI-powered post discovery and comment analysis using natural language prompts instead of traditional keyword searches.

Built with **React**, **TypeScript**, **WXT**, **Tailwind CSS**, and **Chrome Extension Manifest V3**.

---

## Overview

Reddit contains millions of valuable discussions, but finding useful information often requires manually searching posts and reading long comment threads.

AI Reddit Assistant enhances the browsing experience by injecting an AI interface directly into Reddit. Instead of relying on keyword searches, users can ask natural language questions such as:

- *Show posts discussing React performance optimization.*
- *Summarize the consensus in this comment thread.*
- *Find recommendations for beginner machine learning resources.*

The extension scrapes relevant Reddit content from the current page, structures it into JSON, sends it to Google Gemini, and displays the AI response inside an isolated React interface rendered using the Shadow DOM.

---

## Features

### 🔍 AI Post Search

- Natural language search over loaded Reddit posts
- Semantic filtering instead of keyword matching
- Supports complex contextual queries
- Displays matching posts with direct navigation links

---

### 💬 AI Comment Analysis

- Summarizes long discussion threads
- Extracts important recommendations
- Finds opinions, solutions, and recurring themes
- Presents responses as formatted Markdown

---

### 🎨 Native Reddit Integration

- Injects React UI directly into Reddit pages
- Uses Shadow DOM to isolate styles from Reddit
- Context menu integration using Chrome Extension APIs
- Floating modal interface with responsive design

---

### 🔒 Local-First Design

- API key stored using `chrome.storage.local`
- No backend server
- No user tracking
- Credentials never leave the browser except API requests to Gemini

---

# Tech Stack

| Technology | Purpose |
|------------|---------|
| React | UI Components |
| TypeScript | Type-safe development |
| WXT | Browser extension framework |
| Tailwind CSS v4 | Styling |
| Google Gemini API | LLM inference |
| Chrome Extension Manifest V3 | Browser extension platform |
| Chrome Storage API | Local persistence |
| Vitest | Unit testing |

---

# Architecture

```
                 Reddit Page
                      │
                      ▼
          DOM Scraping (Content Script)
                      │
                      ▼
             Structured JSON Data
                      │
        User Prompt + Scraped Context
                      │
                      ▼
             Google Gemini API
                      │
          Markdown / JSON Response
                      │
                      ▼
      React UI (Rendered inside Shadow DOM)
                      │
                      ▼
               User Interaction
```

---

# How It Works

1. User opens Reddit.
2. The extension injects a React application into the page.
3. Reddit posts or comments are scraped from the live DOM.
4. Extracted content is transformed into structured JSON.
5. User enters a natural language prompt.
6. Prompt and Reddit data are sent to Gemini.
7. AI response is rendered inside the extension UI.

---

# Project Structure

```text
entrypoints/
│
├── background/
│   └── index.ts              # Background service worker
│
├── content/
│   ├── index.tsx             # Content script
│   ├── post/                 # Post insights UI
│   ├── comment/              # Comment insights UI
│   └── common/               # Shared components
│
├── popup/
│   ├── App.tsx
│   └── components/
│
hooks/
│
scripts/
│   ├── scrap.ts
│   └── scrap.test.ts
│
assets/
│
wxt.config.ts
package.json
```

---

# Data Flow

```
Reddit DOM
      │
      ▼
Content Script
      │
      ▼
DOM Extraction
      │
      ▼
Structured JSON
      │
      ▼
Gemini API
      │
      ▼
AI Response
      │
      ▼
Markdown Rendering
```

---

# Installation

## Prerequisites

- Node.js 18+
- npm
- Google Gemini API Key

---

## Clone Repository

```bash
git clone https://github.com/<your-username>/reddit-assistant.git

cd reddit-assistant
```

---

## Install Dependencies

```bash
npm install
```

---

## Start Development Server

```bash
npm run dev
```

---

## Build Extension

```bash
npm run build
```

---

## Run Tests

```bash
npm test
```

---

# Usage

1. Open Reddit.
2. Right-click anywhere on the page.
3. Select **Reddit Assistant**.
4. Choose:

- **Post Insights**
- **Comment Insights**

5. Enter a prompt.
6. Review AI-generated results directly inside Reddit.

---

# Engineering Highlights

- Chrome Extension Manifest V3
- Shadow DOM based UI isolation
- Typed message passing between background and content scripts
- Dynamic DOM scraping without Reddit APIs
- Local credential management using Chrome Storage API
- Structured JSON extraction from LLM responses
- Markdown rendering with syntax highlighting
- Modular React component architecture
- TypeScript throughout the codebase

---

# Future Improvements

- Support for additional LLM providers
- Streaming AI responses
- Search across multiple subreddit pages
- Conversation history
- Export AI responses as Markdown
- Cached analysis for previously visited threads

---

# Screenshots

> Screenshots and demo GIFs will be added after the initial release.

---

# License

This project is licensed under the MIT License.