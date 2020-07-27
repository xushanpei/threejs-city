<template>
  <div @click="onDocumentMouseDown()"  class="main">
    <div  style="" ref="input1"></div>
    <div @click=dianjiredian() class="tag" id="tag">


    </div>
    <div @click=dianjiredian2() class="tag2" id="tag2"></div>

  </div>
</template>

<script>
  import * as THREE from '../../../public/build/three';

  import Stats from '../../../public/example/jsm/libs/stats.module.js';

  import { OrbitControls } from '../../../public/example/jsm/controls/OrbitControls.js';
  import { FBXLoader } from '../../../public/example/jsm/loaders/FBXLoader.js';
  import { OBJLoader } from '../../../public/example/jsm/loaders/OBJLoader.js'
  import { GLTFLoader } from '../../../public/example/jsm/loaders/GLTFLoader'
export default {

  name: "DengLu",
  data() {
    return {
      container:"",
      stats:"",
      controls:"",
      camera:"",
      scene:"",
      renderer:"",
      light:"",
      clock: new THREE.Clock(),
      mixer:"",
      publicPath: process.env.BASE_URL
    };
  },
  methods: {
 onDocumentMouseDown( event ) {
  // event.preventDefault();
  var vector = new THREE.Vector3();//三维坐标对象
  vector.set(
    ( event.clientX / window.innerWidth ) * 2 - 1,
    - ( event.clientY / window.innerHeight ) * 2 + 1,
    0.5 );
  vector.unproject( this.camera );
  var raycaster = new THREE.Raycaster(this.camera.position, vector.sub(this.camera.position).normalize());
  var intersects = raycaster.intersectObjects(this.scene.children);
  if (intersects.length > 0) {
    var selected = intersects[0];//取第一个物体
    console.log("x坐标:"+selected.point.x);
    console.log("y坐标:"+selected.point.y);
    console.log("z坐标:"+selected.point.z);
  }
 },


    init() {

    this.container =this.$refs.input1;
    // document.body.appendChild( this.container );//主canvas加载

      this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 50000 );//相机
      this.camera.position.set( 100, 200, 300 );//设置相机的position

      this.scene = new THREE.Scene();//new一个场景
      this.scene.background = new THREE.Color( 0xa0a0a0 );//场景的banckground
      // this.scene.fog = new THREE.Fog( 0xa0a0a0, 200, 1000 );

      this.light = new THREE.HemisphereLight( 0xffffff, 0x444444 );//加一个半球光源
      this.light.position.set( 0, 200, 0 );//灯的position
      this.scene.add( this.light );//场景里加半球光

      this.light = new THREE.DirectionalLight( 0xffffff );//new一个环境光
      this.light.position.set( 0, 200, 100 );//设置环境光位置
      this.light.castShadow = true;
      this.light.shadow.camera.top = 180;
      this.light.shadow.camera.bottom = - 100;
      this.light.shadow.camera.left = - 120;
      this.light.shadow.camera.right = 120;
      this.scene.add( this.light );//场景中加入环境光

    // scene.add( new CameraHelper( light.shadow.camera ) );

    // ground
    // var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2000, 2000 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
    // mesh.rotation.x = - Math.PI / 2;
    // mesh.receiveShadow = true;
    //   this.scene.add( mesh );//加一个mesh即中间那个白色的物体

    var grid = new THREE.GridHelper( 2000, 20, 0x000000, 0x000000 );//白色物体上的网格
    grid.material.opacity = 0.2;
    grid.material.transparent = true;
      this.scene.add( grid );

    // model
    var loader = new FBXLoader();//fbxload器  用来加载fbx   gltf就用gltfload

    loader.load( `${this.publicPath}models/Samba Dancing.fbx`, ( object )=> {
      console.log(object)//object就是导入的物体
        //  object.traverse(function (obj) {
        //         if(obj instanceof THREE.Mesh){
        //             obj.material.emissive=new THREE.Color(1,1,1);
        //             obj.material.emissiveIntensity=1;
        //             obj.material.emissiveMap=obj.material.map;
        //         }
        //     });

//         object.traverse(function(child) {

//           if(child instanceof THREE.Mesh) {
//               child.material.transparent=true;
// }
// }

// );





      // object.scale.x = 10;
      // object.scale.y = 10;
      // object.scale.z = 10;//设置大小  怕太小看不见

      // this.mixer = new THREE.AnimationMixer( object );

      // var action = this.mixer.clipAction( object.animations[ 0 ] );
      // action.play();

      // object.traverse( function ( child ) {
      //
      //   if ( child.isMesh ) {
      //
      //     child.castShadow = true;
      //     child.receiveShadow = true;
      //
      //   }
      //
      // } );

      this.scene.add( object );//场景中加入那个fbx


    } );

      this.renderer = new THREE.WebGLRenderer( { antialias: true } );
      this.renderer.setPixelRatio( window.devicePixelRatio );
      this.renderer.setSize( window.innerWidth, window.innerHeight );
      this.renderer.shadowMap.enabled = true;
      this.container.appendChild( this.renderer.domElement );

      this.controls = new OrbitControls(  this.camera, this.renderer.domElement );//相机控制器
      this.controls.target.set( 0, 100, 0 );
      this.controls.update();

    window.addEventListener( 'resize', this.onWindowResize, false );

    // stats
    //   stats = new Stats();
    //   this.container.appendChild( stats.dom );

  },
    onWindowResize() {

      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize( window.innerWidth, window.innerHeight );

    },
    animate() {

      requestAnimationFrame( this.animate );

      var delta = this.clock.getDelta();

      if ( this.mixer ) this.mixer.update( delta );

      this.renderer.render( this.scene, this.camera );//不停渲染
      this.createDescriptionTagMesh()
      // stats.update();

    },


    createDescriptionTagMesh(){
      var position = new THREE.Vector3(100, 100, 50);

      var windowPosition = this.transPosition(position);
      var left = windowPosition.x;
      var top = windowPosition.y;
      //设置div屏幕位置
      let div = document.getElementById('tag');
      div.style.display = "block";
      div.style.left = left + 'px';
      div.style.top = top + 'px';


      var position2 = new THREE.Vector3(100, 200, 50);

      var windowPosition2 = this.transPosition(position2);
      var left2 = windowPosition2.x;
      var top2 = windowPosition2.y;
      //设置div屏幕位置
      let div2 = document.getElementById('tag2');
      div2.style.display = "block";
      div2.style.left = left2 + 'px';
      div2.style.top = top2 + 'px';



    },
    transPosition(position) {
    let world_vector = new THREE.Vector3(position.x, position.y, position.z);
    let vector = world_vector.project(this.camera);
    let halfWidth = window.innerWidth / 2,
            halfHeight = window.innerHeight / 2;
    return {
      x: Math.round(vector.x * halfWidth + halfWidth),
      y: Math.round(-vector.y * halfHeight + halfHeight)
    };
  },
    dianjiredian(){
      alert("点击热点1")
    },
    dianjiredian2(){
      alert("点击热点2")
    }
  },
  mounted() {

    this.init();
    this.animate();

  },
  beforeDestroy() {

  }
};
</script>
<style>

</style>
<style scoped>
  body{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .tag{
    position: absolute;
    background-color: MidnightBlue;
    background-color: yellow;
    /* border-top-left-radius: 10px; */
    /* border-bottom-right-radius: 10px; */
    border-radius: 16px;
    opacity: 0.5;
    font-size: 4px;
    color: aqua;
    width: 5px;
    height: 5px;
    padding: 1px 1px 1px;
    animation: mydot 1.5s infinite ease;
    animation-delay: 0.4s;
  }
  .tag2{
    position: absolute;
    background-color: MidnightBlue;
    background-color: yellow;
    /* border-top-left-radius: 10px; */
    /* border-bottom-right-radius: 10px; */
    border-radius: 16px;
    opacity: 0.5;
    font-size: 4px;
    color: aqua;
    width: 5px;
    height: 5px;
    padding: 1px 1px 1px;
    animation: mydot 1.5s infinite ease;
    animation-delay: 0.4s;
  }
  @keyframes mydot{
    0%{
      transform: scale(1);
    }
    10%{
      transform: scale(1.5);
    }
    20%{
      transform: scale(2);
      opacity: 0.9;
    }
    30%{
      transform: scale(2.5);
      opacity: 0.8;
    }
    40%{
      transform: scale(3);
      opacity: 0.7;
    }
    50%{
      transform: scale(3.5);
      opacity: 0.6;
    }
    60%{
      transform: scale(3.6);
      opacity: 0.5;
    }
    70%{
      transform: scale(3.7);
      opacity: 0.3;

    }
    80%{
      transform:scale(3.8);
      opacity: 0.2;
    }
    90%{
      transform:scale(3.9);
      opacity:0.1;
    }

    100%{
      transform: scale(4);
      opacity: 0;
    }
  }


</style>