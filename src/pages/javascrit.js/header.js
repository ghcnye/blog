// header.js 文件

const userBox = document.querySelector('h2.username');
userBox.addEventListener('click', (e) => {
  const a = document.createElement('a');
  a.href = '/'
  a.click()
});