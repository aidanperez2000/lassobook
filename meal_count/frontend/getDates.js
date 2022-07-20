export default function getDates(start, end) {
  for(var arr=[],dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
      arr.push(new Date(dt).toISOString().slice(0,10));
  }
  return arr;
}
