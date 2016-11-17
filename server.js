var express=require('express');
var app=express();
var mongojs=require('mongojs');
var bodyParser=require('body-parser');

app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());

var products = [{
		id:'1',
		name:'Note Book',
		price:'30',
		stock:'10',
		packing:'10pc',
		description:'Classic note Book',
		status:true
	},
	{
		id:'2',
		name:'Text Book',
		price:'300',
		stock:'100',
		packing:'10pc',
		description:'English Text Book',
		status:true
	},
	{
		id:'3',
		name:'pen',
		price:'30',
		stock:'10',
		packing:'10pc',
		description:'Finegrip pen',
		status:true
	}
	];

app.post('/products/products',function(req,res){
	var product = req.body;
	product.id=products.length + 1;
	product.status = true;

	console.log("product>>",product);

	products.push(product);
	res.json(product);
});

app.put('/products/products/:id',function(req,res){
	var product_id = req.params.id;

	for(var i=0; i<products.length; i++){
     if(parseInt(products[i].id) === parseInt(product_id)){
         products[i] = req.body;
      }
   }
   res.json(req.body);
});

app.delete('/products/products/:id',function(req,res){
	var product_id = req.params.id;

	for(var i=0; i<products.length; i++){
     if(parseInt(products[i].id) === parseInt(product_id)){
         products.splice(i,1);
      }
   }
   res.json(req.body);
});

app.get('/products/productdata',function(req,res){
	res.json(products);		
});

app.listen(process.env.PORT || 3000);
console.log("server listening on port 3000");