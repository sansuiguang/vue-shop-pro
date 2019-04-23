<template>
  <el-container>
    <el-header>
      <div class="logo-box">
        <img src="../assets/img/heima.png" alt>
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout()">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :style="{width:isshow?'65px':'200px'}">
        <div class="toggle-bar" @click="isshow=!isshow">|||</div>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          :unique-opened="true"
          :collapse="isshow"
          :collapse-transition="false"
        >
          <el-submenu
            :index="item.id+''"
            :style="{width:isshow?'65px':'200px'}"
            v-for="(item,k) in menuList"
            :key="item.id"
          >
            <template slot="title">
              <i :class="'iconfont icon-' + iconList[k]"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item
              :index="item.id + '-' + item2.id"
              v-for="item2 in item.children"
              :key="item2.id"
            >
              <i class="el-icon-menu"></i>
              <span>{{item2.authName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  // 生命周期函数
  created() {
    this.getMenuList()
  },
  methods: {
    logout() {
      this.$confirm('确定要退出系统吗？', '退出', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 清除token
          window.sessionStorage.removeItem('token')
          // 重定向到页面上
          this.$router.push('/login')
        })
        .catch(() => {})
    },
    // 获得左侧菜单权限数据
    async getMenuList() {
      //axios到达后端"获得"左侧菜单权限数据
      const { data: dt } = await this.$http.get('menus')
      //   console.log(dt);
      if (dt.meta.status !== 200) {
        return this.$message.error(dt.meta.msg)
      }
      //把获得好的菜单权限数据赋予给menuList成员
      this.menuList = dt.data
    }
  },
  data() {
    return {
      iconList: ['users', 'tijikongjian', 'shangpin', 'danju', 'baobiao'],
      // 左侧权限数据成员
      menuList: [],
      // 左侧折叠开关
      isshow: false
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  .el-header {
    background-color: #373d41;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0;
    padding-right: 20px;
    .logo-box {
      color: #fff;
      font-size: 22px;
      display: flex;
      align-items: center;
      user-select: none;
      img {
        width: 50px;
        margin-right: 10px;
      }
    }
  }
  .el-aside {
    background-color: #333744;
    .toggle-bar {
      background-color: #4a5064;
      font-size: 12px;
      color: #fff;
      height: 25px;
      line-height: 25px;
      text-align: center;
      letter-spacing: 0.1em;
      cursor: pointer;
    }
  }
  .el-main {
    background-color: #eaedf1;
  }
}
</style>
