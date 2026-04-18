<template>
  <q-page class="dashboard-page">
    <!-- Header inline: Ai.invest - dashboard -->
    <div class="dashboard-header">
      <span class="dashboard-header__brand">Ai.invest</span>
      <span class="dashboard-header__sep">-</span>
      <span class="dashboard-header__page">dashboard</span>
    </div>

    <!-- Conteúdo -->
    <div class="dashboard-content">
      <p class="dashboard-wip">WORK IN PROGRESS!</p>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "IndexPage",
};
</script>

<style scoped>
.dashboard-page {
  display: flex;
  flex-direction: column;
  background-color: #020c16;
  min-height: 100vh;
}

.dashboard-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 21px 30px;
  border-bottom: 1px solid rgba(51, 150, 254, 0.13);
  flex-shrink: 0;
}

.dashboard-header__brand,
.dashboard-header__sep,
.dashboard-header__page {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 24px;
  line-height: normal;
  color: #ffffff;
  white-space: nowrap;
}

.dashboard-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dashboard-wip {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(2rem, 5vw, 4rem);
  color: #ffffff;
  text-align: center;
  opacity: 0.9;
}
</style>
