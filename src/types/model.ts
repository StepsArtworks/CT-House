export interface FloorData {
  id: string;
  name: string;
  level: number;
  hasFurniture: boolean;
}

export interface ModelVisibility {
  [floorId: string]: {
    visible: boolean;
    furnitureVisible: number; // 0-100 slider value
  };
}

export type FloorLevel = 'ground' | 'first' | 'second';

export interface ModelState {
  currentFloor: FloorLevel;
  floors: {
    [key in FloorLevel]: {
      visible: boolean;
      furnitureOpacity: number;
    }
  };
  isLoading: boolean;
  loadingProgress: number;
}