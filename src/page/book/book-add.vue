<template>
  <div class="book-add">
    <h1>添加书籍</h1>
    <el-form ref="form"
             :model="bookInfo"
             label-width="80px">
      <el-form-item label="书籍名称">
        <el-input v-model="bookInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="bookInfo.author"></el-input>
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model="bookInfo.price"></el-input>
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
      <el-form-item label="库存">
        <el-input v-model="bookInfo.stock"></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <upload-image v-on:imgUrl="getImage"></upload-image>
      </el-form-item>
      <el-form-item label="内容简介">
        <el-input type="textarea"
                  rows="10"
                  v-model="bookInfo.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="onSubmit">添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import _book from "@/service/book-service.js";
import _category from "@/service/category-service.js";
import UploadImage from "./upload.vue";

export default {
  data () {
    return {
      bookInfo: {},
      parentCategoryList: [],
      categoryList: [],
      parentCategory: "",
      category: "",
      hasParentCategory: false
    };
  },
  components: {
    UploadImage
  },
  mounted () {
    this.getCategory(0);
  },
  methods: {
    onSubmit () {
      this.bookInfo.status = 1;
      var _this = this;
      console.log(this.bookInfo);
      _book.saveBookDetail(
        this.bookInfo,
        res => {
          this.$message.success(res);
          _this.clearInfo();
        },
        err => {
          this.$message.error(err);
        }
      );
    },
    getCategory (parentId) {
      var _this = this;
      _category.getCategoryList(
        parentId,
        res => {
          if (parentId === 0) {
            _this.parentCategoryList = res;
          } else {
            _this.categoryList = res;
          }
        },
        err => {
          this.$message.error(err);
        }
      );
    },
    changeParentCategory () {
      this.hasParentCategory = true;
      this.category = "";
      this.getCategory(this.parentCategory);
    },
    changeCategory () {
      this.bookInfo.categoryId = this.category;
    },
    clearInfo () {
      this.bookInfo = {};
      this.category = "";
      this.parentCategory = "";
      this.hasParentCategory = false;
    },
    getImage (image) {
      this.bookInfo.image = image;
    }
  }
};
</script>

<style lang="stylus" scoped>
.el-input
  width 50%
</style>
