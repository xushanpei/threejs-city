<template>
  <div ref="content"></div>
</template>

<script>
// 引入threejs
import * as THREE from "three";
//鼠标控制
import { OrbitControls } from "../../public/example/jsm/controls/OrbitControls.js";
// MTL
import { MTLLoader } from "../../public/example/jsm/loaders/MTLLoader.js";
// ObjLoader
import { OBJLoader } from "../../public/example/jsm/loaders/OBJLoader.js";

export default {
  components: {},
  data() {
    return {
      // 创建一个场景
      scene: null,
      // 创建一个相机
      camera: null,
      // 创建一个渲染器
      renderer: null,
      // 模型对象
      mesh: null,
      // 平面
      plane: null,
      // 点光源
      point: null,

      // step
      step: 0,

      // MTL 加载
      mtlLoader:"",
      // OBJ 加载
      objLoader:""
    };
  },

  mounted() {
    this.init();
  },
  methods: {
    // 初始化
    init() {
      // 初始化容器
      var content = this.$refs.content;

      // 创建一个场景
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color("#0282E5");
      this.scene.updateMatrixWorld(true);

      // 创建几何体
      //   var geometry = new THREE.SphereGeometry(30, 50, 50);
      // // 纹理加载器 （ 此处加载贴图 ）
      // // var texture = new THREE.TextureLoader().load(require('./Earth.png'));

      //   // 几何体材质对象
      //   var material = new THREE.MeshLambertMaterial({
      //       color:"#000"
      //   });

      //   // 创建网格模型对象
      //   this.mesh = new THREE.Mesh(geometry, material);
      //   //设置几何体位置
      //   this.mesh.position.x = 0;
      //   this.mesh.position.y = 10;
      //   this.mesh.position.z = 0;
      //   this.scene.add(this.mesh);
        

      // 创建点光源
      var point = new THREE.PointLight(0xFFFFFF);
      point.position.set(200, 2000, 30);
      this.point = point;
      this.scene.add(point);

      const sphereSize = 500;
      const pointLightHelper = new THREE.PointLightHelper(point, sphereSize);
      this.scene.add(pointLightHelper);

      //创建环境光
      var ambient = new THREE.AmbientLight(0xFFFFFF);
      this.scene.add(ambient);

      // 创建一个相机
      this.camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        1,
        10000
      );
      this.camera.position.set(6691, 604.35216, 2154.6111);

      //照相机帮助线
      // var cameraHelper = new THREE.CameraHelper( this.camera);
      // this.scene.add(cameraHelper);

      //坐标轴辅助器，X,Y,Z长度30
      var axes = new THREE.AxesHelper(3000);
      this.scene.add(axes);
      // 辅助网格
      let gridHelper = new THREE.GridHelper(3000, 3000);
      this.scene.add(gridHelper);

      this.MOLoader("./city/ny1.mtl","./city/ny1.obj")
      this.MOLoader("./city/ny2.mtl","./city/ny2.obj")
      this.MOLoader("./city/ny3.mtl","./city/ny3.obj")
      this.MOLoader("./city/ny4.mtl","./city/ny4.obj")
      this.MOLoader("./city/ny5.mtl","./city/ny5.obj")
      this.MOLoader("./city/ny6.mtl","./city/ny6.obj")
      this.MOLoader("./city/ny7.mtl","./city/ny7.obj")
      this.MOLoader("./city/ny8.mtl","./city/ny8.obj")
      this.MOLoader("./city/multi_storied_01.mtl","./city/multi_storied_01.obj")
      this.MOLoader("./city/triangle_01.mtl","./city/triangle_01.obj")
      this.MOLoader("./city/white_house.mtl","./city/white_house.obj")
      

      // 创建渲染器
      this.renderer = new THREE.WebGLRenderer({
	  // 开启抗锯齿
      antialias: true,
      // 开启背景透明
      alpha: true
    });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      //插入 dom 元素
      content.appendChild(this.renderer.domElement);
    this.render()
      let controls = new OrbitControls(this.camera, this.renderer.domElement);
      controls.addEventListener("resize", this.render(), false);
    },

    render() {
      this.renderer.render(this.scene, this.camera);
      console.log("我渲染了")
      requestAnimationFrame(this.render);
    },

    // 加载MTL OBJ
    MOLoader(mtl,obj){
         // 加载 obj 模型

      this.mtlLoader = new MTLLoader();
      this.mtlLoader.load(mtl, (materials) => {
        materials.preload();
        //实例化obj加载方法
        this.objLoader = new OBJLoader();
        //设置mtl文件的材质
        this.objLoader.setMaterials(materials);
        //文件名
        this.objLoader.load(
          obj,
          (object) => {
            object.position.set(6691, 604.35216, 2154.6111);
            //将模型添加到场景当中
            this.scene.add(object);
            //打印出模型   是group对象
            console.log("加载好了");
            this.render();
          },
          (xhr) => {
            console.log(xhr.lengthComputable);
            if (xhr.lengthComputable) {
              var percentComplete = (xhr.loaded / xhr.total) * 100;
              console.log(percentComplete);
            }
          },
          (err) => {
            console.log("加载失败");
          }
        );
      });
    }
  },
};
</script>

<style lang="scss" scoped>
body {
    margin: 0;
    overflow: hidden;
    background: url("http://pic.sc.chinaz.com/files/pic/pic9/202001/zzpic22739.jpg") center no-repeat;
    background-size:cover;
}
</style>