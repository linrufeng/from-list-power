<template>
  <div class="home-warper">
    <van-nav-bar
      fixed
      title="创建历史"
      right-text="编辑"
      @click-right="addNewFrom"
    />
    <div>
      <van-cell-group v-if="fromList.length > 0">
        <van-cell
          v-for="item in fromList"
          value=""
          :key="item.id"
          :title="item.name"
          is-link
          @click="goEditPage(item)"
        />
      </van-cell-group>
      <div v-else>
        <van-empty description="请创建工单" />
      </div>
    </div>
    <van-tabbar route>
      <van-tabbar-item replace to="/" icon="home-o">我的工单</van-tabbar-item>
      <van-tabbar-item replace to="/history" icon="todo-list-o">创建历史</van-tabbar-item>
    </van-tabbar>
  
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  data() {
    return {
      footactive: 1,
      showNewCreateFrom: false,
      fromName: "",
      fromList: [],
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      const res = this.$tl.get("newfromRulesTempConfigs");
      if (res && res.length > 0) {
        this.fromList = res;
      }
    },
    addNewFrom() {
      this.showNewCreateFrom = true;
    },
    goEditPage(obj) {
     
      this.$router.push({
        path: "/edit",
        query: {
          name: obj.name,
          time: obj.createTime,
          newTime:Number(new Date())
        },
      });
      
    },
  },
};
</script>
<style lang="scss" scoped>
.home-warper {
  padding-top: 46px;
}
.dialog-box-content {
  padding: 20px;
}
</style>
