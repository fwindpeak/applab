<template>
  <div v-if="loaded">
    <van-card
      v-for="item of applabList"
      :key="item.apps_id"
      :desc="item.created"
      :title="item.name"
      :thumb-link="item.oculus_url"
      :thumb="item.image_url"
    >
      <template #tags>
        <van-tag plain type="danger">{{ item.license }}</van-tag>
      </template>
    </van-card>
  </div>
  <div v-else>
    <van-skeleton v-for="index of 6" :key="index" title avatar :row="3" />
  </div>
</template>

<script lang="ts">
import { fetchApplabList } from '../apis/index'
import { ref, onMounted, computed } from 'vue'

interface SideQuestApplabItem {
  apps_id: number
  users_id: string
  name: string
  summary: string
  description: string
  app_banner: string
  image_url: string
  app_categories_id: string
  website: string
  supports_go: boolean
  supports_quest: boolean
  supports_link: boolean
  supports_other: boolean
  is_webxr: boolean
  early_access: boolean
  created: string
  updated: string
  license: string
  downloads: string
  sort_rating: string
  number_of_rating: string
  num_reviews: string
  is_app_lab: boolean
  oculus_url: string
  external_listing_url: string
  hot_sort_rating: number
}

export default {
  props: {
    keywords: {
      type: String,
      default: ''
    },
    dataType: {
      type: String,
      default: ''
    },
    orderType: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const applabListAll = ref<SideQuestApplabItem[]>([])
    const loaded = ref<boolean>(false)
    onMounted(async () => {
      applabListAll.value = (await fetchApplabList()).data
      loaded.value = true
    })

    const applabList = computed(() => {
      console.log('props.dataType', props.dataType)
      return applabListAll.value
        .filter((item) => {
          const name = item.name.toLowerCase()
          return name.indexOf(props.keywords.toLowerCase()) !== -1
        })
        .filter((item) => {
          return !props.dataType || item.license === props.dataType
        })
        .sort((a, b) => {
          if (props.orderType === 'name') {
            const nameA = a.name.toLowerCase()
            const nameB = b.name.toLowerCase()
            return nameA < nameB ? -1 : 1
          } else if (props.orderType === 'releaseData') {
            const releaseDataA = a.created
            const releaseDataB = b.created
            return releaseDataA > releaseDataB ? -1 : 1
          }
          return 0
        })
    })
    return {
      loaded,
      applabList
    }
  }
}
</script>

<style></style>
