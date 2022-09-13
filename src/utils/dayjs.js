// 默认语言是英语
import dayjs from 'dayjs'
const relativeTime = require('dayjs/plugin/relativeTime')

dayjs.extend(relativeTime)
// 您可以按需加载其他本地化语言配置
require('dayjs/locale/zh-cn')
dayjs.locale('zh-cn') // 全局使用简体中文s
export default dayjs
