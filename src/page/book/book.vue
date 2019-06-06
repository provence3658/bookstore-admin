<template>
  <div class="book">
    <h1>书籍管理</h1>
    <div class="search">
      <el-form :inline="true"
               class="demo-form-inline">
        <el-form-item label="搜索条件">
          <el-select v-model="searchType"
                     placeholder="请选择活动区域">
            <el-option label="书籍ID"
                       value="id"></el-option>
            <el-option label="书籍名称"
                       value="name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="search"
                    placeholder="请输入书籍ID或名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     icon="el-icon-search"
                     @click="searchBookBtn()">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-button type="primary"
               class="add-btn"
               round
               @click="addBook()">添加书籍</el-button>
    <el-table :data="data.list"
              stripe
              style="width: 100%">
      <el-table-column prop="id"
                       label="书籍ID">
      </el-table-column>
      <el-table-column prop="name"
                       label="书名"
                       width="360">
      </el-table-column>
      <el-table-column prop="price"
                       label="价格">
      </el-table-column>
      <el-table-column prop="statusDesc"
                       label="状态">
      </el-table-column>
      <el-table-column prop="handle"
                       label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)"
                     type="text">查看&编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background
                   @current-change="handleCurrentChange"
                   layout="prev, pager, next"
                   :total="data.total">
    </el-pagination>
  </div>
</template>

<script>
import _book from '@/service/book-service.js'
export default {
  data () {
    return {
      data: {},
      search: '',
      searchType: 'id'
    }
  },
  mounted () {
    this.getBookList(1)
  },
  methods: {
    getBookList (page) {
      var _this = this
      _book.getBookList({
        pageNum: page
      }, res => {
        // console.log(res)
        _this.data = res
      }, err => {
        this.$message.error(err)
      })
    },
    handleClick (row) {
      this.$router.push({ path: '/book/detail', query: { bookId: row.id } })
    },
    handleCurrentChange (currentPage) {
      this.getBookList(currentPage)
    },
    addBook () {
      this.$router.push({ path: '/book/add' })
    },
    searchBookBtn () {
      var _this = this
      if (this.searchType === 'id') {
        _book.search({
          bookId: this.search
        }, res => {
          // console.log(res)
          _this.data = res
        }, err => {
          this.$message.error(err)
        })
      } else {
        _book.search({
          bookName: this.search
        }, res => {
          // console.log(res)
          _this.data = res
        }, err => {
          this.$message.error(err)
        })
      }

    }
  }
}
</script>

<style lang="stylus" scoped>
.book
  position relative
  .add-btn
    position absolute
    top 0
    right 0
  .el-pagination
    text-align center
    margin-top 20px
</style>
