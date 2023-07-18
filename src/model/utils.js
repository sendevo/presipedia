const hsv2rgb = (h,s,v) => {                              
  let f = (n,k = (n+h/60)%6) => v - v*s*Math.max( Math.min(k,4-k,1), 0);     
  return [f(5)*255,f(3)*255,f(1)*255];
};  

export const colorMapGenerator = number => {
    const colors = [];
    const step = 0.8/number;
    for(let i = 0.9; i > 0.1; i -= step){
        const [r, g, b] = hsv2rgb(240, i, 0.9);
        colors.push(`rgba(${r},${g},${b},0.7)`);
    }
    return colors;
};
