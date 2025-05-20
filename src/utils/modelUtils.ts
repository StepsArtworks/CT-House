import { FloorLevel, ModelState } from '../types/model';

// Helper function to handle model group visibility
export const updateModelVisibility = (
  object: THREE.Object3D, 
  floorLevel: FloorLevel, 
  visible: boolean
): void => {
  // This is a placeholder function that would be replaced with
  // actual logic based on your specific model structure
  if (!object) return;
  
  // Example: Match objects by naming convention
  object.traverse((child) => {
    if (child.name.includes(`floor_${floorLevel}`)) {
      child.visible = visible;
    }
  });
};

// Helper function to handle furniture opacity
export const updateFurnitureOpacity = (
  object: THREE.Object3D,
  floorLevel: FloorLevel,
  opacity: number
): void => {
  // This is a placeholder function that would be replaced with
  // actual logic based on your specific model structure
  if (!object) return;
  
  const normalizedOpacity = opacity / 100;
  
  // Example: Match furniture objects by naming convention
  object.traverse((child) => {
    if (child.name.includes('furniture') && child.name.includes(floorLevel)) {
      if ('material' in child && child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((mat) => {
            mat.opacity = normalizedOpacity;
            mat.transparent = normalizedOpacity < 1;
            mat.needsUpdate = true;
          });
        } else {
          child.material.opacity = normalizedOpacity;
          child.material.transparent = normalizedOpacity < 1;
          child.material.needsUpdate = true;
        }
      }
    }
  });
};

// Function to get optimal camera position for a specific floor
export const getCameraPositionForFloor = (
  floorLevel: FloorLevel
): [number, number, number] => {
  switch (floorLevel) {
    case 'ground':
      return [10, 2, 10];
    case 'first':
      return [10, 5, 10];
    case 'second':
      return [10, 8, 10];
    default:
      return [10, 5, 10];
  }
};

// Function to animate camera movement
export const animateCameraToPosition = (
  camera: THREE.Camera,
  targetPosition: [number, number, number],
  duration: number = 1000
): Promise<void> => {
  return new Promise((resolve) => {
    const startPosition = [camera.position.x, camera.position.y, camera.position.z];
    const startTime = performance.now();
    
    function animate() {
      const currentTime = performance.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Simple easing function
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      camera.position.x = startPosition[0] + (targetPosition[0] - startPosition[0]) * easeProgress;
      camera.position.y = startPosition[1] + (targetPosition[1] - startPosition[1]) * easeProgress;
      camera.position.z = startPosition[2] + (targetPosition[2] - startPosition[2]) * easeProgress;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        resolve();
      }
    }
    
    animate();
  });
};