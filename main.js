const canvas = document.querySelector('canvas.webgl')

/**
 * scene
 */
const scene = new THREE.Scene()

/**
 * GLTF Loader
 */
let shoe = null;
const gltfLoader = new THREE.GLTFLoader()
gltfLoader.load(
    './nike_air_jordan/scene.gltf',
    (gltf) => {
        shoe = gltf.scene;

        shoe.position.x = 0.1



        const radius = 0.8
        shoe.scale.set(radius, radius, radius)

        scene.add(shoe)
    })

/**
 * shoe rotations
 */
const shift = [
    {
        rotationZ: 0.45,
        positionX: -0.5
    },
    {
        rotationZ: 6.5,
        positionX: 2.5
    },
    {
        rotationZ: 0,
        positionX: 0
    }
]


/**
 * scrollY
 */
let scrollY = window.scrollY
let currentSelection = 0
window.addEventListener('scroll', () => {
    scrollY = window.scrollY
    const newSelection = Math.round(scrollY / sizes.height)


    if (newSelection != currentSelection) {
        currentSelection =  newSelection;

        if (!!shoe) {
            gsap.to(
                shoe.rotation, {
                    duration: 1.5,
                    ease: 'power2.inOut',
                    z: shift[currentSelection].rotationZ 
                }
            )
            gsap.to(
                shoe.position, {
                    duration: 1.5,
                    ease: 'power2.inOut',
                    x: shift[currentSelection].positionX
                }
            )
        }
    }
})


/**
 * reload page to start
 */
window.onbeforeunload = function(){
    window.scrollTo(0, 0)
}





const sizes = {
    width: window.innerHeight,
    height: window.innerHeight
}

/**
 * camera
 */
const camera = new THREE.PerspectiveCamera(55,sizes.width / sizes.height ,0.1, 1000)
camera.position.z = 5
scene.add(camera)


/**
 * lights
 */
const light = new THREE.AmbientLight( 0x404040 ); 
scene.add( light );

const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
directionalLight.position.set(1,2,0.2)
scene.add( directionalLight );


/**
 * render
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
})

renderer.setSize(sizes.width, sizes.height)

/**
 * Orbit Control
 */
const controls = new THREE.OrbitControls (camera, canvas);

controls.enable = true;





 

/**
 * Clock/animation
 */
const clock = new THREE.Clock()
let lastElapsedTime = 0

const time = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - lastElapsedTime
    lastElapsedTime = elapsedTime

    if(!!shoe) {
        shoe.position.y = Math.sin(elapsedTime * 3) * 0.1 - 0.1
    }



    renderer.render(scene, camera)
    controls.update();

    window.requestAnimationFrame(time)

    




}
time();

/**
 * for orbit control
 */
function animate() {
    window.requestAnimationFrame( animate );
}
animate();