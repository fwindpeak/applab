<template>
  <div>
    <div>
      <h1 class="title">Oculus Applab</h1>
    </div>
    <div ref="listDom" class="list-view">
      <scroll-top v-show="showScrollToTop"></scroll-top>
      <van-search v-model="keywords" placeholder="Type to search" />
      <van-sticky @scroll="onScroll">
        <van-dropdown-menu active-color="#1989fa">
          <van-dropdown-item
            v-model="dataType"
            :options="dataTypeList"
            @change="onDataTypeChanged"
          />
          <van-dropdown-item v-model="orderType" :options="orderTypeList" />
        </van-dropdown-menu>
      </van-sticky>
      <Applab
        :keywords="keywords"
        :dataType="dataType"
        :orderType="orderType"
      ></Applab>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, computed } from 'vue'
import Applab from './components/Applab.vue'
import ScrollTop from './components/ScrollTop.vue'
export default defineComponent({
  name: 'App',
  components: {
    Applab,
    ScrollTop
  },
  data() {
    return {
      showScrollToTop: false,
      dataLoaded: false,
      allData: [],
      filterType: [],
      keywords: '',
      isFree: false,
      isDiscount: false,
      offsetIndex: 0,
      pageItems: 20,
      finished: false,
      orderType: 'releaseData',
      dataTypeList: [
        { text: 'All', value: 'all' },
        { text: 'Free', value: 'free' },
        { text: 'Paid', value: 'paid' },
        { text: 'Discount', value: 'discount' }
      ]
    }
  },
  setup() {
    const dataType = ref<string>('all')
    const orderTypeListAll = [
      { text: 'ReleaseData', value: 'releaseData' },
      { text: 'Name', value: 'name' },
      { text: 'Price', value: 'price' }
    ]
    const orderTypeList = computed(() => {
      if (dataType.value === 'free') {
        return orderTypeListAll.filter(
          (v) => !['price', 'endTime'].includes(v.value)
        )
      } else if (dataType.value === 'discount') {
        return orderTypeListAll
      } else {
        return orderTypeListAll.filter((v) => !['endTime'].includes(v.value))
      }
    })
    onMounted(() => {
      // this.$refs.listDom.addEventListener('scroll', (e) => {}, false)
    })
    const onDataTypeChanged = () => {}
    return {
      onDataTypeChanged,
      orderTypeList,
      dataType
    }
  },
  computed: {},
  methods: {
    onScroll(data: { isFixed: boolean }) {
      this.showScrollToTop = data.isFixed
    }
  }
})
</script>

<style scoped>
.title {
  text-align: center;
}
.list-view {
  height: 500px;
}
</style>
