# GitHub 倉庫無限滾動

一個使用 Nuxt 3 + TypeScript 實現的 GitHub 倉庫無限滾動展示應用。

## 📋 專案概述

本專案展示了如何使用現代前端技術實現無限滾動功能，獲取並展示 Microsoft GitHub 組織的倉庫資訊。

### ✨ 主要功能

- **無限滾動**: 當用戶滾動到頁面底部時自動載入更多內容
- **真實數據**: 直接調用 GitHub REST API 獲取 Microsoft 組織的倉庫
- **響應式設計**: 支援桌面和移動裝置
- **錯誤處理**: 完善的錯誤處理和重試機制
- **載入狀態**: 載入動畫和狀態提示
- **程式碼品質**: 使用 ESLint 確保程式碼一致性

### 🚀 技術棧

- **框架**: [Nuxt 3](https://nuxt.com/) - Vue 3 全端框架
- **語言**: TypeScript - 型別安全的 JavaScript
- **樣式**: Scoped CSS - 組件範圍樣式
- **API**: GitHub REST API - 真實的倉庫數據
- **程式碼規範**: ESLint + @nuxt/eslint-config

## 🛠️ 安裝與使用

### 環境要求

- Node.js >= 18
- npm >= 9

### 安裝步驟

1. **複製專案**

   ```bash
   git clone <repository-url>
   cd scroll-test
   ```

2. **安裝依賴**

   ```bash
   npm install
   ```

3. **啟動開發伺服器**

   ```bash
   npm run dev
   ```

4. **開啟瀏覽器**

   訪問 [http://localhost:3001](http://localhost:3001)

### 可用指令

```bash
# 開發模式
npm run dev

# 建構生產版本
npm run build

# 預覽生產版本
npm run preview

# 程式碼檢查
npm run lint

# 自動修復程式碼格式
npm run lint:fix
```

## 📁 專案結構

```
scroll-test/
├── composables/
│   └── useInfiniteScroll.ts    # 無限滾動組合式函數
├── pages/
│   └── index.vue               # 主頁面
├── server/api/
│   └── posts.get.ts            # GitHub API 端點
├── eslint.config.js            # ESLint 設定
├── nuxt.config.ts              # Nuxt 設定
└── package.json                # 專案設定
```
