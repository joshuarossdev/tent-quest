class Map {
  constructor(latCenter, lonCenter, zoom, domElementId){
    this.handleMapClick = this.handleMapClick.bind( this );
    this.addMapListener = this.addMapListener.bind(this);
    this.renderMapCircle = this.renderMapCircle.bind(this);
    this.clickLatitude = 33.66;
    this.clickLongitude = -117.80;
    this.latCenter = latCenter;
    this.lonCenter = lonCenter;
    this.latLon;
    this.zoom = zoom;
    this.domElementId = domElementId;
    this.map = {};
    this.clickCallbackList = [];
    this.markerStorage = {
      'yelp': []
    }
  }

  initMap(){
    this.map = new google.maps.Map(document.getElementById(this.domElementId), {
      center: { lat: this.latCenter, lng: this.lonCenter },
      zoom: this.zoom
    });
  }

  addMapListener(){
    this.map.addListener("click", this.handleMapClick );
  }

  handleMapClick( event ){
    this.clickLatitude = event.latLng.lat();
    this.clickLongitude = event.latLng.lng();

    var clickLatLon = {lat: this.clickLatitude, lng: this.clickLongitude}
    var impact = 'images/impact_icon2.png'
    var marker = new google.maps.Marker({
      position: clickLatLon,
      map: this.map,
      animation: google.maps.Animation.DROP,
      icon: impact,
      title: 'Ground Zero'
    });
    marker.setMap(this.map);

    for( var callbackIndex = 0; callbackIndex < this.clickCallbackList.length; callbackIndex++){
      this.clickCallbackList[callbackIndex]( this.getLatLonClick() );
    }
  }

  renderMapCircle(){
    console.log("renderMapCircle");
    var location = {
      losangeles: {
        center: {lat: 34.052, lng: -118.243},
      }
    };

    var map = new google.maps.Map(document.getElementById(this.domElementId), {
      center: location.losangeles.center,
      zoom: 13
    });

    var circle = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: map,
      center: location.losangeles.center,
      radius: 2802.71467275656
    });
  }

  renderMarker(location){
    var clickLatLon = location;
    var impact = 'images/impact_icon2.png'
    var marker = new google.maps.Marker({
    position: location,
    map: this.map,
    animation: google.maps.Animation.DROP,
    title: 'Yelp'
   });
   console.log(location)
    marker.setMap(this.map);
    this.map.setCenter(clickLatLon);
    this.map.setZoom(15);
   }

  renderMapIcon(icon, location){

    //var type = 'yelp'
    //var position = {lat: 37.769, lng: -122.446};
    //var icon = 'images/smurf.jpg'
    //var clickCallback = function(){}


    // if(!this.markerStorage.hasOWnProperty(type)){
    //   this.markerStorage[type] = [];
    // }
    var marker = new google.maps.Marker({
      position: location,
      map: this.map,
      icon: icon
    });
    // this.markerStorage[type].push( marker );
    var clickLatLon = { lat: this.clickLatitude, lng: this.clickLongitude }
    marker.setMap(this.map);
    this.map.setCenter(clickLatLon);
    this.map.setZoom(6);
  }

  removeAllMarkersByType( type ){
    for( var markerI = 0; markerI < this.markerStorage[type].length; markerI++){
      this.markerStorage[type][markerI].setMap( null );
    }
    this.markerStorage[type] = [];
  }

  getLatLonClick(){
    // console.log('getLatLonClick');
    this.latLon = { clickLat: this.clickLatitude, clickLon: this.clickLongitude }
    return this.latLon;
  }

  addClickCallback( callback ){
    this.clickCallbackList.push( callback );
  }
}
