@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@200;300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-display: "Outfit", sans-serif;
  --font-mono: "JetBrains Mono", monospace;
  
  --color-brand-primary: #0ea5e9;
  --color-brand-secondary: #6366f1;
}

@layer base {
  body {
    background-color: var(--color-slate-950);
    color: var(--color-slate-100);
    font-family: var(--font-sans);
    height: 100vh;
    overflow: hidden;
  }
}

@utility glass {
  background-color: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

@utility glass-card {
  @apply glass rounded-2xl p-6 transition-all duration-300;
}

@utility glass-button {
  background: var(--color-white);
  color: var(--color-slate-950);
  @apply px-4 py-2 rounded-xl font-bold hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2;
}

@utility brand-button {
  background-image: linear-gradient(to right, var(--color-cyan-500), var(--color-indigo-600));
  @apply w-full py-4 rounded-xl font-bold text-sm shadow-[0_10px_20px_rgba(6,182,212,0.2)] hover:shadow-[0_10px_30px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center gap-2;
}

@utility gradient-text {
  background-clip: text;
  color: transparent;
  background-image: linear-gradient(to right, var(--color-white), var(--color-slate-400));
}

@utility input-field {
  width: 100%;
  background-color: var(--color-slate-950);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;

  &:focus {
    border-color: rgba(6, 182, 212, 0.5);
  }

  &::placeholder {
    color: var(--color-slate-500);
  }
}

@utility main-bg {
  background-image: radial-gradient(circle at 50% -20%, #1e1b4b 0%, transparent 50%);
}

@utility custom-scrollbar {
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.2);
  }
}

@utility no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}

@layer base {
  * {
    @apply custom-scrollbar;
  }
}
