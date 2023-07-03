i = require('./orm'),
sample1 = _=>{
    return i.join({
    tables:{
        cols:['a','b'],
        'name':'tableA',
        'leftjoin':[
            {
                'cols':[],
                'name':'tableB',
                'glue':[{'parent':'id','child':'id'}]
            }
        ]
    }
})}
sample2 = _=>{
    return i.join({
    tables:{
        'cols':['c'],
        'name':'tableA',
        'leftjoin':[
            {
                'cols':['a','b'],
                'name':'tableB',
                'glue':[{'parent':'id','child':'id'}]
            },
            {
                'cols':['a','b'],
                'name':'tableC',
                'glue':[{'parent':'id','child':'id'}]
            }
        ]
    }
})}
sample3 = _=>{
    return i.join({
    tables:{
        'cols':['kdticket','clientname'],
        'name':'tickets',
        'leftjoin':[
            {
                'cols':['createdate','conclusion'],
                'name':'ticket_followups',
                'glue':[{'parent':'id','child':'id'}]
            },
            {
                'cols':['name','address'],
                'name':'clients',
                'glue':[{'parent':'id','child':'id'}]
            },
            {
                'cols':['username','email'],
                'name':'users',
                'glue':[{'parent':'id','child':'id'}]
            }
        ],
        conditions:[
            {key:'kdticket',val:'21885'}
        ]
    }
})}
showQuery = num => {
    switch(num){
        case "1":return sample1();break;
        case "2":return sample2();break;
        case "3":return sample3();break;
    }
}
module.exports = {
    sample1:sample1,
    sample2:sample2,
    sample3:sample3,
    showQuery:showQuery
}