import { defineConfig } from 'vite';
import { resolve } from 'path'; 
// https://vitejs.dev/config/
export default defineConfig({
  root: 'src',
  base: '/QQ-invitation/',
  build: {
    // 输出路径将相对于项目根目录（现在是 'src' 的上一级）
    // 所以我们需要使用 '../dist' 来确保它在项目根目录下创建 dist
    outDir: resolve(__dirname, 'dist'),
    // 在清空目录时避免意外删除 'src' 之外的文件
    emptyOutDir: true, 
  },
});
