<!-- 
<template>
    <div class="outbox">
        <swiper :autoplay=true :modules="modules" @swiper="onSwiper" @slideChange="onSlideChange" class="inbox" :loop="true"
            :space-between="50">
            <swiper-slide><img style="margin: 0 auto;" src="@/static/Swiperimg/1.jpg" /></swiper-slide>
            <swiper-slide><img style="margin: 0 auto;" src="@/static/Swiperimg/2.jpg" /></swiper-slide>
            <swiper-slide><img style="margin: 0 auto;" src="@/static/Swiperimg/3.jpg" /></swiper-slide>
            <swiper-slide><img style="margin: 0 auto;" src="@/static/Swiperimg/4.jpg" /></swiper-slide>
            <swiper-slide><img style="margin: 0 auto;" src="@/static/Swiperimg/5.jpg" /></swiper-slide>
        </swiper>
    </div>
</template>
<script lang="ts">
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
// Import Swiper styles
export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    setup() {
        const onSwiper = (swiper: object) => {
            //循环模式选项

            //自动滚动

            console.log(swiper);
        };
        const onSlideChange = () => {
            console.log('slide change');
        };
        return {
            onSwiper,
            onSlideChange,
            modules: [Navigation, Pagination, Scrollbar, A11y],
        };
    },
    methods: {
        swiperNext() {

        },
        swiperPrev() {
        },
    }
};
</script>
<style scoped>
.outbox {
    display: flex;
    width: 1080px;
    height: 520px;
    margin: 0 auto;
    justify-content: center;
    background-color: transparent;
}

.inbox {
    background-color: transparent;
    border-radius: 25px;
}

.inbox img {
    width: 1080px;
    height: 520px;
}
</style>
   -->

<template>
    <div class="auto-carousel">
        <swiper :modules="modules" :space-between="30" :centeredSlides="true" :autoplay="{
            delay: 1500,
            disableOnInteraction: false,
        }" :pagination="{
    clickable: true,
}" :navigation="true" @slideChange="handleSlideChange">
            <swiper-slide v-for="(item, index) in carouselData" :key="index">
                <a :href="item.link">
                    <img :src="item.imageUrl" :alt="item.title" />
                </a>
            </swiper-slide>
        </swiper>
    </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const modules = [Autoplay, Pagination, Navigation];

interface CarouselItem {
    imageUrl: string;
    title: string;
    link: string;
}

const props = defineProps<{
    carouselData: CarouselItem[];
}>();

const currentIndex = ref(0);
let autoplayInterval: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
    startAutoplay();
});

onUnmounted(() => {
    stopAutoplay();
});

const startAutoplay = () => {
    autoplayInterval = setInterval(() => {
        currentIndex.value = (currentIndex.value + 1) % props.carouselData.length;
    }, 1500);
};

const stopAutoplay = () => {
    if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
    }
};

const handleSlideChange = (swiper: any) => {
    currentIndex.value = swiper.activeIndex;
};
</script>
  
<style scoped>
.auto-carousel {
    width: 100%;
    height: 400px;
    position: relative;
}

.auto-carousel img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>