//设置 local
export function setStorage(params) {
  const { key, val } = params;
  if (typeof val === "string") {
    localStorage.setItem(key, val);
  } else {
    localStorage.setItem(key, JSON.stringify(val));
  }
}
// 更新表
export function updataStorage(params) {
  const { froms, val, id } = params;
  const res = getStorage(froms);
  if (res) {
    // 有id的更新对应id的内容
    if (id) {
      const idIndex = res.findIndex((item) => item.id === id);
      if (idIndex > -1) {
        res[idIndex] = val;
      } else {
        res.push(val);
      }
    } else {
      res.push(val);
    }
  }
  setStorage({
    key: froms,
    val: res || [val],
  });
}
// 获取 local
export function getStorage(key, callBack) {
  try {
    const res = localStorage.getItem(key);
    if (res) {
      return JSON.parse(res);
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    if (callBack) {
      callBack(err);
    }
  }
}
// 删除
export function clearStorage(key) {
  localStorage.clear(key);
}
