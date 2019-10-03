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
    max-width: 1158px;
    margin: auto;
    padding: 0 24px;
    height: 100px;
    background: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    line-height: 1.25;
    font-size: 24px;
    color: #494b57;
  }
}
</style>