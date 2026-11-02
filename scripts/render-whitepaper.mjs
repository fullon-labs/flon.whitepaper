import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {createRequire} from 'node:module';

const require=createRequire(import.meta.url);
const {chromium}=require('playwright');
const {marked}=await import(pathToFileURL(require.resolve('marked')));

const [input,output,title,lang='en']=process.argv.slice(2);
if(!input||!output||!title)throw new Error('usage: render_whitepaper input output title [lang]');
let source=await fs.readFile(input,'utf8');
const assetPattern=/(["']?)(\.\/assets\/[^\s"'<>]+)(["']?)/g;
const assetMatches=[...source.matchAll(assetPattern)];
for(const match of assetMatches){
  const assetPath=path.resolve(path.dirname(input),match[2]);
  const ext=path.extname(assetPath).slice(1).toLowerCase();
  const mime=ext==='svg'?'image/svg+xml':ext==='jpg'||ext==='jpeg'?'image/jpeg':`image/${ext}`;
  const data=await fs.readFile(assetPath);
  source=source.replaceAll(match[2],`data:${mime};base64,${data.toString('base64')}`);
}
const body=marked.parse(source,{gfm:true});
const base=pathToFileURL(`${path.dirname(path.resolve(input))}/`).href;
const css=`
@page{size:A4;margin:17mm 17mm 18mm}
*{box-sizing:border-box}html{font-size:10.4pt}body{margin:0;color:#17233d;font-family:${lang==='zh'?'"PingFang TC","PingFang SC","Noto Sans CJK TC"':'Inter,Arial'},sans-serif;line-height:1.56}
h1,h2,h3,h4{color:#163668;line-height:1.18;break-after:avoid-page}h1{font-size:27pt;text-align:center;margin:24mm 0 7mm}h2{font-size:18pt;margin:10mm 0 4mm;border-bottom:1px solid #d9e3f3;padding-bottom:2mm}h3{font-size:14pt;margin:7mm 0 3mm}h4{font-size:11.5pt;margin:5mm 0 2mm}
p{margin:0 0 3.2mm;text-align:left;orphans:3;widows:3}strong{color:#142f5b}em{font-weight:600}a{color:#075dcc;text-decoration:none}ul,ol{margin:2mm 0 4mm;padding-left:7mm}li{margin:1.2mm 0}code{font-family:"SFMono-Regular",Consolas,monospace;background:#eef3fb;border-radius:3px;padding:.2em .35em}pre{white-space:pre-wrap;break-inside:avoid;background:#f1f5fb;border-left:3px solid #3975d2;padding:4mm;font-size:9pt}pre code{background:none;padding:0}
table{width:100%;border-collapse:collapse;margin:4mm 0 6mm;font-size:8.8pt;break-inside:avoid}thead{display:table-header-group}th{background:#173a70;color:white;text-align:left}th strong{color:inherit}th,td{border:1px solid #cdd9ea;padding:2.2mm;vertical-align:top}tbody tr:nth-child(even){background:#f4f7fb}
img{max-width:100%;height:auto;display:block;margin:5mm auto;break-inside:avoid}blockquote{margin:4mm 0;padding:3mm 5mm;background:#f5f7fb;border-left:3px solid #5d86c9;color:#42516c}
body>h1:first-child{font-size:31pt;margin-top:27mm;margin-bottom:6mm}body>h1:first-child+strong,body>h1:first-child+em{display:block;text-align:center}body>pre:first-of-type{margin-top:6mm}
hr{border:0;border-top:1px solid #dce4f0;margin:7mm 0}.page-break{break-before:page}
`;
const html=`<!doctype html><html lang="${lang==='zh'?'zh-Hant':'en'}"><head><meta charset="utf-8"><base href="${base}"><title>${title}</title><style>${css}</style></head><body>${body}</body></html>`;
const browser=await chromium.launch({...(process.env.CHROME_BIN?{executablePath:process.env.CHROME_BIN}:{channel:'chrome'}),headless:true});
const page=await browser.newPage();
await page.setContent(html,{waitUntil:'domcontentloaded', timeout:30000});
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(750);
await page.pdf({path:output,format:'A4',printBackground:true,displayHeaderFooter:true,headerTemplate:'<span></span>',footerTemplate:'<div style="font-size:8px;color:#68758b;width:100%;text-align:center"><span class="pageNumber"></span> / <span class="totalPages"></span></div>',margin:{top:'17mm',right:'17mm',bottom:'18mm',left:'17mm'}});
await browser.close();
