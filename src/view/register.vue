<template>
    <div class="register">
        <div class="register-form">
            <a-card title="注册" style="width: 400px;">
                <a-form :model="formData" :rules="rules" ref="formRef">
                    <a-form-item label="用户名" name="username">
                        <a-input v-model:value="formData.username" />
                    </a-form-item>
                    <a-form-item label="密码" name="password">
                        <a-input-password v-model:value="formData.password" />
                    </a-form-item>
                    <a-form-item label="确认密码" name="confirmPassword">
                        <a-input-password v-model:value="formData.confirmPassword" />
                    </a-form-item>
                    <a-form-item>
                        <a-button type="primary" @click="onSubmit" style="text-align: center;">注册</a-button>
                    </a-form-item>
                </a-form>
            </a-card>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormInstance } from 'ant-design-vue';
import { message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const formRef = ref<FormInstance>();
const formData = reactive({
    username: '',
    password: '',
    confirmPassword: '',
});
// 密码规则
const rules = {
    username: [
        { required: true, message: '请输入用户名' },
    ],
    password: [
        { required: true, message: '请输入密码' },
    ],
    confirmPassword: [
        { required: true, message: '请再次输入密码' },
        ({ getFieldValue }: { getFieldValue: (fieldName: string) => any }) => ({
            validator(_: any, value: any) {
                if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                }
                return Promise.reject(new Error('两次输入的密码不一致'));
            },
        }),
    ],
};
const onSubmit = () => {
    formRef.value?.validateFields().then((values) => {
        // 这里可以进行注册逻辑，比如发送请求到后端
        message.success('注册成功');
    }).catch((errorInfo) => {
        console.log('Validate Failed:', errorInfo);
    });
    router.push('/login')
};
</script>
  
<style scoped>
/* 可以添加一些自定义样式 */
    .register {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 50px;
        /* height: 100vh; */
        background-color: #f0f2f5;
    }
    .register-form {
        width: 100%;
        max-width: 400px;
        margin: 0 auto;
    }
</style>