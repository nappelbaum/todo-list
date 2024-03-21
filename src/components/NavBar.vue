<template>
  <Disclosure as="nav" class="bg-white shadow fixed sm:static z-10 w-full" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
      <div class="relative flex h-20 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton
            class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block h-8 w-8" aria-hidden="true" />
            <XMarkIcon v-else class="block h-8 w-8" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div class="flex flex-1 items-center justify-end sm:items-stretch sm:justify-center">
          <router-link to="/" class="flex flex-shrink-0 items-center">
            <DisclosureButton>
              <IconBtn type="things_to_do" classList="md-30" class="text-gray-700 mr-2 sm:mr-0" />
            </DisclosureButton>
          </router-link>
          <div class="hidden sm:ml-12 sm:block">
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
    <DisclosurePanel class="sm:hidden h-screen sm:h-auto">
      <div class="menu-item space-y-1 px-2 pb-6 pt-4">
        <router-link
          v-for="item in navigation"
          :key="item.name"
          :to="item.href"
          class="text-gray-900 block rounded-md px-3 py-3 my-4 text-lg font-body font-medium"
        >
          <DisclosureButton as="div">{{ item.name }}</DisclosureButton>
        </router-link>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
import IconBtn from './IconBtn.vue'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

const navigation = [
  { name: 'Cписок заметок', href: '/', current: true },
  { name: 'Добавить заметку', href: '/note', current: false }
]
</script>

<style lang="scss" scoped>
.menu-item .router-link-active {
  color: rgb(29, 29, 29);
  background-color: rgb(235, 235, 235);
  transition: all 0.3s;
}
</style>
