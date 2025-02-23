import { Raycaster, Vector2 } from "three"

function createRaycaster(mouse, camera, scene)
{
  const raycaster = new Raycaster()
  raycaster.setFromCamera(mouse, camera)

  return raycaster.intersectObjects(scene.children, false)
}

export { createRaycaster }