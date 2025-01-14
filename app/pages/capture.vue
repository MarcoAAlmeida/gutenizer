<script setup>
const url = ref('https://hub.nuxt.com')
const image = ref('')
const theme = ref('light')
const loading = ref(false)

async function capture(){
  if (loading.value) return
  loading.value = true
  const blob = await $fetch('/api/browser/capture', {
    query: {
      url: url.value,
      theme: theme.value
    }
  })
  image.value = URL.createObjectURL(blob)
  loading.value = false
}
</script>

<template>
  <form @submit.prevent="capture">
    <input v-model="url" type="url" />
    <select v-model="theme">
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
    <button type="submit" :disabled="loading">
      {{ loading ? 'Capturing...' : 'Capture' }}
    </button>
    <br/>
    <br/>
    <img v-if="image && !loading" :src="image" width="800" />
    {{ image }}
  </form>
</template>
