if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

//global variables
var scene,
     camera,
     renderer,
     light,
     stats;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var mouseX = 0, mouseY = 0;
var objArr = [];
var isMoving = false;

//setup the scene, camera, and renderer
function init() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	light = new THREE.DirectionalLight( 0xffffff );
	
	renderer.setClearColor( 0x000000);
	renderer.setSize( window.innerWidth, window.innerHeight );

	light.position.set( 10, 0, 1 );
	scene.add( light );

	camera.position.z = 20;

	renderer.setSize( window.innerWidth, window.innerHeight );
	$("body").append( renderer.domElement );

	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '20px';
	stats.domElement.style.left = '20px';
	$("body").append(stats.domElement );

	createGeom();
}

//create the Geometry (Materials, meshes, ect.)
function createGeom() {
	var geometry0 = new THREE.CubeGeometry(2,2,2);
	var geometry1 = new THREE.CubeGeometry(2,2,2); 
	var geometry2 = new THREE.CubeGeometry(2,2,2);
	var geometry3 = new THREE.CubeGeometry(2,2,2);

	var greenMaterial = new THREE.MeshBasicMaterial( { color: 0x00FF00 } );
	var redMaterial = new THREE.MeshBasicMaterial( { color: 0xFF0000 } );
	var blueMaterial = new THREE.MeshBasicMaterial( { color: 0x0000FF } );
	var yellowMaterial = new THREE.MeshBasicMaterial( { color: 0xFFFF00 } );

	cube0 = new THREE.Mesh( geometry0, greenMaterial );
	cube1 = new THREE.Mesh( geometry1, redMaterial );
	cube2 = new THREE.Mesh( geometry2, blueMaterial );
	cube3 = new THREE.Mesh( geometry3, yellowMaterial );

	objArr.push(cube0);
	objArr.push(cube1);
	objArr.push(cube2);
	objArr.push(cube3);

	for(var i = 0; i < objArr.length; i++) {
		scene.add(objArr[i]);
	}
}

//animate every frame
function animate() {
	requestAnimationFrame(render);

	//set positions in space
	objArr[0].position.x = -7;
	objArr[0].position.y = 5;
	// objArr[0].rotation.x += 0.05;
	// objArr[0].rotation.y += 0.05;

	objArr[1].position.x = 7;
	objArr[1].position.y = 5;
	// objArr[1].rotation.x += 0.05;
	// objArr[1].rotation.y += 0.05;

	objArr[2].position.x = 7;
	objArr[2].position.y = -5;
	// objArr[2].rotation.x += 0.05;
	// objArr[2].rotation.y += 0.05;

	objArr[3].position.x = -7;
	objArr[3].position.y = -5;
	objArr[3].rotation.x += 0.05;
	objArr[3].rotation.y += 0.05;

	render();
	stats.update();
}

//render the scene to the browser window
function render() {	

	camera.position.x += ( mouseX - camera.position.x ) * 0.05;
	camera.position.y += ( - mouseY - camera.position.y ) * 0.05;

	camera.lookAt( scene.position );

	renderer.render(scene, camera);
}

//when the DOM is ready
$( document ).ready(function() {
	init();
	animate();

	$(window).resize(function() {
	  	windowHalfX = window.innerWidth / 2;
		windowHalfY = window.innerHeight / 2;

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );
	});

	$(".button").click( function( event ) {
		if(isMoving) {
			isMoving = false;
			camera.position.x = 0;
			camera.position.y = 0;
		} else {
			isMoving = true;
		}
	});

	$("canvas").bind( function( event ) {
		if(isMoving) {
			mouseX = ( event.clientX - windowHalfX );
			mouseY = ( event.clientY - windowHalfY );
			// var relX = (event.clientX-(window.innerWidth/2));
		 	//     	var relY = -(event.clientY-(window.innerHeight/2));
			// camera.position.x += (relX * 0.001);
			// camera.position.y += (relY * 0.001);
			
			// if(camera.position.x <= -10) {
			// 	camera.position.x = -10;
			// }

			// if(camera.position.x >=10)  {
			// 	camera.position.x = 10;
			// }

			// if(camera.position.y <= -5) {
			// 	camera.position.y = -5;
			// }

			// if(camera.position.y >= 5) {
			// 	camera.position.y = 5;
			// }
		}
	});
});