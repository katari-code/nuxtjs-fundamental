<template>
  <div>
    {{ lat }}/ {{ lng }}/ {{ label }}
    <div v-for="home in homes" :key="home.objectID">{{ home.title }}</div>
    <!-- {{ $route.query }} -->
  </div>
</template>

<script>
export default {
  watchQuery: ["lat"],
  async asyncData({ query, $dataApi }) {
    const data = await $dataApi.getHomesByLocation(query.lat, query.lng);
    console.log(data);
    return {
      homes: data.json.hits,
      label: query.label,
      lat: query.lat,
      lng: query.lng,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>