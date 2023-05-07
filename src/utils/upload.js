// class Upload {
//   constructor () {
//     this.file = file
//   }

//   async upload () {
//     const oss = await getOssInfo()
//     if (oss?.data?.success) {
//       const { result } = oss.data
//       const response = await picUpload()
//       if (/Location/gi.test(response.data)) {
//       }
//     }
//   }
// }

// export function getOssInfo () {
//   return axios.get < ResponseRecord < OssInfo >> (
//     'https://new2.h5no1.com/dBCURD/api/utils/tools/oss_token2'
//   )
// }

// export function picUpload (file, ossInfo) {
//   // 图片通过表单方式上传，所以要声明一个表单对象
//   const ossData = new FormData()
//   ossData.append('name', file.name)
//   // key就代表文件层级和阿里云上的文件名
//   ossData.append('key', ossInfo.key)
//   ossData.append('policy', ossInfo.policy.policy)
//   ossData.append('OSSAccessKeyId', ossInfo.policy.accessid)
//   // 阿里云正常返回204，然后返回信息是空的，想看到返回信息强制让它返回201，返回一个xml文件可以提取有用的信息
//   ossData.append('success_action_status', '201')
//   ossData.append('signature', ossInfo.policy.signature)
//   ossData.append('file', file, file.name)
//   return axios.post(ossInfo.endpoint, ossData, {
//     headers: { 'Content-Type': 'multipart/form-data; boundary={boundary}' }
//   })
// }
