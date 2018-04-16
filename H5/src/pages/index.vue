<template>
  <el-container>
    首页
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      numberValidateForm: {
        mobile: '',
        password: ''
      }
    }
  },
  created () {
    this.utils.setTitle('首页')
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            mobile: this.numberValidateForm.mobile,
            password: this.numberValidateForm.password
          }
          this.apis.register(data).then((res) => {
            alert('注册成功')
            // this.$router.replace('/demo/uploadImg')
          }).catch(this.apis.rejectHander.bind(this))
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css">

</style>
