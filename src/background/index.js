console.log('background is running')

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.type === 'GET_CURRENT_URL') {
//     console.log(`background has received a message from popup ${request.type}`)
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//       const activeTab = tabs[0]
//       if (activeTab && activeTab.url) {
//         console.log('当前网页地址:', activeTab.url)
//         sendResponse({
//           type: 'GET_CURRENT_URL',
//           data: activeTab.url,
//         })
//       } else {
//         console.log('当前网页地址:', '未获取到')
//         sendResponse({
//           type: 'GET_CURRENT_URL',
//           data: null,
//           error: '无法获取当前活动标签页的url',
//         })
//       }
//     })
//   }
// })
