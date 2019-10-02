<template>
  <div class="page-bar">
    <div class="page-bar__content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
.page-bar {
  background: white;
  border-bottom: 1px solid #ccc;

  &__content {
    width: 100%;
    max-width: 1110px;
    margin: auto;
    height: 100px;
    background: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    height: 30px;
    line-height: 1.25;
    font-size: 24px;
    color: #494b57;
  }
}
</style>