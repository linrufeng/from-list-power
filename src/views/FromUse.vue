<template>
  <div class="home-warper">
    <van-nav-bar
      fixed
      left-text="返回"
      :title="`工单-${fromName}`"
      right-text="导出pdf"
      @click-left="$router.go(-1)"
    />
    <div class="gongdan-box">

    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      fromName:'',
      fromId:''
    }
  },
  mounted(){
    this.init()
  },
  methods:{
    init(){
      const { name ,id } = this.$route.query
      this.fromName = name
      this.fromId = id
    }
  }
}
</script>

<style>

</style>