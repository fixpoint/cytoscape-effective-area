import { Core } from 'cytoscape';

export interface Area {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
}

export class EffectiveArea {
  private cy: Core;
  private original: { [key: string]: (...args: any[]) => any };

  public constructor(cy: Core) {
    this.cy = cy;
    this.original = {
      getCenterPan: (cy as any).getCenterPan,
      getFitViewport: (cy as any).getFitViewport,
    };
  }

  public enable(effectiveAreaGetter: () => Area): void {
    const cy = this.cy;
    (cy as any).getCenterPan = (...args: any[]) => {
      const effectiveArea = effectiveAreaGetter();
      const originalSize = (cy as any).size;
      (cy as any).size = () => {
        return {
          width: effectiveArea.width,
          height: effectiveArea.height,
        };
      };
      try {
        const r = this.original.getCenterPan.call(cy, args);
        if (!r) {
          return r;
        }
        r.x += effectiveArea.x;
        r.y += effectiveArea.y;
        return r;
      } finally {
        (cy as any).size = originalSize;
      }
    };
    (cy as any).getFitViewport = (...args: any[]) => {
      const effectiveArea = effectiveAreaGetter();
      const originalSize = (cy as any).size;
      (cy as any).size = () => {
        return {
          width: effectiveArea.width,
          height: effectiveArea.height,
        };
      };
      try {
        const r = this.original.getFitViewport.call(cy, args);
        if (!r) {
          return r;
        }
        r.pan.x += effectiveArea.x;
        r.pan.y += effectiveArea.y;
        return r;
      } finally {
        (cy as any).size = originalSize;
      }
    };
  }

  public disable(): void {
    const cy = this.cy;
    (cy as any).getCenterPan = this.original.getCenterPan;
    (cy as any).getFitViewport = this.original.getFitViewport;
  }
}

export default function extension(
  this: Core,
  effectiveAreaGetter: () => Area,
): EffectiveArea {
  const effectiveArea = new EffectiveArea(this);
  effectiveArea.enable(effectiveAreaGetter);
  return effectiveArea;
}
