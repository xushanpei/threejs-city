<template>
  <div ref="content"></div>
</template>

<script>
// 引入threejs
import * as THREE from "../../public/build/three";
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
      this.scene.background = new THREE.Color("#000");

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

      // 加载 obj 模型

      var mtlLoader = new MTLLoader();
      // mtlLoader.setPath('../assets/obj/');
      mtlLoader.load("./obj/test.mtl", (materials) => {

        console.log("+++++++++",materials)
        materials.preload();
        //实例化obj加载方法
        var objLoader = new OBJLoader();
        //  objLoader.setPath('../assets/obj/');
        //设置mtl文件的材质
        objLoader.setMaterials(materials);
        //文件名
        objLoader.load(
          "./obj/test.obj",
          (object) => {
            //模型的x、y、z轴的位置
            object.position.x = 0;
            object.position.z = -22;
            object.position.y = -10;
            // object.rotation.y = 0;
            object.scale.set(0.2, 0.2, 0.2);
            //将模型添加到场景当中
            this.scene.add(object);
            //打印出模型   是group对象
            console.log(object);
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

      // 创建点光源
      var point = new THREE.PointLight("#FFF");
      point.position.set(40, 200, 30);
      this.point = point;
      this.scene.add(point);

      const sphereSize = 10;
      const pointLightHelper = new THREE.PointLightHelper(point, sphereSize);
      this.scene.add(pointLightHelper);

      //创建环境光
      var ambient = new THREE.AmbientLight("#FFF");
      this.scene.add(ambient);

      // 创建一个相机
      this.camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        1,
        10000
      );
      this.camera.position.set(-5, 5, 5);

      //坐标轴辅助器，X,Y,Z长度30
      var axes = new THREE.AxesHelper(300);
      this.scene.add(axes);
      // 辅助网格
      let gridHelper = new THREE.GridHelper(100, 100);
      // this.scene.add(gridHelper);

      // 创建渲染器
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setClearColor(0xb9d3ff, 1);
      //插入 dom 元素
      content.appendChild(this.renderer.domElement);

      let controls = new OrbitControls(this.camera, this.renderer.domElement);
      controls.addEventListener("resize", this.render(), false);
    },

    render() {
      this.renderer.render(this.scene, this.camera);
      // 自动旋转动画
      //   this.mesh.rotateY(0.01);
      requestAnimationFrame(this.render);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>