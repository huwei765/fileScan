# Usage

<pre><code>node app.js F:/movie
</code></pre>

# Options

1.  **app.js 63 行**
    <pre><code>var listFile = 'E:/list.html';
    </code></pre>
    扫描完成后生成文件的路径、文件名。

2.  **app.js 64 行**
    <pre><code>var fileTypes = 'bmp,gif,jpg,png';
    </code></pre>
    配置需要扫描的文件扩展名。

3.  **app.js 84 行**
    <pre><code>fs.writeFile(listFile, listFileContent, function(e) {
    </code></pre>
    修改 **fs.writeFile** 为 **fs.appendFile** 可连续扫描多个目录，结果均写入 **list.html**。
