<template>
  <div class="header x-card">
    <div class="headerBody">
      <div>LOGO</div>
      <div class="headerSearch">
        <input type="text" class="x-input" />
      </div>
      <div class="headerMenu">菜单</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header"
};
</script>

<style scoped lang="less">
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  display: flex;
  justify-content: center;

  .headerBody {
    width: 640px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .headerSearch {
      text-align: center;
      flex-grow: 1;
      input{
        width: 400px;
      }
    }
    .headerMenu {
      display: none;
    }
  }
}
.x-card {
  border-radius: 0 0 0 0;
}
@media screen and (max-width: 1280px) {
  .header {
    .headerBody {
      .headerMenu {
        display: block;
      }
    }
  }
}
</style>
