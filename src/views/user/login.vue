<template>
  <div>
    <el-button @click="saveLogin">登录</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  computed: {},
  mounted() {},
  methods: {
    saveLogin() {
      this.$router.push({ path: "/" });
    }
  }
};
</script>
<style lang="scss" scoped></style>
