export function style(styles) {
    return styles.reduce((acc, style) => acc + (style.disabled ? '' : style.className) + ' ', '');
}

export function allStyles(styles) {
    return styles.join(' ');
}
