function i(n,o){const c=n.map(t=>t.title).join(";")+`
`+o.map(t=>n.map(d=>t[d.dataIndex]).join(";")).join(`
`),a=new Blob([c],{type:"text/csv"}),e=document.createElement("a");e.href=URL.createObjectURL(a),e.download="export.csv",document.body.appendChild(e),e.click(),document.body.removeChild(e)}export{i as e};
