<template>
  <div class="container">
      <p>我的第一个三维场景</p>
      <div ref="content"></div>
  </div>
</template>

<script>
// 引入threejs
import * as THREE from "../../public/build/three"
//鼠标控制
 import { OrbitControls } from '../../public/example/jsm/controls/OrbitControls.js';
export default {
    data(){
        return {
            //场景
            scene:"",
            //相机
            camera:"",
            //模型对象
            mesh:"",
            //渲染器
            renderer:""
        }
    },

    mounted(){
        this.init();
    },
    methods:{
        // 初始化方法
        init(){
            //容器初始化
            var content =this.$refs.content;
            // 创建一个场景
            this.scene = new  THREE.Scene();
            
            //创建几何体对象
            var geometry = new THREE.BoxGeometry(60,60,60)
            //材质对象
            // var material = new THREE.MeshLambertMaterial({
            //     color:0x0000ff,
            //     // wireframe:true//线条模式渲染
            // })
             var material = new THREE.MeshPhongMaterial({
                color:0x0000ff,
                specular:0x888888,
                shininess:30
            })


            // 创建一个网格模型对象
            this.mesh = new THREE.Mesh(geometry,material);
            // 网格模型对象位置移动
            // this.mesh.translateX(130)
            //位置设置
            // this.mesh.position.set(120,0,0)
            //网格模型加载到场景中
            this.scene.add(this.mesh)

            // 创建点光源
            var point = new THREE.PointLight(0xDC4E41);
            point.position.set(400,200,300);
            this.scene.add(point)

            //创建环境光
            var ambient = new THREE.AmbientLight(0x444444);
            this.scene.add(ambient)




            // 创建一个相机

            this.camera = new THREE.OrthographicCamera(-200,200,200,-200,1,1000);
            this.camera.position.set(200,0,200);
            this.camera.lookAt(this.scene.position)


            // 创建渲染器
            this.renderer = new THREE.WebGLRenderer();
            this.renderer.setSize(1000,1000);
            this.renderer.setClearColor(0xb9d3ff,1);
            //插入 dom 元素
            content.appendChild(this.renderer.domElement)

            //渲染场景
            // renderer.render(scene,camera)
            let controls = new OrbitControls(this.camera,this.renderer.domElement)
            controls.addEventListener("resize",this.render(),false)
            // this.render()
        },

        // 渲染方法
        render(){
           this.renderer.render(this.scene,this.camera);
                this.mesh.rotateY(0.01)
                requestAnimationFrame(this.render)
        },
    }


}
</script>

<style scoped>
 
</style>