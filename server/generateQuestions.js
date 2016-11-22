module.exports=function(){
	var faker=require("faker");
	var lodash=require("lodash");

			var Sports=lodash.times(100,function(n)
		{
			return {
				id:n,
				question:faker.lorem.sentence(),
				rightoption:faker.lorem.word(),
				wrongoption1:faker.lorem.word(),
				wrongoption2:faker.lorem.word(),
				wrongoption3:faker.lorem.word(),
				rightansmark:faker.random.number({min:1, max:10}),
				wrongansmark:faker.random.number({min:-5, max:-1}),
				time:faker.random.number({min:10, max:15}),
				image: 'http://placehold.it/300x300'

			}
		});

		var Politics=lodash.times(100,function(n)
	{
		return {
			id:n,
			question:faker.lorem.sentence(),
			rightoption:faker.lorem.word(),
			wrongoption1:faker.lorem.word(),
			wrongoption2:faker.lorem.word(),
			wrongoption3:faker.lorem.word(),
		rightansmark:faker.random.number({min:1, max:10}),
			wrongansmark:faker.random.number({min:-5, max:-1}),
			time:faker.random.number({min:10, max:15}),
			image: 'http://placehold.it/300x300'

		}
	});

	var Science=lodash.times(100,function(n)
{
	return {
		id:n,
		question:faker.lorem.sentence(),
		rightoption:faker.lorem.word(),
		wrongoption1:faker.lorem.word(),
		wrongoption2:faker.lorem.word(),
		wrongoption3:faker.lorem.word(),
	rightansmark:faker.random.number({min:1, max:10}),
		wrongansmark:faker.random.number({min:-5, max:-1}),
		time:faker.random.number({min:10, max:15}),
		image: 'http://placehold.it/300x300'

	}
});
var NanoTechnology=lodash.times(100,function(n)
{
return {
	id:n,
	question:faker.lorem.sentence(),
	rightoption:faker.lorem.word(),
	wrongoption1:faker.lorem.word(),
	wrongoption2:faker.lorem.word(),
	wrongoption3:faker.lorem.word(),
rightansmark:faker.random.number({min:1, max:10}),
	wrongansmark:faker.random.number({min:-5, max:-1}),
	time:faker.random.number({min:10, max:15}),
	image: 'http://placehold.it/300x300'

}
});
var Robotics=lodash.times(100,function(n)
{
return {
	id:n,
	question:faker.lorem.sentence(),
	rightoption:faker.lorem.word(),
	wrongoption1:faker.lorem.word(),
	wrongoption2:faker.lorem.word(),
	wrongoption3:faker.lorem.word(),
rightansmark:faker.random.number({min:1, max:10}),
	wrongansmark:faker.random.number({min:-5, max:-1}),
	time:faker.random.number({min:10, max:15}),
	image: 'http://placehold.it/300x300'

}
});
var NewTrends=lodash.times(100,function(n)
{
return {
	id:n,
	question:faker.lorem.sentence(),
	rightoption:faker.lorem.word(),
	wrongoption1:faker.lorem.word(),
	wrongoption2:faker.lorem.word(),
	wrongoption3:faker.lorem.word(),
rightansmark:faker.random.number({min:1, max:10}),
	wrongansmark:faker.random.number({min:-5, max:-1}),
	time:faker.random.number({min:10, max:15}),
	image: 'http://placehold.it/300x300'

}
});
var Cinema=lodash.times(100,function(n)
{
return {
	id:n,
	question:faker.lorem.sentence(),
	rightoption:faker.lorem.word(),
	wrongoption1:faker.lorem.word(),
	wrongoption2:faker.lorem.word(),
	wrongoption3:faker.lorem.word(),
rightansmark:faker.random.number({min:1, max:10}),
	wrongansmark:faker.random.number({min:-5, max:-1}),
	time:faker.random.number({min:10, max:15}),
	image: 'http://placehold.it/300x300'

}
});
var Geography=lodash.times(100,function(n)
{
return {
	id:n,
	question:faker.lorem.sentence(),
	rightoption:faker.lorem.word(),
	wrongoption1:faker.lorem.word(),
	wrongoption2:faker.lorem.word(),
	wrongoption3:faker.lorem.word(),
rightansmark:faker.random.number({min:1, max:10}),
	wrongansmark:faker.random.number({min:-5, max:-1}),
	time:faker.random.number({min:10, max:15}),
	image: 'http://placehold.it/300x300'

}
});
var History=lodash.times(100,function(n)
{
return {
	id:n,
	question:faker.lorem.sentence(),
	rightoption:faker.lorem.word(),
	wrongoption1:faker.lorem.word(),
	wrongoption2:faker.lorem.word(),
	wrongoption3:faker.lorem.word(),
rightansmark:faker.random.number({min:1, max:10}),
	wrongansmark:faker.random.number({min:-5, max:-1}),
	time:faker.random.number({min:10, max:15}),
	image: 'http://placehold.it/300x300'

}
});
var Literature=lodash.times(100,function(n)
{
return {
	id:n,
	question:faker.lorem.sentence(),
	rightoption:faker.lorem.word(),
	wrongoption1:faker.lorem.word(),
	wrongoption2:faker.lorem.word(),
	wrongoption3:faker.lorem.word(),
rightansmark:faker.random.number({min:1, max:10}),
	wrongansmark:faker.random.number({min:-5, max:-1}),
	time:faker.random.number({min:10, max:15}),
	image: 'http://placehold.it/300x300'

}
});
var Nature=lodash.times(100,function(n)
{
return {
	id:n,
	question:faker.lorem.sentence(),
	rightoption:faker.lorem.word(),
	wrongoption1:faker.lorem.word(),
	wrongoption2:faker.lorem.word(),
	wrongoption3:faker.lorem.word(),
rightansmark:faker.random.number({min:1, max:10}),
	wrongansmark:faker.random.number({min:-5, max:-1}),
	time:faker.random.number({min:10, max:15}),
	image: 'http://placehold.it/300x300'

}
});

var FoodandDrinks=lodash.times(100,function(n)
{
return {
	id:n,
	question:faker.lorem.sentence(),
	rightoption:faker.lorem.word(),
	wrongoption1:faker.lorem.word(),
	wrongoption2:faker.lorem.word(),
	wrongoption3:faker.lorem.word(),
rightansmark:faker.random.number({min:1, max:10}),
	wrongansmark:faker.random.number({min:-5, max:-1}),
	time:faker.random.number({min:10, max:15}),
	image: 'http://placehold.it/300x300'

}
});
var WordPlay=lodash.times(100,function(n)
{
return {
	id:n,
	question:faker.lorem.sentence(),
	rightoption:faker.lorem.word(),
	wrongoption1:faker.lorem.word(),
	wrongoption2:faker.lorem.word(),
	wrongoption3:faker.lorem.word(),
rightansmark:faker.random.number({min:1, max:10}),
	wrongansmark:faker.random.number({min:-5, max:-1}),
	time:faker.random.number({min:10, max:15}),
	image: 'http://placehold.it/300x300'

}
});
var PotLuck=lodash.times(100,function(n)
{
return {
	id:n,
	question:faker.lorem.sentence(),
	rightoption:faker.lorem.word(),
	wrongoption1:faker.lorem.word(),
	wrongoption2:faker.lorem.word(),
	wrongoption3:faker.lorem.word(),
rightansmark:faker.random.number({min:1, max:10}),
	wrongansmark:faker.random.number({min:-5, max:-1}),
	time:faker.random.number({min:10, max:15}),
	image: 'http://placehold.it/300x300'

}
});
var People=lodash.times(100,function(n)
{
return {
	id:n,
	question:faker.lorem.sentence(),
	rightoption:faker.lorem.word(),
	wrongoption1:faker.lorem.word(),
	wrongoption2:faker.lorem.word(),
	wrongoption3:faker.lorem.word(),
rightansmark:faker.random.number({min:1, max:10}),
	wrongansmark:faker.random.number({min:-5, max:-1}),
	time:faker.random.number({min:10, max:15}),
	image: 'http://placehold.it/300x300'

}
});
var Countries=lodash.times(100,function(n)
{
return {
	id:n,
	question:faker.lorem.sentence(),
	rightoption:faker.lorem.word(),
	wrongoption1:faker.lorem.word(),
	wrongoption2:faker.lorem.word(),
	wrongoption3:faker.lorem.word(),
rightansmark:faker.random.number({min:1, max:10}),
	wrongansmark:faker.random.number({min:-5, max:-1}),
	time:faker.random.number({min:10, max:15}),
	image: 'http://placehold.it/300x300'

}
});
var BrainTeasers=lodash.times(100,function(n)
{
return {
	id:n,
	question:faker.lorem.sentence(),
	rightoption:faker.lorem.word(),
	wrongoption1:faker.lorem.word(),
	wrongoption2:faker.lorem.word(),
	wrongoption3:faker.lorem.word(),
rightansmark:faker.random.number({min:1, max:10}),
	wrongansmark:faker.random.number({min:-5, max:-1}),
	time:faker.random.number({min:10, max:15}),
	image: 'http://placehold.it/300x300'

}
});
var World=lodash.times(100,function(n)
{
return {
	id:n,
	question:faker.lorem.sentence(),
	rightoption:faker.lorem.word(),
	wrongoption1:faker.lorem.word(),
	wrongoption2:faker.lorem.word(),
	wrongoption3:faker.lorem.word(),
rightansmark:faker.random.number({min:1, max:10}),
	wrongansmark:faker.random.number({min:-5, max:-1}),
	time:faker.random.number({min:10, max:15}),
	image: 'http://placehold.it/300x300'

}
});
var ForKids=lodash.times(100,function(n)
{
return {
	id:n,
	question:faker.lorem.sentence(),
	rightoption:faker.lorem.word(),
	wrongoption1:faker.lorem.word(),
	wrongoption2:faker.lorem.word(),
	wrongoption3:faker.lorem.word(),
rightansmark:faker.random.number({min:1, max:10}),
	wrongansmark:faker.random.number({min:-5, max:-1}),
	time:faker.random.number({min:10, max:15}),
	image: 'http://placehold.it/300x300'

}
});
var MathQuiz=lodash.times(100,function(n)
{
return {
	id:n,
	question:faker.lorem.sentence(),
	rightoption:faker.lorem.word(),
	wrongoption1:faker.lorem.word(),
	wrongoption2:faker.lorem.word(),
	wrongoption3:faker.lorem.word(),
rightansmark:faker.random.number({min:1, max:10}),
	wrongansmark:faker.random.number({min:-5, max:-1}),
	time:faker.random.number({min:10, max:15}),
	image: 'http://placehold.it/300x300'

}
});
var Business=lodash.times(100,function(n)
{
return {
	id:n,
	question:faker.lorem.sentence(),
	rightoption:faker.lorem.word(),
	wrongoption1:faker.lorem.word(),
	wrongoption2:faker.lorem.word(),
	wrongoption3:faker.lorem.word(),
rightansmark:faker.random.number({min:1, max:10}),
	wrongansmark:faker.random.number({min:-5, max:-1}),
	time:faker.random.number({min:10, max:15}),
	image: 'http://placehold.it/300x300'

}
});
var Medicine=lodash.times(100,function(n)
{
return {
	id:n,
	question:faker.lorem.sentence(),
	rightoption:faker.lorem.word(),
	wrongoption1:faker.lorem.word(),
	wrongoption2:faker.lorem.word(),
	wrongoption3:faker.lorem.word(),
rightansmark:faker.random.number({min:1, max:10}),
	wrongansmark:faker.random.number({min:-5, max:-1}),
	time:faker.random.number({min:10, max:15}),
	image: 'http://placehold.it/300x300'

}
});
var Music=lodash.times(100,function(n)
{
return {
	id:n,
	question:faker.lorem.sentence(),
	rightoption:faker.lorem.word(),
	wrongoption1:faker.lorem.word(),
	wrongoption2:faker.lorem.word(),
	wrongoption3:faker.lorem.word(),
rightansmark:faker.random.number({min:1, max:10}),
	wrongansmark:faker.random.number({min:-5, max:-1}),
	time:faker.random.number({min:10, max:15}),
	image: 'http://placehold.it/300x300'

}
});
var Colors=lodash.times(100,function(n)
{
return {
	id:n,
	question:faker.lorem.sentence(),
	rightoption:faker.lorem.word(),
	wrongoption1:faker.lorem.word(),
	wrongoption2:faker.lorem.word(),
	wrongoption3:faker.lorem.word(),
rightansmark:faker.random.number({min:1, max:10}),
	wrongansmark:faker.random.number({min:-5, max:-1}),
	time:faker.random.number({min:10, max:15}),
	image: 'http://placehold.it/300x300'

}
});

return{
   Sports,
 Politics,
 Science,
 NanoTechnology,
 Robotics,
 NewTrends,
 Cinema,
 Music,
 Geography,
 History,
 Literature,Nature,FoodandDrinks,WordPlay,PotLuck,People,Countries,BrainTeasers,World,ForKids,MathQuiz,Business,Medicine,Colors};
}
