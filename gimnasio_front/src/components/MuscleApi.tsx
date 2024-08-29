import React, { useRef, useEffect, useState } from 'react';

interface ControlPoint {
    x: number;
    y: number;
}

interface Muscle {
    name: string;
    path: string; // Define el camino SVG para la forma del músculo
    controlPoints?: ControlPoint[]; // Puntos de control opcionales
    controlColor?: string; // Color opcional para los puntos de control
}

interface CanvasProps {
    imageUrl: string;
    muscles: Muscle[];
    onMuscleClick?: (muscleName: string) => void; // Función para manejar clic en el músculo
    onMuscleHover?: (muscleName: string | null) => void; // Función para manejar hover sobre el músculo
}

const Canvas: React.FC<CanvasProps> = ({ imageUrl, muscles, onMuscleClick, onMuscleHover }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [highlightedMuscle, setHighlightedMuscle] = useState<string | null>(null);
    const scale = 0.9; // Ajusta la escala según sea necesario
    const translateX = 10; // Ajusta la traslación en X según sea necesario
    const translateY = 10; // Ajusta la traslación en Y según sea necesario

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = new Image();
        img.src = imageUrl;

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            drawMuscleAreas();
        };

        const drawMuscleAreas = () => {
            if (!ctx) return;

            ctx.drawImage(img, 0, 0);

            muscles.forEach(muscle => {
                // Aplicar la transformación al path
                const transformedPath = transformPath(muscle.path, scale, translateX, translateY);

                const path = new Path2D(transformedPath);
                ctx.strokeStyle = highlightedMuscle === muscle.name ? 'black' : 'black';
                ctx.lineWidth = 2;
                ctx.fillStyle = highlightedMuscle === muscle.name ? 'rgba(255, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0)';

                ctx.stroke(path);
                ctx.fill(path);

                // Dibujar puntos de control si están definidos
                if (muscle.controlPoints) {
                    muscle.controlPoints.forEach(point => {
                        ctx.fillStyle = muscle.controlColor || 'green';
                        ctx.beginPath();
                        ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
                        ctx.fill();
                    });
                }
            });
        };

        const transformPath = (path: string, scale: number, translateX: number, translateY: number): string => {
            // Aquí aplicamos la transformación de escala y translación
            const transformedPath = path
                .replace(/(\d+(\.\d+)?)/g, (match) => (parseFloat(match) * scale).toFixed(2))
                .replace(/([MLC])\s*(-?\d+(\.\d+)?)/g, (match, p1, p2) => `${p1} ${(parseFloat(p2) * scale + translateX).toFixed(2)}`)
                .replace(/([Q])\s*(-?\d+(\.\d+)?)/g, (match, p1, p2) => `${p1} ${(parseFloat(p2) * scale + translateY).toFixed(2)}`);
            
            return transformedPath;
        };

        const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            let hoverMuscle: string | null = null;

            muscles.forEach(muscle => {
                const transformedPath = transformPath(muscle.path, scale, translateX, translateY);
                const path = new Path2D(transformedPath);
                if (ctx.isPointInPath(path, x, y)) {
                    hoverMuscle = muscle.name;
                }
            });

            setHighlightedMuscle(hoverMuscle);
            if (onMuscleHover) {
                onMuscleHover(hoverMuscle);
            }
        };

        const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            muscles.forEach(muscle => {
                const transformedPath = transformPath(muscle.path, scale, translateX, translateY);
                const path = new Path2D(transformedPath);
                if (ctx.isPointInPath(path, x, y)) {
                    setHighlightedMuscle(muscle.name);
                    if (onMuscleClick) {
                        onMuscleClick(muscle.name);
                    }
                }
            });
        };

        const canvasElement = canvasRef.current;
        if (canvasElement) {
          //@ts-ignore
            canvasElement.addEventListener('mousemove', handleMouseMove);
            //@ts-ignore
            canvasElement.addEventListener('click', handleClick);
        }

        return () => {
            if (canvasElement) {
              //@ts-ignore
                canvasElement.removeEventListener('mousemove', handleMouseMove);
                //@ts-ignore
                canvasElement.removeEventListener('click', handleClick);
            }
        };
    }, [imageUrl, muscles, highlightedMuscle, onMuscleClick, onMuscleHover]);

    return (
        <canvas ref={canvasRef} style={{ border: '1px solid black' }} />
    );
};

export default Canvas;
