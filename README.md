# 芙眠眠手记

芙眠眠 nemu 的直播一周年手记，收录周年海报、人物简介和北京时间的周年倒计时。访客可以在浏览器里写一张周年花笺，选好信纸颜色，把祝福保存成 PNG。

- [纪念海报](https://blog.芙眠眠nemu.space/)
- [一周年纪念页](https://1-year.芙眠眠nemu.space/)

## 本地预览与发布

页面、样式、图片和字体都在 `public/`。在项目根目录运行 `npx wrangler dev` 即可预览。要发布到 Cloudflare，在拥有目标区域和 Worker 管理权限的账户下运行 `npx wrangler deploy`。自定义域名在 `wrangler.jsonc` 中使用国际化域名对应的 ASCII 写法。

## 许可与素材

网页代码以 [MIT 许可证](LICENSE) 开源。芙眠眠的角色形象及周年插画的权利由各自权利人保留。

周年花束插画由 ImageGen 为本页生成。标题字体使用 Noto Serif SC 的子集，依 [SIL Open Font License 1.1](public/fonts/OFL.txt) 分发。
