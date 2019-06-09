<template>
  <el-upload class="avatar-uploader"
             action="x"
             :show-file-list="false"
             :http-request="submitUpload">
    <img v-if="imageUrl"
         :src="imageUrl"
         class="avatar">
    <i v-else
       class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
import _book from "@/service/book-service.js"

export default {
  data () {
    return {
      imageUrl: ""
    }
  },
  methods: {
    submitUpload: function (content) {
      let formData = new FormData()
      formData.append("upload_file", content.file)
      let config = {
        "Content-Type": "multipart/form-data",
        withCredentials: true
      }
      let _this = this
      this.$axios
        .post(
          "http://localhost:8088/bookstore_war/manage/book/upload.do",
          formData,
          config
        )
        .then(function (response) {
          if (!response.data.success) {
            _this.$message({
              message: response.data.message,
              type: "error"
            })
          }
          _this.imageUrl = response.data.data
          _this.$emit("imgUrl", _this.imageUrl)
        })
        .catch(function (error) {
          _this.$message.error(error)
        })
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 200px;
  line-height: 200px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 200px;
  display: block;
}
</style>