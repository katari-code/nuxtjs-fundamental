<template>
  <div>
    <div style="display: flex">
      <img
        v-for="image in home.images"
        :key="image"
        :src="image"
        width="200"
        height="150"
        alt=""
        srcset=""
      />
    </div>
    {{ home.title }}
    {{ home.pricePerNight }} / night <br />
    <img src="/images/marker.svg" width="20" height="20" />
    {{ home.location.address }} {{ home.location.city }}
    {{ home.location.state }}
    {{ home.location.country }} <br />
    <img src="/images/star.svg" width="20" height="20" />
    {{ home.reviewValue }} <br />
    {{ home.guests }} guests, {{ home.bedrooms }} rooms, {{ home.beds }} beds,
    {{ home.bathrooms }} bath <br />
    {{ home.description }}
    <div style="height: 800px; width: 800px" ref="map"></div>
    <div v-for="review in reviews" :key="review.objectID">
      <img :src="review.reviewer.image" /><br />
      {{ review.reviewer.name }}<br />
      {{ formatDate(review.date) }}<br />
      <short-text :text="review.comment" :target="150" /> <br />
    </div>
    <img :src="user.image" />
    {{ user.name }}
    {{ formatDate(user.joined) }}
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: this.home.title,
    };
  },
  mounted() {
    this.$maps.showMap(
      this.$refs.map,
      this.home._geoloc.lat,
      this.home._geoloc.lng
    );
  },

  async asyncData({ params, $dataApi, error }) {
    const respones = await Promise.all([
      $dataApi.getHome(params.id),
      $dataApi.getReviewsByHomeID(params.id),
      $dataApi.getUserByHomeId(params.id),
    ]);

    const badRespone = respones.find((respones) => !respones.ok);
    if (badRespone)
      return error({
        statusCode: badRespone.status,
        message: badRespone.statusText,
      });

    return {
      home: respones[0].json,
      reviews: respones[1].json.hits,
      user: respones[2].json.hits[0],
    };
  },
  methods: {
    formatDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleDateString(undefined, {
        month: "long",
        year: "numeric",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>