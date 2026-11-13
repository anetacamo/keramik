# Deployment checklist (Option B)

Frontend (`anetacamo/`) → **GitHub Pages** (free, public repo)
Backend (`image-server/`) → **Render** free web service (sleeps when idle)

Tick a box by changing `[ ]` to `[x]`.

---

## 1. Code on GitHub

- [x] Add root `.gitignore`
- [x] Create an empty public repo on GitHub (no README / .gitignore / license)
- [ ] Initialise git and push:
  ```bash
  git init
  git add .
  git status          # make sure node_modules is not listed
  git commit -m "Initial commit"
  git branch -M main
  git remote add origin https://github.com/<username>/<repo>.git
  git push -u origin main
  ```

## 2. Deploy the backend to Render

- [ ] Add CORS to Fastify (`npm i @fastify/cors` in `image-server/`), allow the GitHub Pages origin
- [ ] Make the server listen on `process.env.PORT` and host `0.0.0.0`
- [ ] Add a `start` script to `image-server/package.json`
- [ ] Sign up at render.com with GitHub → **New → Web Service** → pick the repo
  - Root directory: `image-server`
  - Build command: `npm install`
  - Start command: `npm start`
  - Instance type: **Free**
- [ ] Open `https://<service>.onrender.com/blogs` and check it returns JSON
- [ ] Note: likes and submissions are written to JSON files, which reset when Render restarts/redeploys

## 3. Point the frontend at the backend

- [ ] Use `import.meta.env.VITE_API_URL` for `API_BASE` (fallback to `/api` for local dev)
- [ ] Set `VITE_API_URL=https://<service>.onrender.com` in the build (GitHub Actions)

## 4. Base path for GitHub Pages

Site URL will be `https://<username>.github.io/<repo>/`
(skip this step if the repo is named `<username>.github.io`)

- [ ] `vite.config.ts`: add `base: "/<repo>/"`
- [ ] Router: set `basepath: "/<repo>"`
- [ ] Check images/links/fonts use `import.meta.env.BASE_URL` where needed

## 5. Fix refresh / deep links

- [ ] After build, copy `dist/index.html` → `dist/404.html`

## 6. GitHub Actions deploy

- [ ] Add `.github/workflows/deploy.yml` (build `anetacamo/`, upload `anetacamo/dist`, deploy to Pages)
- [ ] Add repo variable `VITE_API_URL` in **Settings → Secrets and variables → Actions → Variables**
- [ ] **Settings → Pages → Source: GitHub Actions**
- [ ] Push to `main` and watch the **Actions** tab

## 7. Verify

- [ ] Home page loads at `https://<username>.github.io/<repo>/`
- [ ] Refreshing `/en/blog/<id>` works
- [ ] Images load
- [ ] Like button works (first request may take ~30–60 s while Render wakes up)
- [ ] Contact form submits
- [ ] Update `.github/copilot-instructions.md` with the deployment setup

---

## Questions / notes

<!-- Write questions here and ask Copilot to look at this file. -->

-
