# NUXT PROJECT STRUCTURE

Your Nuxt project is organized as follows:

## 📁 Folder Structure

### `/app`
- **app.vue** - Main app entry point, wraps all pages

### `/pages`
- Auto-generates routes based on file structure
- `index.vue` = homepage (/)
- `about.vue` = /about route

### `/components`
- Reusable Vue components
- Auto-imported globally (no need to import)

### `/layouts`
- Page layout templates
- `default.vue` = default layout for all pages

### `/composables`
- Reusable composition functions (like React hooks)
- Auto-imported, must start with "use" prefix

### `/assets`
- CSS, fonts, images that need processing by Vite
- Use for files that need bundling/optimization

### `/public`
- Static files served as-is (no processing)
- Accessible from root URL
- `public/logo.png` = `/logo.png`

### `/server/api`
- Backend API routes (serverless functions)
- `hello.ts` = `/api/hello` endpoint

### `/utils`
- Helper/utility functions
- Auto-imported globally

### `/plugins`
- Vue plugins and third-party integrations
- Auto-loaded on app initialization

### `/middleware`
- Route guards (auth, redirects, etc.)
- Runs before rendering pages

## 🚀 Quick Start

```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run preview # Preview production build
```

## 📚 Learn More
- [Nuxt Documentation](https://nuxt.com/docs)
- [Vue 3 Documentation](https://vuejs.org/)
