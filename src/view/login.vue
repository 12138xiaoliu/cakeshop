<template>
    <div class="Box">
        <div class="left">
            <div class="centerBox">
                <img src="../static/logo/logo.png" alt="">
                <p>只做好蛋糕</p>
            </div>
        </div>
        <div class="right">
            <a-form :model="formState" name="normal_login" class="login-form" @finish="onFinish"
                @finishFailed="onFinishFailed">
                <a-form-item label="Username" name="username" :rules="[{ required: true, message: '输入账号' }]">
                    <a-input v-model:value="formState.username">
                        <template #prefix>
                            <UserOutlined class="site-form-item-icon" />
                        </template>
                    </a-input>
                </a-form-item>

                <a-form-item label="Password" name="password" :rules="[{ required: true, message: '输入密码' }]">
                    <a-input-password v-model:value="formState.password">
                        <template #prefix>
                            <LockOutlined class="site-form-item-icon" />
                        </template>
                    </a-input-password>
                </a-form-item>

                <a-form-item>
                    <a-form-item name="remember" no-style>
                        <a-checkbox v-model:checked="formState.remember">记住密码</a-checkbox>
                    </a-form-item>
                    <a class="login-form-forgot" href="">忘记密码？</a>
                </a-form-item>

                <a-form-item>
                    <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button">
                        登录
                    </a-button>
                    还没有账号？
                    <a href="">点击注册</a>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { reactive, computed } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
interface FormState {
    username: string;
    password: string;
    remember: boolean;
}
const formState = reactive<FormState>({
    username: '',
    password: '',
    remember: true,
});
const onFinish = (values: any) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};
const disabled = computed(() => {
    return !(formState.username && formState.password);
});
</script>
<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.Box {
    background-color: aquamarine;
    background-size: cover;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 550px;
    height: 330px;
    display: flex;
}

.left {
    position: relative;
    width: 50%;
    height: 100%;
    background-color: rgba(57, 99, 134, 0.75);
}

.right {
    position: relative;
    width: 50%;
    height: 100%;
    background-color: rgb(240, 247, 194);
}

.right button {
    width: 150px;
    border-radius: 25px;
}

.centerBox {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    text-align: center;
}

.left img {
    width: 70%;
    margin-bottom: 5px;
}

.left p {
    font-size: 14px;
    color: #fff;
}

.left h4 {
    font-size: 18px;
    color: #fff;
    margin-bottom: 10px;
}

.right form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    text-align: center;
}

h3 {
    margin-bottom: 20px;
}

input {
    width: 100%;
    height: 30px;
    border: 1px solid #767676;
    background-color: transparent;
    font-size: 12px;
    color: #000000;
    margin-bottom: 15px;
    outline: none;
}

.loginBtn {
    width: 100%;
    height: 100%;
    line-height: 32px;
    text-align: center;
    font-size: 15px;
    color: #fff;
    border-radius: 3px;
    background: rgb(57, 99, 134);
    outline: none;
    border: none;
    margin-top: 10px;
}

.no {
    cursor: pointer;
    margin-top: 30px;
    text-align: center;
    font-size: 12px;
    color: #828282;
}
</style>
