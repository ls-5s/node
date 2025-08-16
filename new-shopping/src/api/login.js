// 所以登录相关的接口
import request from '@/utils/request'
// 1. 获取图形验证
export const getPicCode = () => {
  return request.get('/captcha/image')
}
// 2. 获取短信验证码

export const getMsgCode = (captchaCode, captchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: {
      captchaCode,
      captchaKey,
      mobile
    }
  })
}

// 验证码登录
export const codeLogin = (mobile, smsCode) => {
  return request.post('/passport/login', {
    form: {
      isParty: false,
      mobile,
      partyData: {},
      smsCode
    }
  })
}
