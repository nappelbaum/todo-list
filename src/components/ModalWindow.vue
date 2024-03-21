<script setup>
defineProps({
  show: Boolean
})

const emit = defineEmits(['close', 'confirm'])
</script>

<template>
  <transition name="modal">
    <div v-if="show" class="modal-shadow" @click.self="emit('close')">
      <div class="modal font-body">
        <div class="modal-close" @click.self="emit('close')">&#10006;</div>
        <slot name="title">
          <h3 class="modal-title">Заголовок</h3>
        </slot>
        <slot name="body">
          <div class="modal-content">Дефолтный контент модального окна</div>
        </slot>
        <slot name="footer">
          <div class="modal-footer">
            <button class="modal-footer__button yes-button" @click.self="emit('confirm')">
              Да
            </button>
            <button class="modal-footer__button" @click.self="emit('close')">Нет</button>
          </div>
        </slot>
      </div>
    </div>
  </transition>
</template>

<style lang="scss">
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s ease-out;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-shadow {
  position: fixed;
  top: 0;
  left: 0;
  min-height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 15;
}

.modal {
  background: #fff;
  border-radius: 8px;
  padding: 30px;
  min-width: 420px;
  max-width: 480px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 16;

  @media (max-width: 520px) {
    min-width: 90vw;
  }

  &-close {
    border-radius: 50%;
    color: #fff;
    background: #2a4cc7;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    cursor: pointer;
    box-shadow: 0 0 10px -2px #00000a;
  }

  &-title {
    color: rgb(1, 175, 1);
  }

  &-content {
    margin-bottom: 20px;
  }

  &-footer {
    &__button {
      background-color: #0971c7;
      color: #fff;
      border: none;
      text-align: center;
      padding: 8px;
      font-size: 17px;
      font-weight: 500;
      border-radius: 8px;
      min-width: 120px;
    }

    .yes-button {
      background-color: #ff4242;
      margin-right: 16px;
      @media (max-width: 400px) {
        margin-right: 0;
      }
    }

    @media (max-width: 400px) {
      display: flex;
      flex-direction: column;
      row-gap: 16px;
    }
  }
}
</style>
