<template>
  <div class="qrcode">
    <n-tabs type="segment" animated>
      <n-tab-pane name="chap1" tab="二维码生成">
        <div class="search-bar">
          <n-input
            :style="{ width: '76%' }"
            size="small"
            v-model:value="inputText"
            placeholder="请输入内容"
          />
          <n-button size="small" type="primary" ghost @click="handleGenerate">
            生成
          </n-button>
        </div>
        <div v-if="url" class="qrcode-img">
          <n-qr-code id="qr-code" :value="url" :color="color" />
          <div class="qrcode-edit">
            <div class="qrcode-edit-item">
              <label>颜色：</label>
              <n-color-picker v-model:value="color" />
            </div>
            <div class="qrcode-edit-item">
              <label>保存：</label>
              <n-button
                size="small"
                type="primary"
                @click="handleDownloadQRCode"
              >
                点击下载
              </n-button>
            </div>
          </div>
        </div>
      </n-tab-pane>
      <n-tab-pane name="chap2" tab="二维码解码">
        <div class="upload-area">
          <n-upload
            ref="uploadQRCode"
            accept="image/*"
            :max="1"
            :on-change="handleFileChange"
          >
            <n-button>上传二维码图片</n-button>
          </n-upload>
        </div>
        <div v-if="decodedText" class="decoded-text">
          解析结果：{{ decodedText }}
        </div>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>
<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import {
  NTabs,
  NTabPane,
  NInput,
  NButton,
  NQrCode,
  NColorPicker,
  NUpload,
} from 'naive-ui'
import jsQR from 'jsqr'

const inputText = ref('')
const url = ref('')
const color = ref('#000000')

const handleGenerate = () => {
  url.value = inputText.value
}

const init = () => {
  console.log('qrcode init')
  if (!chrome || !chrome.tabs) return
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0]
    if (activeTab && activeTab.url) {
      console.log('当前网页地址:', activeTab.url)
      if (!inputText.value) {
        inputText.value = activeTab.url
        handleGenerate()
      }
    }
  })
}

const handleDownloadQRCode = () => {
  const canvas = document.querySelector('#qr-code')?.querySelector('canvas')
  if (canvas) {
    const url = canvas.toDataURL()
    const a = document.createElement('a')
    a.download = 'QRCode.png'
    a.href = url
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }
}

const uploadQRCode = ref(null)
const decodedText = ref('')
const handleFileChange = (options) => {
  const { file } = options.file
  const reader = new FileReader()
  reader.onload = (e) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const code = jsQR(imageData.data, imageData.width, imageData.height)
      if (code) {
        decodedText.value = code.data
      } else {
        decodedText.value = '解析二维码失败'
      }
      uploadQRCode.value.clear()
    }
    img.src = e.target.result
  }
  reader.readAsDataURL(file)
}

onMounted(() => {
  console.log('popup onMounted')
  init()
})

onUnmounted(() => {
  console.log('popup onUnmounted')
})
</script>
<style lang="scss" scoped>
.qrcode {
  :deep(.n-tabs-rail) {
    background-color: #999;
  }
  .search-bar {
    margin-top: 10px;
  }
  &-img {
    display: flex;
  }
  &-edit {
    &-item {
      margin-top: 10px;
      width: 150px;
      display: flex;
      align-items: center;
      label {
        font-size: 12px;
        white-space: nowrap;
      }
    }
  }
  .upload-area {
    margin-top: 10px;
  }
}
</style>
<style>
.v-binder-follower-content {
  transform: translateX(460px) translateY(144px) translateX(-150%)
    translateY(-50%) !important;
}
</style>
