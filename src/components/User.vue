<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区 -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入搜索内容"
            v-model="querycdt.query"
            class="input-with-select"
            clearable
            @clear="getUserList()"
            @keyup.enter.native="getUserList()"
          >
            <el-button slot="append" icon="el-icon-search" @click="getUserList()"></el-button>
          </el-input>
        </el-col>
        <el-col :span="8">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
      <el-table :data="userList" border style="width: 100%">
        <el-table-column type="index" width="60"></el-table-column>
        <el-table-column prop="username" label="用户名" width="160"></el-table-column>
        <el-table-column prop="mobile" label="手机号码" width="130"></el-table-column>
        <el-table-column prop="role_name" label="角色" width="130"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mg_state" label="状态" width="60">
          <el-switch v-model="info.row.mg_state" slot-scope="info"></el-switch>
        </el-table-column>
        <el-table-column label="操作" width="250">
          <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
          <el-tooltip content="分配角色" placement="top" :enterable="false">
            <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
          </el-tooltip>
        </el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage4"
        :page-sizes="[3, 5, 10, 20]"
        :page-size="3"
        layout="total,sizes, prev, pager, next,jumper"
        :total="tot"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  // 生命周期函数
  created() {
    this.getUserList()
  },
  methods: {
    // 每条记录条数变化的回调处理
    handleSizeChange(val) {
      // val: 变化后的记录条数
      // console.log(val)
      this.querycdt.pagesize = val
      // 重新根据条件获得数据
      this.getUserList()
    },
    // 当前页码变化的回调处理
    handleCurrentChange(val) {
      // val: 变化后的当前页码值
      // console.log(val)
      this.querycdt.pagenum = val
      // 根据变化后的页码重新获得数据
      this.getUserList()
    },
    // 获取用于显示的真实数据
    async getUserList() {
      const { data: dt } = await this.$http.get('users', {
        params: this.querycdt
      })
      //   console.log(dt)

      if (dt.meta.status !== 200) {
        return this.$message.error(dt.meta.msg)
      }
      // 把获得的总记录条数赋给tot
      this.tot = dt.data.total
      // 把获取的数据赋予userlist
      this.userList = dt.data.users
    }
  },
  data() {
    return {
      // 用户总记录条数
      tot: 0,
      // 声明用户列表数据
      userList: [],
      // 获取用户数据的条件参数
      querycdt: {
        query: '', //被检索的模糊关键字
        pagenum: 1, //分页功能实现
        pagesize: 3 //设置每次获取的记录条数
      }
    }
  }
}
</script>

<style lang="less" scoped>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 100%;
}
</style>
