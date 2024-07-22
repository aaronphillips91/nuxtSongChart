<template>
  <div class="flex flex-col items-center justify-center w-full px-2">
    <NavDesktop />
    <NavMobile />
    <div>
      <slot />
    </div>
    <UNotifications />
  </div>
</template>
