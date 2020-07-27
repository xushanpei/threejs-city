<template>
  <div ref="content"></div>
</template>

<script>
// 引入threejs
import * as THREE from "../../public/build/three";
//鼠标控制
import { OrbitControls } from "../../public/example/jsm/controls/OrbitControls.js";

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
      step:0
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
      var geometry = new THREE.SphereGeometry(10, 50, 50);
      // 几何体材质对象
      var material = new THREE.MeshPhongMaterial({
        color: "red"
      });

      // 创建网格模型对象
      this.mesh = new THREE.Mesh(geometry, material);
      //设置几何体位置
      this.mesh.position.x = 0;
      this.mesh.position.y = 10;
      this.mesh.position.z = 0;
      this.scene.add(this.mesh);

      // 创建点光源
      var point = new THREE.PointLight("#FFF");
      point.position.set(40, 20, 30);
      this.point = point;
      this.scene.add(point);

      const sphereSize = 10;
      const pointLightHelper = new THREE.PointLightHelper(point, sphereSize);
      this.scene.add(pointLightHelper);

      //创建环境光
      var ambient = new THREE.AmbientLight(0x444444);
      this.scene.add(ambient);

      // 创建一个相机
      this.camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        1,
        10000
      );
      this.camera.position.set(-50, 50, 50);
      this.camera.lookAt(0, 0, 0);

      //坐标轴辅助器，X,Y,Z长度30
      var axes = new THREE.AxesHelper(300);
      this.scene.add(axes);
      // 辅助网格
      // let gridHelper = new THREE.GridHelper(100, 100);
      // this.scene.add(gridHelper);

      /*给物体添加光感材质*/
      //普通材质MeshBasicMaterial对光源是没有反应的，所以我们要修改为对光源产生反应的MeshLambertMaterial和MeshPhongMaterial
      //给平面添加材质
      const planeGeometry = new THREE.PlaneGeometry(100, 100);
      const planeMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide //两面 // THREE.FrontSide 、THREE.BackSide
      });
      const plane = new THREE.Mesh(planeGeometry, planeMaterial);
      //水平面旋转并且设置位置
      plane.rotation.x = -0.5 * Math.PI;
      plane.position.x = 0;
      plane.position.y = 0;
      plane.position.z = 0;
      this.plane = plane;
      this.scene.add(plane);

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
      //告诉渲染器，我们需要阴影映射
      this.renderer.shadowMap.enabled = true;
      // 对每个物体进行阴影设置，接受阴影还是投射阴影
      //平面是接受阴影
      this.plane.receiveShadow = true;
      //方块投射阴影
      this.mesh.castShadow = true;
      //需要给光源同样设置投射阴影
      this.point.castShadow = true;

      // 上下反弹球体
      this.step += 0.1;
      console.log(this.step)
      this.mesh.position.x = 20 + (10 * (Math.cos(this.step)));
      this.mesh.position.y = 10 + (10 * Math.abs(Math.sin(this.step)));

      // 自动旋转动画
      this.mesh.rotateY(0.01);
      requestAnimationFrame(this.render);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>