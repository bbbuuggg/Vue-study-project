<template>
  <el-form ref="changePasswordForm" :model="passwordForm" :rules="passwordRules" label-width="120px">
    <!-- 账号输入框 -->
    <el-form-item label="账号" prop="account">
      <el-input v-model="passwordForm.account" autocomplete="off" />
    </el-form-item>

    <!-- 当前密码输入框 -->
    <el-form-item label="当前密码" prop="password">
      <el-input v-model="passwordForm.password" type="password" autocomplete="off" />
    </el-form-item>

    <!-- 新密码输入框 -->
    <el-form-item label="新密码" prop="new_password">
      <el-input v-model="passwordForm.new_password" type="password" autocomplete="off" />
    </el-form-item>

    <!-- 确认新密码输入框 -->
    <el-form-item label="确认密码" prop="confirmPassword">
      <el-input v-model="passwordForm.confirmPassword" type="password" autocomplete="off" />
    </el-form-item>

    <!-- 提交按钮 -->
    <el-button type="primary" @click="handleChangePassword">确认修改</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      passwordForm: {
        account: '', // 存储账号
        password: '', // 当前密码
        new_password: '', // 新密码
        confirmPassword: '' // 确认新密码
      },
      passwordRules: {
        account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入当前密码', trigger: 'blur' }],
        new_password: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, message: '新密码至少需要6个字符', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请确认新密码', trigger: 'blur' },
          { validator: this.validateConfirmPassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    validateConfirmPassword(rule, value, callback) {
      if (value !== this.passwordForm.new_password) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    },
    handleChangePassword() {
      this.$refs.changePasswordForm.validate(valid => {
        if (valid) {
          // 模拟 POST 请求，提交数据
          this.$axios.post('/user/change-password', {
            account: this.passwordForm.account,
            password: this.passwordForm.password,
            new_password: this.passwordForm.new_password
          }).then(() => {
            this.$message.success('密码修改成功')
            // 重置表单
            this.passwordForm.account = ''
            this.passwordForm.password = ''
            this.passwordForm.new_password = ''
            this.passwordForm.confirmPassword = ''
          }).catch(error => {
            this.$message.error('密码修改失败: ' + error.message)
          })
        }
      })
    }
    // 与后端交互用这个
    // async handleSubmit() {
    //   try {
    //     const response = await axios.post('/user/modify', this.form)
    //     this.$message.success('密码修改成功')
    //     // 这里可以添加其他逻辑，比如清空表单或其他操作
    //   } catch (error) {
    //     this.$message.error('密码修改失败: ' + error.response.data.message)
    //   }
    // }
  }
}
</script>
