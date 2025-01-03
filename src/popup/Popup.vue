<template>
  <div class="popup-container">
    <n-card title="🛠️ 开发工具箱">
      <n-tabs type="line" placement="left" class="popup-tabs">
        <n-tab-pane name="welcome" tab="介绍">
          <div class="intro">
            <h3>让开发更简单！</h3>
            <p>一键访问开发者常用工具，提升您的编码效率。</p>
            <p>如果有疑问，或者意见，请联系作者。</p>
            <p>
              邮箱地址：<a
                href="mailto:702158116@qq.com?subject=反馈&body=您好，我有一个问题..."
                >702158116@qq.com</a
              >
            </p>
            <p class="copyright">版权所有 © 2025 匡凡</p>
          </div>
        </n-tab-pane>
        <n-tab-pane name="qrcode" tab="二维码生成/解码">
          <qrcode></qrcode>
        </n-tab-pane>
        <n-tab-pane name="proxy" tab="接口请求代理"></n-tab-pane>
      </n-tabs>
    </n-card>
  </div>
</template>
<script setup>
import { NCard, NTabs, NTabPane } from 'naive-ui'
import qrcode from '../components/qrcode/Index.vue'
</script>
<style lang="scss" scoped>
.popup-container {
  width: 500px;
  height: 300px;
}
.popup-tabs {
  height: 210px;
}
.intro {
  h3 {
    margin: 0;
  }
  p {
    &.copyright {
      color: #999;
    }
  }
}
</style>
