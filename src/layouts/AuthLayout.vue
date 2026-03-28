<template>
  <div class="auth-layout">
    <!-- Brand Panel — hidden on mobile -->
    <aside class="auth-brand-panel">
      <!-- Decorative background elements -->
      <div class="auth-brand-grid" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(51,150,254,0.12)" stroke-width="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div class="auth-brand-circle auth-brand-circle--1" aria-hidden="true"></div>
      <div class="auth-brand-circle auth-brand-circle--2" aria-hidden="true"></div>
      <div class="auth-brand-circle auth-brand-circle--3" aria-hidden="true"></div>

      <!-- Brand Content -->
      <div class="auth-brand-content">
        <!-- Logo -->
        <div class="auth-brand-logo">
          <div class="auth-brand-logo__icon">
            <q-icon name="svguse:icons/icons.svg#icon-logo" size="22px" color="white" />
          </div>
          <span class="auth-brand-logo__name">AI.INVEST</span>
        </div>

        <!-- Headline -->
        <div class="auth-brand-headline">
          <h2 class="text-headline-md text-white">
            Inteligência artificial para seus investimentos
          </h2>
          <p class="text-paragraph-lg auth-brand-subtitle">
            Tome decisões mais inteligentes com análises em tempo real, carteiras personalizadas e insights do mercado global.
          </p>
        </div>

        <!-- Feature list -->
        <ul class="auth-brand-features">
          <li class="auth-brand-feature">
            <div class="auth-brand-feature__icon">
              <q-icon name="check" size="14px" color="primary" />
            </div>
            <span class="text-paragraph-md text-white">Análise de ativos com IA em tempo real</span>
          </li>
          <li class="auth-brand-feature">
            <div class="auth-brand-feature__icon">
              <q-icon name="check" size="14px" color="primary" />
            </div>
            <span class="text-paragraph-md text-white">Carteiras personalizadas e balanceamento automático</span>
          </li>
          <li class="auth-brand-feature">
            <div class="auth-brand-feature__icon">
              <q-icon name="check" size="14px" color="primary" />
            </div>
            <span class="text-paragraph-md text-white">Insights e alertas do mercado global</span>
          </li>
        </ul>

        <!-- Footer note -->
        <p class="auth-brand-trust text-paragraph-sm">
          Mais de 10.000 investidores confiam na plataforma
        </p>
      </div>
    </aside>

    <!-- Form Panel -->
    <main class="auth-form-panel">
      <!-- Mobile-only logo -->
      <div class="auth-mobile-logo">
        <div class="auth-mobile-logo__icon">
          <q-icon name="svguse:icons/icons.svg#icon-logo" size="18px" color="white" />
        </div>
        <span class="auth-mobile-logo__name text-title-sm">AI.INVEST</span>
      </div>

      <!-- Page slot -->
      <div class="auth-form-inner">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "AuthLayout",
};
</script>

<style scoped>
/* ── Layout root ─────────────────────────────────── */
.auth-layout {
  display: flex;
  min-height: 100dvh;
  background-color: var(--color-light-page);
}

/* ── Brand Panel ─────────────────────────────────── */
.auth-brand-panel {
  position: relative;
  display: none;
  flex-direction: column;
  width: 45%;
  flex-shrink: 0;
  background: linear-gradient(
    160deg,
    var(--color-primary-dark2) 0%,
    var(--color-primary-dark) 40%,
    var(--color-primary-darker) 100%
  );
  overflow: hidden;
}

/* ── Decorative grid overlay ─────────────────────── */
.auth-brand-grid {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.6;
}

/* ── Decorative circles ──────────────────────────── */
.auth-brand-circle {
  position: absolute;
  border-radius: 9999px;
  pointer-events: none;
}

.auth-brand-circle--1 {
  width: 320px;
  height: 320px;
  background: radial-gradient(circle, rgba(51, 150, 254, 0.18) 0%, transparent 70%);
  top: -80px;
  right: -80px;
}

.auth-brand-circle--2 {
  width: 480px;
  height: 480px;
  background: radial-gradient(circle, rgba(12, 55, 108, 0.5) 0%, transparent 70%);
  bottom: -120px;
  left: -120px;
}

.auth-brand-circle--3 {
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(51, 150, 254, 0.1) 0%, transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* ── Brand content ───────────────────────────────── */
.auth-brand-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 48px 40px;
  height: 100%;
  justify-content: center;
}

/* ── Logo ────────────────────────────────────────── */
.auth-brand-logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.auth-brand-logo__icon {
  width: 40px;
  height: 40px;
  background-color: var(--color-primary);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 0 20px rgba(51, 150, 254, 0.4);
}

.auth-brand-logo__name {
  font-size: 1.5rem;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -0.02em;
}

/* ── Headline ────────────────────────────────────── */
.auth-brand-subtitle {
  color: rgba(255, 255, 255, 0.65);
  margin-top: 16px;
  line-height: 1.6;
}

/* ── Features list ───────────────────────────────── */
.auth-brand-features {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.auth-brand-feature {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.auth-brand-feature__icon {
  width: 24px;
  height: 24px;
  background-color: rgba(51, 150, 254, 0.15);
  border: 1px solid rgba(51, 150, 254, 0.3);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 1px;
}

/* ── Trust note ──────────────────────────────────── */
.auth-brand-trust {
  color: rgba(255, 255, 255, 0.4);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 24px;
}

/* ── Form Panel ──────────────────────────────────── */
.auth-form-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 24px;
  min-height: 100dvh;
  background-color: var(--color-light);
  overflow-y: auto;
}

.auth-form-inner {
  width: 100%;
  max-width: 400px;
}

/* ── Mobile logo ─────────────────────────────────── */
.auth-mobile-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 40px;
}

.auth-mobile-logo__icon {
  width: 36px;
  height: 36px;
  background-color: var(--color-primary-dark);
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.auth-mobile-logo__name {
  color: var(--color-primary-dark);
  font-weight: 800;
  letter-spacing: -0.02em;
}

/* ── Responsive ──────────────────────────────────── */

/* Tablet: 600px+ */
@media (min-width: 600px) {
  .auth-layout {
    background-color: var(--color-light-page);
  }

  .auth-form-panel {
    border-radius: 0;
  }
}

/* Desktop: 1180px+ */
@media (min-width: 1180px) {
  .auth-brand-panel {
    display: flex;
    width: 48%;
  }

  .auth-form-panel {
    background-color: var(--color-light);
  }

  .auth-mobile-logo {
    display: none;
  }
}

/* Tablet range: show brand panel smaller */
@media (min-width: 768px) and (max-width: 1179px) {
  .auth-brand-panel {
    display: flex;
    width: 40%;
  }

  .auth-brand-content {
    padding: 40px 28px;
    gap: 32px;
  }

  .auth-mobile-logo {
    display: none;
  }
}
</style>
