<template>
  <div class="home-warper">
    <van-nav-bar
      fixed
      title="首页"
      right-text="新建工单"
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
          @click="goUsePage(item)"
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
    <van-dialog
      v-model="showNewCreateFrom"
      title="新建工单"
      show-cancel-button
      @confirm="submitFrom"
    >
      <div class="dialog-box-content">
        <van-cell-group>
          <van-field v-model="fromName" label="表名" placeholder="请输入表名" />
        </van-cell-group>
      </div>
    </van-dialog>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  data() {
    return {
      footactive:0,
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
      const res = this.$tl.get("fromConfigs");

      if (res && res.length > 0) {
        this.fromList = res;
      }
    },
    addNewFrom() {
      this.showNewCreateFrom = true;
    },
    submitFrom() {
      this.showNewCreateFrom = false;
      this.$router.push({
        path: "/edit",
        query: {
          name: this.fromName,
          time: Number(new Date()),
        },
      });
    },
    goUsePage(obj){
      this.$router.push({
        path: "/fromuse",
        query: {
          name: obj.name,
          id: obj.id,
        },
      });
    }
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
