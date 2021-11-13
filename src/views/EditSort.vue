<template>
  <div class="edit-warper">
    <van-nav-bar
      fixed
      :title="`创建-${fromName}`"
      left-text="返回"
      left-arrow
      right-text="完成"
      @click-left="$router.go(-1)"
      @click-right="createOver"
    >
    </van-nav-bar>
    <div class="edit-list-warper">
      <!-- 操作栏 -->
      <div class="handles-box">
        <!-- <van-button size="mini" class="btn-box" plain type="info"
          >快捷排序</van-button
        > -->
        <!-- <van-button
          class="btn-box"
          @click="saveEpr"
          plain
          size="mini"
          type="info"
          >保存规则</van-button
        > -->
        <van-button
          class="btn-box"
          @click="addnewGroup"
          plain
          size="mini"
          type="info"
          >添加分组</van-button
        >
        <van-button
          class="btn-box"
          @click="addItemsToGrop"
          plain
          size="mini"
          type="info"
          >添加项目</van-button
        >
      </div>
      <!-- 分组 -->
      <van-tabs
        v-if="fromGroups.length !== 0"
        v-model="activeGroup"
        animated
        sticky
      >
        <van-tab
          v-for="(item, index) in fromGroups"
          :key="index"
          :title="item.name"
          nav-right="1"
        >
          <div slot="nav-right">3213123</div>
          <!-- 拖拽排序栏 -->
          <div class="list-warper">
            <!-- <van-cell-group> -->
            <!-- <van-grid> -->
            <div>
              <draggable v-model="item.list" @start="onStart" @end="onEnd">
                <transition-group tag="van-grid" class="list-box">
                  <van-grid-item
                    class="item-cell"
                    v-for="(item, index) in item.list"
                    :key="item.id"
                  >
                    <van-icon
                      class="close-box"
                      name="clear"
                      size="20"
                      @click="deleteItem(item, index)"
                    />
                    <div class="content-text">
                      {{ `${index + 1}. ${item.name}` }}
                    </div>
                  </van-grid-item>
                </transition-group>
              </draggable>
            </div>

            <!-- </van-grid> -->
            <!-- </van-cell-group> -->
          </div>
        </van-tab>
      </van-tabs>
      <div v-else>
        <van-empty description="暂无配置" />
      </div>
      <!-- 插入列 -->
      <van-action-sheet v-model="showAddItem" title="插入项目">
        <div class="add-item-list">
          <van-grid>
            <van-grid-item
              class="item-cell"
              v-for="(item, index) in dragList"
              :key="item.id"
              :text="`${index + 1}. ${item.title}`"
              @click="addToActiveList(item, index)"
              :class="{
                'hide-box': item.none,
              }"
            >
              <van-icon class="close-box" color="#ccc" name="add" size="20" />
              <div class="content-text">
                {{ `${index + 1}. ${item.name}` }}
              </div>
            </van-grid-item>
          </van-grid>
        </div>
      </van-action-sheet>
      <!-- 增加排序弹窗 -->
      <!-- 排序规则选择层 -->
      <!--  -->
      <van-dialog
        v-model="showCreateGroup"
        title="新建分组"
        show-cancel-button
        @confirm="addCreateGroupNameToTab"
      >
        <div class="dialog-box-content">
          <van-cell-group>
            <van-field
              v-model="newGroupName"
              label="组名"
              placeholder="请输入组名"
            />
          </van-cell-group>
        </div>
      </van-dialog>
    </div>
  </div>
</template>

<script>
import fromOrigin from "./../data/from-origin";
import draggable from "vuedraggable";
/**
 * 表设计
 * 新表配置规则 表 ( 模板 )
 * { newfromRulesTempConfigs : [] }
 * {
 *   id: 'xxxxxxxxx',
 *   name:'xxxxxxxxx',
 *   createTime: 'xxxxxx',
 *   updateTime: 'xxxxxx',
 *   deleteTime: null,
 *   temp: true,
 *   from: [],
 * }
 *
 */
export default {
  components: {
    draggable,
  },
  data() {
    const dragList = fromOrigin.map((item) => {
      return item;
    });
    console.log(dragList);
    return {
      fromName: "",
      createFromTime: "",
      showAddItem: false, // 添加项目弹窗
      showCreateGroup: false, // 新增分组
      newGroupName: "",
      activeGroup: 1,
      // 分组表单编辑0
      fromGroups: [],
      originList: fromOrigin,
      dragList: dragList,
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      const { name, time } = this.$route.query;
      this.fromName = name;
      this.createFromTime = time;
      const res = this.$tl.get("newfromRulesTempConfigs");
      const thisData = res.filter((item) => item.id === `DB${time}`);
      console.log(thisData);
      if (thisData && thisData.length > 0) {
        this.fromGroups = thisData[0].from;
        if (thisData[0].dragList) {
          this.dragList = thisData[0].dragList;
        }
      }
    },
    onStart() {},
    onEnd() {},
    goNextPage() {
      // 排序规则创建完成
      // 1. 记录当前表的名称和创建时间生成唯一 id
      // 2. 将当前创建的数据 { "唯一id的表" : []  } 存到 local 中
      // 3. 携带当前的信息进入到使用页面中
    },
    saveEpr() {},
    deleteItem(obj, index) {
      // 1. 当前组
      const { activeGroup, fromGroups, dragList } = this;
      fromGroups[activeGroup].list.splice(index, 1);
      // 2. 项目池
      const itemIndex = dragList.findIndex((item) => item.id === obj.id);
      this.dragList[itemIndex].none = false;
      this.$nextTick(() => {
        this.saveConfig();
      });
    },
    // 添加分组
    addnewGroup() {
      this.showCreateGroup = true;
    },
    addCreateGroupNameToTab() {
      const { newGroupName } = this;
      this.fromGroups.push({
        name: newGroupName,
        list: [],
      });
      this.$nextTick(() => {
        this.activeGroup = this.activeGroup + 1;
        this.newGroupName = "";
        this.showCreateGroup = false;
        this.showAddItem = true;
        this.saveConfig();
      });
    },
    // 添加项目到组弹窗
    addItemsToGrop() {
      const { fromGroups } = this;
      if (fromGroups.length === 0) {
        this.addnewGroup();
      } else {
        this.showAddItem = true;
      }
    },
    // 添加项目到分组
    addToActiveList(obj, index) {
      console.log(obj, index);
      const { activeGroup } = this;
      const cloneObj = JSON.parse(JSON.stringify(obj));
      this.fromGroups[activeGroup].list.push(cloneObj);
      this.dragList[index].none = true;
      this.$nextTick(() => {
        this.saveConfig();
      });
    },
    saveConfig(bl, setDBName) {
      const { fromName, createFromTime, fromGroups, dragList } = this;
      const storeData = {
        id: `DB${createFromTime}`,
        name: fromName,
        createTime: createFromTime,
        updateTime: Number(new Date()),
        deleteTime: null,
        temp: bl || 1,
        from: fromGroups,
        dragList: dragList,
      };
      console.log(storeData);
      this.$tl.updata({
        froms: setDBName || "newfromRulesTempConfigs",
        val: storeData,
        id: `DB${createFromTime}`,
      });
    },
    // 创建完成
    createOver() {
      const {newTime}= this.$route.query
      // 新增 fromConfigs 中的 id 项
      if(newTime){
        this.createFromTime = newTime
      }
      this.saveConfig(2, "fromConfigs");
    },
  },
};
</script>

<style lang="scss" scoped>
.edit-warper {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: "微软雅黑";
  padding-top: 46px;
  // flex-direction: ;
}
.edit-list-warper {
  flex-grow: 1;
  // background: #1989fa;
}
.list-warper {
  margin-top: 10px;
  padding: 0 40px 0 20px;
}
.handles-box {
  display: flex;
  align-items: center;
  height: 30px;
  padding: 10px 20px;
  border-bottom: 1px solid #ebedf0;
}
.btn-box {
  margin-right: 5px;
}
.next-box {
  margin-left: auto;
}
.content-text {
  line-height: 22px;
}
.close-box {
  position: absolute;
  top: 5px;
  right: 5px;
}
.list-box {
  display: flex;
  flex-wrap: wrap;
  // padding: 0px 20px 20px 0px;
}
.add-item-list {
  min-height: 600px;
  padding: 0 20px;
}
.item-box {
  width: 25%;
  height: 100px;
  box-sizing: border-box;
  padding: 5px;
  text-align: left;
  background: rgb(228, 228, 228);
  &:nth-of-type(2n) {
    background: #fff;
  }
}
.item-cell {
  height: 100px;
  line-height: 30px;
  font-size: 12px !important;
  padding: 0 0;
  background: none;
  box-sizing: border-box;
}
.dialog-box-content {
  padding: 20px;
}
.hide-box {
  display: none;
}
</style>
