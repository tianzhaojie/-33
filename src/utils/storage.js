// 封装本地存储模块

// 存储数据
export const setItem = (key, value) => {
  // 判断是否为数组或者对象
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

// 获取数据
export const getItem = (key) => {
  const data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

// 删除数据
export const removeItem = (key) => {
  window.localStorage.removeItem(key)
}
