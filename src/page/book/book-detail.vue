<template>
  <div class="book-detail">
    <h1>书籍详情</h1>
    <el-form ref="form"
             :model="bookInfo"
             label-width="80px">
      <el-form-item label="书籍名称">
        <div class="text el-input__inner">{{bookInfo.name}}</div>
      </el-form-item>
      <el-form-item label="作者">
        <div class="text el-input__inner">{{bookInfo.author}}</div>
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model="pointPrice">
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="类别">
        <el-select @change="changeParentCategory"
                   v-model="parentCategory"
                   filterable
                   placeholder="请选择">
          <el-option v-for="(item, index) in parentCategoryList"
                     :key="index"
                     :label="item.name"
                     :value="item.id"></el-option>
        </el-select>
        <el-select v-show="hasParentCategory"
                   @change="changeCategory"
                   v-model="category"
                   filterable
                   placeholder="请选择">
          <el-option v-for="(item, index) in categoryList"
                     :key="index"
                     :label="item.name"
                     :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="当前状态">
        <el-select v-model="bookInfo.statusDesc"
                   @change="changeStatus(bookInfo.status)">
          <el-option label="在售"
                     value="在售"></el-option>
          <el-option label="下架"
                     value="下架"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="库存">
        <el-input v-model="bookInfo.stock">
          <template slot="append">本</template>
        </el-input>
      </el-form-item>
      <el-form-item label="内容简介">
        <el-input type="textarea"
                  rows="10"
                  v-model="bookInfo.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import _book from '@/service/book-service.js'
import _category from '@/service/category-service.js'

export default {
  inject: ["reload"],
  data () {
    return {
      bookId: this.$route.query.bookId,
      bookInfo: {},
      parentCategoryList: [],
      categoryList: [],
      parentCategory: '',
      category: '',
      hasParentCategory: true
    }
  },
  mounted () {
    this.getBookDetail()
    this.getCategory(0)
  },
  methods: {
    onSubmit () {
      var _this = this
      this.bookInfo.categoryId = this.category
      // console.log(this.bookInfo)
      _book.saveBookDetail(this.bookInfo, res => {
        this.$message.success(res)
      }, err => {
        this.$message.error(err)
      })
      this.reload();
    },
    getBookDetail () {
      var _this = this
      _book.getBookDetail(this.bookId, res => {
        // console.log(res)
        _this.bookInfo = res
        _this.category = res.categoryId
        _this.getParentId(res.categoryId)
      }, err => {
        this.$message.error(err)
      })
    },
    getCategory (parentId) {
      var _this = this
      _category.getCategoryList(parentId, res => {
        if (parentId === 0) {
          _this.parentCategoryList = res
        } else {
          _this.categoryList = res
        }
      }, err => {
        this.$message.error(err)
      })
    },
    changeParentCategory () {
      this.hasParentCategory = true
      this.category = ''
      this.getCategory(this.parentCategory)
    },
    changeCategory () {
      this.bookInfo.categoryId = this.category
    },
    getParentId (categoryId) {
      var _this = this
      _category.getParentId(categoryId, res => {
        _this.parentCategory = res
        _this.getCategory(res)
      }, err => {
        this.$message.error(err)
      })
    },
    changeStatus (status) {
      this.bookInfo.status = status === 1 ? 0 : 1
    }
  },
  computed: {
    pointPrice () {
      var price = this.bookInfo.price
      if (price != null)
        return price.toFixed(2)
      else
        return ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.book-detail
  .el-input, .text
    width 50%
</style>
