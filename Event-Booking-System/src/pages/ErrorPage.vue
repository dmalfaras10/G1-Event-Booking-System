<template>
  <div class="notfound">
    <h1>404</h1>
    <p>We couldn't find that page.</p>
    <RouterLink :to="{ name: 'home' }" class="back-link">Back to Home</RouterLink>
  </div>
</template>

<style scoped>
.notfound {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 0.5rem;
}
.notfound h1 {
  font-size: 4rem;
  font-weight: 900;
  color: #f3c64f;
  margin: 0;
}
.notfound p {
  color: #9ca3af;
  margin: 0 0 0.5rem;
}
.back-link {
  color: #f3c64f;
  font-weight: 700;
  text-decoration: none;
}
.back-link:hover {
  text-decoration: underline;
}
</style>