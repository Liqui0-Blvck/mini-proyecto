import React, { useRef, useEffect, useState } from 'react';

interface ControlPoint {
    x: number;
    y: number;
}

export interface Muscle {
    name: string;
    path: string; // Define el camino SVG para la forma del músculo
    controlPoints?: ControlPoint[]; // Puntos de control opcionales
    controlColor?: string; // Color opcional para los puntos de control
}

interface CanvasProps {
    imageUrl: string;
    muscles: Muscle[];
    highlightedMuscle?: string; // Grupo muscular destacado
    onMuscleClick?: (muscleName: string) => void; // Función para manejar clic en el músculo
    onMuscleHover?: (muscleName: string | null) => void; // Función para manejar hover sobre el músculo
}

const Canvas: React.FC<CanvasProps> = ({ imageUrl, muscles, highlightedMuscle, onMuscleClick, onMuscleHover }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null); // Nuevo estado para el músculo seleccionado
    const [hoveredMuscle, setHoveredMuscle] = useState<string | null>(null); // Nuevo estado para el músculo en hover

    const scale = 0.9; // Mantener la escala
    const translateX = 10; // Mantener la traslación en X
    const translateY = 10; // Mantener la traslación en Y

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
                const transformedPath = transformPath(muscle.path, scale, translateX, translateY);

                const path = new Path2D(transformedPath);

                // Determina el color de relleno basado en el estado de selección, resaltado y hover
                if (muscle.name === selectedMuscle) {
                    ctx.fillStyle = 'rgba(255, 5, 0, 0.5)'; // Color para el músculo seleccionado
                } else if (muscle.name === highlightedMuscle || muscle.name === hoveredMuscle) {
                    ctx.fillStyle = 'rgba(255, 1, 1, 0.3)'; // Color para el músculo destacado o en hover
                } else {
                    ctx.fillStyle = 'rgba(0, 0, 0, 0)'; // Color por defecto
                }

                ctx.strokeStyle = 'black';
                ctx.lineWidth = 0.3;

                ctx.stroke(path);
                ctx.fill(path);

                // Dibujar puntos de control si están definidos
                if (muscle.controlPoints) {
                    muscle.controlPoints.forEach(point => {
                        ctx.fillStyle = muscle.controlColor || 'green';
                        ctx.beginPath();
                        ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI);
                        ctx.fill();
                    });
                }
            });
        };

        const transformPath = (path: string, scale: number, translateX: number, translateY: number): string => {
            // Aplicar la transformación de escala y translación a las coordenadas del path
            return path
                .replace(/(\d+(\.\d+)?)/g, (match) => (parseFloat(match) * scale).toFixed(2))
                .replace(/([MLC])\s*(-?\d+(\.\d+)?)/g, (_match, p1, p2) => `${p1} ${(parseFloat(p2) * scale + translateX).toFixed(2)}`)
                .replace(/([Q])\s*(-?\d+(\.\d+)?)/g, (_match, p1, p2) => `${p1} ${(parseFloat(p2) * scale + translateY).toFixed(2)}`);
        };

        const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width; // Factor de escala en X
            const scaleY = canvas.height / rect.height; // Factor de escala en Y
            const x = (event.clientX - rect.left) * scaleX;
            const y = (event.clientY - rect.top) * scaleY;

            let hoverMuscle: string | null = null;

            muscles.forEach(muscle => {
                const transformedPath = transformPath(muscle.path, scale, translateX, translateY);
                const path = new Path2D(transformedPath);
                if (ctx.isPointInPath(path, x, y)) {
                    hoverMuscle = muscle.name;
                }
            });

            setHoveredMuscle(hoverMuscle);
            if (onMuscleHover) {
                onMuscleHover(hoverMuscle);
            }
        };

        const handleClick = (event: MouseEvent) => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;
            const x = (event.clientX - rect.left) * scaleX;
            const y = (event.clientY - rect.top) * scaleY;

            let clickedMuscle: string | null = null;

            muscles.forEach(muscle => {
                const transformedPath = transformPath(muscle.path, scale, translateX, translateY);
                const path = new Path2D(transformedPath);
                if (ctx.isPointInPath(path, x, y)) {
                    clickedMuscle = muscle.name;
                }
            });

            if (clickedMuscle) {
                if (clickedMuscle === selectedMuscle || highlightedMuscle !== clickedMuscle) {
                    // Si el músculo clickeado es el mismo que el seleccionado, deselecciona
                    setSelectedMuscle(null);
                } else {
                    // Selecciona el nuevo músculo
                    setSelectedMuscle(clickedMuscle);
                }
                if (onMuscleClick) {
                    onMuscleClick(clickedMuscle);
                }
            }
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
    }, [imageUrl, muscles, highlightedMuscle, selectedMuscle, hoveredMuscle, onMuscleClick, onMuscleHover]);

    return (
        <canvas ref={canvasRef} />
    );
};

export default Canvas;
