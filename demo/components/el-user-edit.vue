<template>
    <el-dialog :visible.sync='show'
        title="user edit">
        this is user edit
        <el-form>
            <el-form-item label='用户名称'>
                <el-input></el-input>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
  }
}
</script>

