// 本地存储封装模板
export const getItem = name => {
  const data = window.localStorage.getItem(name)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}
export const setItem = (name, value) => {
  // 如果value是对象，就把value转为json格式字符串存储
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}
export const removeItem = name => {
  window.localStorage.removeItem(name)
}
