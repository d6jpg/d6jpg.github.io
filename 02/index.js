window.addEventListener('DOMContentLoaded', init);

function init(){
  const width = 960;
  const height = 540;

  //レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#myCanvas')
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  //シーンを作成
  const scene = new THREE.Scene();

  //カメラを作成
  // new THREE.PerspectiveCamera(画角, アスペクト比, 描画開始距離, 描画終了距離)
  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
  camera.position.set(0, 0, +1000);

  //球体を作成
  const geometry = new THREE.SphereGeometry(300, 30, 30);
  //色を指定する場合
  // const material = new THREE.MeshStandardMaterial({color: 0xFF0000});
  // const material = new THREE.MeshNormalMaterial({color: 0x0000FF});
  // const material = new THREE.MeshBasicMaterial({color: 0x0000FF});

  //画像を読み込む
  const loader = new THREE.TextureLoader();
  const texture = loader.load('imgs/earthmap1k.jpg');
  //マテリアルにテクスチャを設定
  const material = new THREE.MeshStandardMaterial({map: texture});

  //メッシュを作成
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  //平行投影
  // new THREE.DirectionalLight(色)
  const directionalLight = new THREE.DirectionalLight(0xFFFFFF);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  //初回実行
  tick();

  function tick(){
    requestAnimationFrame(tick);

    //メッシュを回転させる
    mesh.rotation.y += 0.007;

    //レンダリング
    renderer.render(scene, camera);
  }
}
