<!-- Example component showing SCSS variables usage -->
<template>
  <div class="demo">
    <h1>SCSS Variables Demo</h1>
    <div class="color-boxes">
      <div class="box primary">Primary</div>
      <div class="box secondary">Secondary</div>
      <div class="box success">Success</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// No need to import _variables.scss - it's auto-imported!
.demo {
  padding: $spacing-8;
  font-family: $font-family-base;
  
  h1 {
    color: $gray-900;
    font-size: $font-size-3xl;
    font-weight: $font-weight-bold;
    margin-bottom: $spacing-6;
  }
  
  .color-boxes {
    display: flex;
    gap: $spacing-4;
  }
  
  .box {
    padding: $spacing-4;
    border-radius: $border-radius-lg;
    color: $white;
    font-weight: $font-weight-medium;
    box-shadow: $shadow-md;
    transition: all $transition-base;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: $shadow-lg;
    }
    
    &.primary {
      background-color: $primary;
    }
    
    &.secondary {
      background-color: $secondary;
    }
    
    &.success {
      background-color: $success;
    }
  }
}
</style>
