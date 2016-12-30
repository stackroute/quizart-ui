import React from 'react';
import Coverflow from 'react-coverflow';
import Carousel from 'react-responsive-carousel'

export default class DemoCarousel extends React.Component {
  render() {
        return (
            <Carousel axis="vertical" showArrows={true} onChange={onChange} onClickItem={onClickItem} onClickThumb={onClickThumb}>
                <div>
                    <img src="http://res.cloudinary.com/deaxb0msww/image/upload/v1483044106/sports_vgmzzo.jpg" />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src="http://res.cloudinary.com/deaxb0msww/image/upload/v1483044105/reel_hg58ql.jpg" />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src="http://res.cloudinary.com/deaxb0msww/image/upload/v1483044106/music_rjhk9e.jpg" />
                    <p className="legend">Legend 3</p>
                </div>
                <div>
                    <img src="http://res.cloudinary.com/deaxb0msww/image/upload/v1483044106/sports_vgmzzo.jpg" />
                    <p className="legend">Legend 4</p>
                </div>
                <div>
                    <img src="http://res.cloudinary.com/deaxb0msww/image/upload/v1483044106/music_rjhk9e.jpg" />
                    <p className="legend">Legend 5</p>
                </div>
                <div>
                    <img src="http://res.cloudinary.com/deaxb0msww/image/upload/v1483044105/reel_hg58ql.jpg" />
                    <p className="legend">Legend 6</p>
                </div>
            </Carousel>
        );
    }

//  render(){
//    return(
//       <Coverflow
//         width={960}
//         height={280}
//         displayQuantityOfSide={2}
//         navigation={false}
//         enableHeading={false}
//         >
//         <img src='http://res.cloudinary.com/deaxb0msww/image/upload/v1483044106/sports_vgmzzo.jpg' alt='title or description' data-action="#/" />
//         <img src='http://res.cloudinary.com/deaxb0msww/image/upload/v1483044105/reel_hg58ql.jpg' alt='title or description' data-action="#/"/>
//         <img src='http://res.cloudinary.com/deaxb0msww/image/upload/v1483044106/music_rjhk9e.jpg' alt='title or description' data-action="#/"/>
//         <img src='http://res.cloudinary.com/deaxb0msww/image/upload/v1483044106/sports_vgmzzo.jpg' alt='title or description' data-action="#/" />
//         <img src='http://res.cloudinary.com/deaxb0msww/image/upload/v1483044105/reel_hg58ql.jpg' alt='title or description' data-action="#/"/>
//         <img src='http://res.cloudinary.com/deaxb0msww/image/upload/v1483044106/music_rjhk9e.jpg' alt='title or description' data-action="#/"/>
//
//       </Coverflow>
//     );
//
//   document.querySelector('.content')
// }
};
