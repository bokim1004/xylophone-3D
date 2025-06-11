export function getKeyLength(index:number,total:number){
  const center = Math.floor(total/2);
  const diff = Math.abs(index-center)
  return 5 + (1 - diff * 0.7); 
}