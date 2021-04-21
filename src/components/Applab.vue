<template>
  <van-card
    v-for="item of applabList"
    :key="item.apps_id"
    :num="item.number_of_rating"
    :desc="item.created"
    :title="item.name"
    :thumb-link="item.oculus_url"
    :thumb="item.image_url"
  >
    <template #tags>
      <van-tag plain type="danger">{{ item.license }}</van-tag>
    </template>
    <!-- <template #footer>
      <van-button size="mini">按钮</van-button>
      <van-button size="mini">按钮</van-button>
    </template> -->
  </van-card>
</template>

<script lang="ts">
import { fetchApplabList } from '../apis/index'
import { ref, onMounted } from 'vue'

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
  setup() {
    let applabList = ref<SideQuestApplabItem[]>([])
    onMounted(async () => {
      applabList.value = (await fetchApplabList()).data
    })
    return {
      applabList
    }
  }
}
</script>

<style></style>
