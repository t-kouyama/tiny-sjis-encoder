((g,f)=>{typeof module=='object'?module.exports=f():typeof define=='function'&&define.amd?define([],f):g.sjis=f();typeof exports=='object'&&(exports.default=exports.sjis=f());})(typeof self!='undefined'?self:this,()=>{
    let TABLE;
    const decoder = new TextDecoder('ms932');

    function sjis(str) {
        if (TABLE === undefined) {
            TABLE = new Uint16Array(0x10000);

            const a1 = new Uint8Array(1);
            const a2 = new Uint8Array(2);

            for (const [s, e] of [[0x00, 0x7F], [0xA1, 0xDF]]) {
                for (let i = s; i <= e; i++) {
                    try {
                        a1[0] = i;
                        TABLE[decoder.decode(a1).charCodeAt(0)] = i;
                    } catch (e) { }
                }
            }

            for (const [s1, e1] of [[0x81, 0x9F], [0xE0, 0xFC]]) {
                for (let i = s1; i <= e1; i++) {
                    a2[0] = i;
                    for (const [s2, e2] of [[0x40, 0x7E], [0x80, 0xFC]]) {
                        for (let j = s2; j <= e2; j++) {
                            a2[1] = j;
                            try {
                                TABLE[decoder.decode(a2).charCodeAt(0)] = (i << 8) | j;
                            } catch (e) { }
                        }
                    }
                }
            }
        }

        const len = str.length;
        const res = new Uint8Array(len * 2);
        let pos = 0;

        for (let i = 0; i < len; i++) {
            const code = TABLE[str.charCodeAt(i)] || 0x3F;

            if (code > 0xFF) {
                res[pos++] = code >> 8;
                res[pos++] = code & 0xFF;
            } else {
                res[pos++] = code;
            }
        }

        return res.subarray(0, pos);
    }

    return sjis;
});