# Usage

<pre><code>node app.js F:/movie
</code></pre>
暂时无法直接扫描根目录，待解决。

# Option

1. **app.js 63 行**
  <pre><code>var w_file = 'E:/list.html';
  </code></pre>
  扫描完成后生成文件的路径、文件名。

2. **app.js 64 行**
  <pre><code>var fileTypes = 'bmp,gif,jpg,png';
  </code></pre>
  配置需要扫描的文件扩展名。
