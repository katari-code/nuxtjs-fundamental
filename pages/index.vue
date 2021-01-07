<template>
  <div>
    <div
      v-for="home in homes"
      :key="home.objectID"
      style="float: Left; margin: 10px"
    >
      <home-card :home="home"></home-card>
    </div>
  </div>
</template>

<script>
import homes from "../data/homes.json";
export default {
  head() {
    return {
      title: "Homepage",
      meta: [
        {
          name: "descripiton",
          content: "This is a homepage",
          hid: "description",
        },
      ],
    };
  },
  data() {
    return {
      homes: homes.slice(0, 3),
    };
  },
};
</script>