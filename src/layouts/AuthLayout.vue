<template>
  <div class="auth-layout">
    <!-- Partículas cobrindo todo o fundo -->
    <canvas ref="particleCanvas" class="particle-canvas" aria-hidden="true" />

    <!-- Brand Panel — desktop only -->
    <aside class="brand-panel">

      <div class="brand-content">
        <!-- Headline -->
        <div class="brand-headline">
          <h2 class="brand-title">
            Inteligência
            <span class="brand-title--accent">artificial</span>
            para seus investimentos
          </h2>
        </div>

        <!-- Subtitle -->
        <p class="brand-subtitle">
          Tome decisões mais inteligentes com análises em tempo real, carteiras
          personalizadas e insights do mercado global.
        </p>

        <!-- Feature list -->
        <ul class="brand-features" aria-label="Recursos">
          <li class="brand-feature">
            <div class="brand-feature__icon" aria-hidden="true">
              <svg
                width="16"
                height="14"
                viewBox="0 0 16 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M1.06667 0C0.477563 0 0 0.477568 0 1.06667V12.8C0 13.3891 0.477563 13.8667 1.06667 13.8667H14.9333C15.5225 13.8667 16 13.3891 16 12.8V1.06667C16 0.477568 15.5225 0 14.9333 0H1.06667ZM8 10.2667C9.84095 10.2667 11.3333 8.77428 11.3333 6.93333C11.3333 5.09238 9.84095 3.6 8 3.6C6.15905 3.6 4.66667 5.09238 4.66667 6.93333C4.66667 8.77428 6.15905 10.2667 8 10.2667Z"
                  fill="#E1FF06"
                />
              </svg>
            </div>
            <span>Análise de ativos</span>
          </li>
          <li class="brand-feature">
            <div class="brand-feature__icon" aria-hidden="true">
              <svg
                width="16"
                height="14"
                viewBox="0 0 16 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M1.06667 0C0.477563 0 0 0.477568 0 1.06667V12.8C0 13.3891 0.477563 13.8667 1.06667 13.8667H14.9333C15.5225 13.8667 16 13.3891 16 12.8V1.06667C16 0.477568 15.5225 0 14.9333 0H1.06667ZM8 10.2667C9.84095 10.2667 11.3333 8.77428 11.3333 6.93333C11.3333 5.09238 9.84095 3.6 8 3.6C6.15905 3.6 4.66667 5.09238 4.66667 6.93333C4.66667 8.77428 6.15905 10.2667 8 10.2667Z"
                  fill="#E1FF06"
                />
              </svg>
            </div>
            <span>Carteiras personalizadas</span>
          </li>
          <li class="brand-feature">
            <div class="brand-feature__icon" aria-hidden="true">
              <svg
                width="16"
                height="14"
                viewBox="0 0 16 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M1.06667 0C0.477563 0 0 0.477568 0 1.06667V12.8C0 13.3891 0.477563 13.8667 1.06667 13.8667H14.9333C15.5225 13.8667 16 13.3891 16 12.8V1.06667C16 0.477568 15.5225 0 14.9333 0H1.06667ZM8 10.2667C9.84095 10.2667 11.3333 8.77428 11.3333 6.93333C11.3333 5.09238 9.84095 3.6 8 3.6C6.15905 3.6 4.66667 5.09238 4.66667 6.93333C4.66667 8.77428 6.15905 10.2667 8 10.2667Z"
                  fill="#E1FF06"
                />
              </svg>
            </div>
            <span>Insights e alertas do mercado</span>
          </li>
        </ul>
      </div>
    </aside>

    <!-- Form Panel -->
    <main class="form-panel">
      <div class="form-inner">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "AuthLayout",

  data() {
    return {
      animationId: null,
    };
  },

  mounted() {
    this.initParticles();
    window.addEventListener("resize", this.resizeCanvas);
  },

  beforeUnmount() {
    if (this.animationId) cancelAnimationFrame(this.animationId);
    window.removeEventListener("resize", this.resizeCanvas);
  },

  methods: {
    initParticles() {
      const canvas = this.$refs.particleCanvas;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      this.resizeCanvas();

      const NODE_COUNT = 80;
      const CONNECTION_DISTANCE = 120;
      const nodes = [];

      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 2 + 1,
        });
      }

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (const node of nodes) {
          node.x += node.vx;
          node.y += node.vy;
          if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
          if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
        }

        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < CONNECTION_DISTANCE) {
              const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.12;
              ctx.beginPath();
              ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
              ctx.lineWidth = 0.8;
              ctx.moveTo(nodes[i].x, nodes[i].y);
              ctx.lineTo(nodes[j].x, nodes[j].y);
              ctx.stroke();
            }
          }
        }

        for (const node of nodes) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255,255,255,0.35)";
          ctx.fill();
        }

        this.animationId = requestAnimationFrame(animate);
      };

      animate();
    },

    resizeCanvas() {
      const canvas = this.$refs.particleCanvas;
      if (!canvas) return;
      const el = this.$el;
      canvas.width = el ? el.offsetWidth : window.innerWidth;
      canvas.height = el ? el.offsetHeight : window.innerHeight;
    },
  },
};
</script>

<style scoped>
/* ── Root ────────────────────────────────────────── */
.auth-layout {
  display: flex;
  height: 100dvh;
  min-height: 100dvh;
  background-color: var(--color-dark);
  position: relative;
  overflow: hidden;
}

/* ── Particle Canvas ─────────────────────────────── */
.particle-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

/* ── Brand Panel ─────────────────────────────────── */
.brand-panel {
  position: relative;
  display: none;
  width: 64%;
  flex-shrink: 0;
  background: transparent;
  overflow: hidden;
  z-index: 1;
}

.brand-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 51px;
  justify-content: center;
  padding: 10px 10px 10px 88px;
  height: 100%;
}

/* ── Headline ────────────────────────────────────── */
.brand-headline {
  max-width: 600px;
  width: max-content;
}

.brand-title {
  font-size: 48px;
  font-weight: 300;
  line-height: 1.2;
  letter-spacing: 0.04px;
  color: #ffffff;
  margin: 0;
}

.brand-title--accent {
  font-weight: 600;
  color: var(--color-primary);
  filter: drop-shadow(0 0 16px var(--color-primary));
}

/* ── Subtitle ────────────────────────────────────── */
.brand-subtitle {
  max-width: 400px;
  font-size: 24px;
  font-weight: 300;
  line-height: 1.5;
  letter-spacing: 0.04px;
  color: var(--color-dark-text-subtle);
  margin: 0;
}

/* ── Features ────────────────────────────────────── */
.brand-features {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
  gap: 16px;
}

.brand-feature {
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.04px;
  color: #ffffff;
}

.brand-feature__icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ── Form Panel ──────────────────────────────────── */
.form-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 24px;
  height: 100%;
  overflow-y: auto;
  background: transparent;
  position: relative;
  z-index: 2;
}

.form-inner {
  width: 100%;
  max-width: 461px;
}

/* ── Responsive ──────────────────────────────────── */
@media (min-width: 768px) {
  .form-panel {
    padding: 32px;
  }
}

@media (min-width: 1180px) {
  .brand-panel {
    display: flex;
    width: 64%;
  }
}
</style>
