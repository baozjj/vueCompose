import { defineConfig } from 'vitepress'

const Element = [
  { text: 'useDraggable', link: '/components/useDraggable/useDraggable.md' },
]

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "vue compose",
  description: "A VitePress Site",
  themeConfig: {
    nav: [
      { text: '快速入门', link: '/' },
      { text: 'API 示例', link: '/components/useDraggable/useDraggable.md' }
    ],

    sidebar: [  
      { text: '元素', items: Element }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/baozjj/vueCompose' }
    ]
  },
  appearance: true,

})
