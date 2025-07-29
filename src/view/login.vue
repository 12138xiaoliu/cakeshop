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
                    <a @click="toRegister">点击注册</a>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { reactive, computed , onMounted } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { nanoid } from 'nanoid';
import { useRouter } from 'vue-router';
import axios from 'axios'
onMounted(() => {
  console.log(`挂载钩子，页面重定向到注册页面`)
})
const Router = useRouter()
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
    console.log('表单提交成功事件触发,提交信息为：', values);// 这里可以获取到表单的值
    if (values.remember) {
        let id = nanoid()
        localStorage.setItem(id, JSON.stringify({ username: values.username, password: values.password }))
    } else {
        console.log("不记住密码")
        localStorage.clear()
    }
    axios.post('http://localhost:8899/login', {
        username: values.username,
        password: values.password
    })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.error(error);
        });

    axios.get('http://localhost:8899/test')
        .then(function (response) {
            // 处理成功的响应
            console.log(response);
        })
        .catch(function (error) {
            // 处理错误的响应
            console.log(error);
        });
    Router.push('/home')
};
function toRegister() {
    Router.push('/register')
}
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
    background-color: transparent; /* 关键修改：透明背景 */
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
    background-color: rgba(57, 99, 134, 0.5); /* 半透明 */
}

.right {
    position: relative;
    width: 50%;
    height: 100%;
    background-color: rgba(240, 247, 194, 0.5); /* 半透明 */
}

/* 以下样式保持不变 */
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
    margin: 10px;
}

.left p {
    font-size: 14px;
    color: #060605;
}

.right form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    text-align: center;
}

/* ... 其他原有样式 ... */
</style>
