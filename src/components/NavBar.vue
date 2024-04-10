<script setup>
import IconBtn from './IconBtn.vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'

const open = ref(false)

const navigation = [
  { name: 'Cписок заметок', href: '/', current: true },
  { name: 'Добавить заметку', href: '/note', current: false }
]
</script>

<template>
  <nav class="bg-white fixed shadow md:static z-10 w-full">
    <div
      class="nav-header mx-auto md:shadow-none max-w-7xl px-4 md:px-6 lg:px-12"
      :class="{
        shadow: open
      }"
    >
      <div class="relative flex h-20 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center md:hidden">
          <!-- Mobile menu button-->
          <button
            class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-700"
            @click="open = !open"
          >
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block h-8 w-8" aria-hidden="true" />
            <XMarkIcon v-else class="block h-8 w-8" aria-hidden="true" />
          </button>
        </div>
        <!-- Desktop menu-->
        <div class="flex flex-1 items-center justify-end md:items-stretch md:justify-center">
          <router-link to="/" class="flex flex-shrink-0 items-center">
            <IconBtn
              type="things_to_do"
              @click="open = false"
              classList="md-30"
              class="text-gray-700 mr-2 md:mr-0"
            />
          </router-link>
          <div class="hidden md:ml-12 md:block">
            <div class="menu-item flex space-x-4">
              <router-link
                v-for="item in navigation"
                :key="item.name"
                :to="item.href"
                class="text-gray-900 block rounded-md px-3 py-3 text-lg font-body font-medium"
                >{{ item.name }}</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu-->
    <transition name="mobileMenu">
      <div v-if="open" class="mobile-menu md:hidden h-screen md:h-auto">
        <div class="menu-item space-y-1 px-2 pb-6 pt-4">
          <router-link
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="text-gray-900 block rounded-md px-3 py-3 my-4 text-lg font-body font-medium"
          >
            <div @click="open = false">{{ item.name }}</div>
          </router-link>
        </div>
      </div>
    </transition>
  </nav>
</template>

<style lang="scss" scoped>
.menu-item .router-link-active {
  color: rgb(29, 29, 29);
  background-color: rgb(235, 235, 235);
  transition: all 0.3s;
}

.mobile-menu {
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -4px rgb(0, 0, 0, 0.1);
}

.mobileMenu-enter-active,
.mobileMenu-leave-active {
  opacity: 1;
  height: 100vh;
  transition: all 0.3s ease-out;
}

.mobileMenu-enter-from,
.mobileMenu-leave-to {
  opacity: 0;
  height: 0;
}

.nav-header:has(+ .mobileMenu-leave-active) {
  box-shadow:
    0 1px 3px 0 rgb(0 0 0 / 0.1),
    0 1px 2px -1px rgb(0 0 0 / 0.1);
}
</style>
