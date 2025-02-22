# tiny-sjis-encoder

Tiny Shift-JIS(MS932) encoder - Only 806 bytes

## Installation

```bash
npm install tiny-sjis-encoder
```

## Usage

Browser
```html
<script src="https://cdn.jsdelivr.net/npm/tiny-sjis-encoder"></script>
```

ES Modules
```javascript
import sjis from 'tiny-sjis-encoder';
```

CommonJS
```javascript
const sjis = require('tiny-sjis-encoder');
```

Encode string to Shift-JIS byte array
```javascript
const bytes = sjis('Hello 世界');
console.log(bytes); // Uint8Array(10) [72, 101, 108, 108, 111, 32, 144, 162, 138, 91]
```

## Benchmark

Comparison with iconv-lite (operations per second)

| chars | tiny-sjis-encoder | iconv-lite | faster |
|------:|------------------:|-----------:|-------:|
|    30 |         1,491,271 |    789,446 |  1.89x |
|   300 |           471,622 |    222,128 |  2.12x |
|  3000 |            61,771 |     24,708 |  2.50x |

About 2x faster than iconv-lite.

First call needs a few ms to init. After that, very fast.

## Decoder?

```javascript
const text = new TextDecoder('shift-jis').decode(bytes);
console.log(text); // "Hello 世界"
```

## License

MIT
