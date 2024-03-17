<template>
  <footer class="footer font-body">
    <div class="mx-auto max-w-7xl">
      <div class="footer__title">
        <div>&copy;&nbsp; Название вашей компании</div>
        <div>
          {{ date }}
          Все права защищены
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

let date = ref(new Date().getFullYear())
</script>

<style lang="scss" scoped>
.footer {
  background-color: rgb(0 0 0 / 20%);
  padding: 20px;

  &__title {
    text-align: center;
    font-size: 14px;

    > div {
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
