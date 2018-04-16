<template>
  <el-container>
    <!-- <el-aside width="200px">Aside</el-aside> -->
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="手机号码" prop="mobile" :rules="[
      { required: true, message: '手机号码不能为空'},
      { type: 'number', message: '手机号码必须为数字值'}
    ]">
            <el-input type="mobile" v-model.number="numberValidateForm.mobile" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="age" v-model.number="numberValidateForm.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('numberValidateForm')">注册</el-button>
            <el-button @click="resetForm('numberValidateForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
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
    this.utils.setTitle('注册页面')
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
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
