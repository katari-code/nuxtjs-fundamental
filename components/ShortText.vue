<template>
  <span>
    {{ displayText }}
  </span>
</template>

<script>
export default {
  data() {
    return {
      isExpended: false,
      chunks: [],
    };
  },
  props: {
    text: {
      text: String,
      required: true,
    },
    target: {
      type: Number,
      required: true,
    },
    computed: {
      isTooLong() {
        return this.chunks.length === 2;
      },
      displayText() {
        if (!this.isTooLong || this.isExpanded) return this.chunks.join("");
        return this.chunks[0] + "...";
      },
    },
  },
  created() {
    this.chunks = this.getChuncks();
  },
  methods: {
    getChuncks() {
      const position = this.text.indexOf("", this.target);
      if (this.text.length <= this.target || position === -1)
        return [this.text];
      return [this.text.substring(0, position), this.text.substring(position)];
    },
  },
};
</script>