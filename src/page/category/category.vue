<template>
  <div class="category">
    <h1>品类管理</h1>
    <el-button type="primary"
               class="add-btn"
               @click="addCategoryBtn"
               round>添加品类</el-button>
    <el-table :data="data"
              stripe
              style="width: 100%">
      <el-table-column prop="id"
                       label="品类ID"></el-table-column>
      <el-table-column prop="name"
                       label="品类名称"
                       width="360"></el-table-column>
      <el-table-column prop="handle"
                       label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)"
                     type="text"
                     size="small">修改名称</el-button>
          <el-button v-show="scope.row.parentId === 0"
                     @click="getChildren(scope.row)"
                     type="text"
                     size="small">查看子品类</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import _category from "@/service/category-service.js"
export default {
  inject: ["reload"],
  data () {
    return {
      data: [],
      categoryId: this.$route.params.id,
      parentIdDesc: ""
    }
  },
  mounted () {
    this.getCategoryList(this.categoryId)
  },
  methods: {
    getCategoryList (categoryId) {
      var _this = this
      this.getParentName(categoryId)
      _category.getCategoryList(
        categoryId,
        res => {
          _this.data = res
        },
        err => {
          this.$message.error(err)
        }
      )
    },
    handleClick (row) {
      var _this = this
      this.$prompt("请更改品类名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          _this.updateCategoryName(row.id, value)
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          })
        })
    },
    updateCategoryName (id, value) {
      var _this = this
      _category.updateCategoryName(
        {
          categoryId: id,
          categoryName: value
        },
        res => {
          this.$message({
            type: "success",
            message: "更新品类名称成功"
          })
        },
        err => {
          this.$message.error(err)
        }
      )
      this.reload()
    },
    getChildren (row) {
      // this.parentIdDesc = row.name
      this.$router.push({ name: "Category", params: { id: row.id } })
      this.getCategoryList(row.id)
      this.categoryId = row.id
    },
    addCategoryBtn () {
      var _this = this
      var text = this.parentIdDesc === "" ? "根节点" : this.parentIdDesc

      this.$prompt(`当前为${text}--请输入新的品类名称`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          _this.addCategoryName(value)
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          })
        })
    },
    addCategoryName (value) {
      var _this = this
      _category.addCategory(
        {
          categoryName: value,
          parentId: this.categoryId
        },
        res => {
          this.$message({
            type: "success",
            message: res
          })
        },
        err => {
          this.$message.error(err)
        }
      )
      this.reload()
    },
    getParentName (categoryId) {
      var _this = this
      if (categoryId === '0') {
        this.parentIdDesc = '根节点'
      } else {
        _category.getCategoryName(
          categoryId,
          res => {
            _this.parentIdDesc = res
          },
          err => {
            _this.$message.error(err)
          }
        )
      }
    }
  },
  watch: {
    $route (to, from) {
      // console.log(to)
      this.getCategoryList(to.params.id)
    },
    deep: true
  }
}
</script>

<style lang="stylus" scoped>
.category
  position relative
  .add-btn
    position absolute
    top 0
    right 0
</style>