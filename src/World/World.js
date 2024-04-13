import { createControls } from "./systems/controls"
import { createScene } from "./components/scene"
import { createCamera } from "./components/camera"
import { createRenderer } from "./systems/renderer"
import { Resizer } from "./systems/Resizer"
import { Loop } from "./systems/Loop"
import { createRaycaster } from "./systems/raycaster"
import { Vector2 } from "three"

let camera
let renderer
let scene
let loop
let mouse = new Vector2(), INTERSECTED

class World
{
  constructor(container)
  {
    // setting up the scene
    renderer = createRenderer()
    camera = createCamera(container)
    scene = createScene()
    container.append(renderer.domElement)

    //setting the animation loop
    loop = new Loop(camera, scene, renderer)
    
    // creating controls + adding to loop
    const controls = createControls(camera, renderer.domElement)
    loop.updatables.push(controls)

    // creating window resizing
    new Resizer(container, camera, renderer)

    // following mouse event
    window.addEventListener('mousemove', (e) => this.mouseEvent(e))
  }
  
  render()
  {
    renderer.render(scene, camera)
  }

  start()
  {
    loop.start()
  }

  stop()
  {
    loop.stop()
  }
  
  // capturing mouse
  mouseEvent(e)
  {
      e.preventDefault();
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }
}


export { World }