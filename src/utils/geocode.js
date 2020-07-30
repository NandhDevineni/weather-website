const request = require('request');
const geoCode = (address, callback) => {
    // if(!address){
    //     return console.log('please provide address');
    // }
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibmFuZGhkZXZpbmVuaSIsImEiOiJja2QwZWhybGUwMXV1MnpudXF4Z3c2eXA2In0.Bs7HQuKb4327JETqRnux9Q&limit=1';
    request({url: url, json:true}, (error, {body}) => {
        if(error){
            callback('unable to connect the location server', undefined);       
        } else if(body.features.length === 0){
            callback('unable to locate', undefined);
        } else{
            callback(undefined, {
               lat:body.features[0].center[1],
               long:body.features[0].center[0],
               location:body.features[0].place_name
            })
        }
    })

};

module.exports = geoCode;
