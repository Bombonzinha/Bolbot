const random = require('../utils/random.js');
const { createCanvas } = require('canvas');

class Colour {
    constructor(){
        this.hex = this.randHex();
        this.rgb = this.hexToRgb(this.hex);
        this.hsl = this.hexToHsl(this.hex);
    }

    // RGB
    rgbToHex(r, g, b) {
        const toHex = (c) => {
            const hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        };
        return "#" + toHex(r) + toHex(g) + toHex(b);
    }

    rgbToHsl(r, g, b) {
        r /= 255, g /= 255, b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max == min) {
            h = s = 0; // achromatic
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return [h, s, l];
    }

    // HSL
    hslToRgb(h, s, l) {
        let r, g, b;

        if (s == 0) {
            r = g = b = l;
        } else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };

            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }

        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }

    hslToHex(h, s, l) {
        const [r, g, b] = this.hslToRgb(h, s, l);
        return this.rgbToHex(r, g, b);
    }

    // HEX
    hexToRgb(hex) {
        hex = hex.replace(/^#/, '');
        const bigint = parseInt(hex, 16);
        return [bigint >> 16 & 255, bigint >> 8 & 255, bigint & 255];
    }

    hexToHsl(hex) {
        const [r, g, b] = this.hexToRgb(hex);
        return this.rgbToHsl(r, g, b);
    }

    // Randoms
    randHex() {
        const color = Math.floor(Math.random() * 16777215).toString(16);
        return '#' + '0'.repeat(6 - color.length) + color;
    }
    
    randRGB() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    }
    
    randHSL() {
        const h = Math.floor(Math.random() * 360);
        const s = Math.floor(Math.random() * 101);
        const l = Math.floor(Math.random() * 101);
        return `hsl(${h}, ${s}%, ${l}%)`;
    }
    // Info
    info() {
        return `Hex: ${this.hex} -- RGB: ${this.rgb.join(', ')} -- HSL: ${this.hsl.join(', ')}`;
    }
    // Imagen
    image() {
        // Crear un lienzo de 100x100 píxeles
        const canvas = createCanvas(100, 100);
        const ctx = canvas.getContext('2d');

        // Rellenar el lienzo con el color
        ctx.fillStyle = this.hex;
        ctx.fillRect(0, 0, 100, 100);

        // Devolver la imagen como un buffer
        return canvas.toBuffer();
    }
}
module.exports = Colour;


