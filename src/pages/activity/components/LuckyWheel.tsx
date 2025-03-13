import React, { useState, useRef, useEffect } from 'react';
import { Trophy, Gift, Star, Heart, Coffee, Pizza, Soup, Beef, Salad, UtensilsCrossed } from 'lucide-react';

export interface Prize {
  id: number;
  name: string;
  probability: number;
  color: string;
  icon?: React.ElementType;
}

interface LuckyWheelProps {
  prizes: Prize[];
  title?: string;
  size?: number;
  onResult?: (prize: Prize) => void;
}

export function LuckyWheel({ 
  prizes, 
  title = "幸运大转盘",
  size = 400,
  onResult 
}: LuckyWheelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentRotation, setCurrentRotation] = useState(0);
  const [selectedPrize, setSelectedPrize] = useState<Prize | null>(null);

  useEffect(() => {
    drawWheel();
    if (!isSpinning) {
      const interval = setInterval(() => {
        setCurrentRotation(prev => prev + 0.001);
        drawWheel();
      }, 16);
      return () => clearInterval(interval);
    }
  }, [currentRotation, isSpinning, prizes]);

  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const totalPrizes = prizes.length;
    const anglePerPrize = (2 * Math.PI) / totalPrizes;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;

    // Draw outer ring with gradient
    const ringGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    ringGradient.addColorStop(0, '#FFD700');
    ringGradient.addColorStop(0.5, '#FFA500');
    ringGradient.addColorStop(1, '#FFD700');
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 10, 0, 2 * Math.PI);
    ctx.strokeStyle = ringGradient;
    ctx.lineWidth = 4;
    ctx.stroke();

    // Draw sectors with gradient
    prizes.forEach((prize, index) => {
      const startAngle = index * anglePerPrize + currentRotation;
      const endAngle = (index + 1) * anglePerPrize + currentRotation;

      // Create gradient
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, radius
      );
      gradient.addColorStop(0, '#FFFFFF');
      gradient.addColorStop(1, prize.color);

      // Draw sector
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw text
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + anglePerPrize / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#000000';
      ctx.font = 'bold 16px Arial';
      ctx.fillText(prize.name, radius - 40, 0);
      ctx.restore();
    });

    // Draw center pointer
    const pointerSize = 30;
    ctx.save();
    ctx.translate(centerX, centerY);
    
    // Draw circular base
    ctx.beginPath();
    ctx.arc(0, 0, pointerSize, 0, 2 * Math.PI);
    const centerGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, pointerSize);
    centerGradient.addColorStop(0, '#FFD700');
    centerGradient.addColorStop(1, '#FFA500');
    ctx.fillStyle = centerGradient;
    ctx.fill();
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw pointer
    ctx.beginPath();
    ctx.moveTo(-pointerSize/2, 0);
    ctx.lineTo(pointerSize/2, 0);
    ctx.lineTo(0, -pointerSize * 1.5);
    ctx.closePath();
    ctx.fillStyle = '#FF4444';
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.fill();
    ctx.stroke();

    ctx.restore();
  };

  const spin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSelectedPrize(null);

    // Calculate result based on probability
    const random = Math.random() * 100;
    let probabilitySum = 0;
    let selected: Prize | null = null;

    for (const prize of prizes) {
      probabilitySum += prize.probability;
      if (random <= probabilitySum) {
        selected = prize;
        break;
      }
    }

    if (!selected) return;

    // Enhanced spinning animation
    const prizeIndex = prizes.findIndex(p => p.id === selected?.id);
    const minSpins = 5;
    const maxExtraSpins = 3;
    const extraSpins = Math.random() * maxExtraSpins;
    const targetRotation = currentRotation - (
      (2 * Math.PI * (minSpins + extraSpins)) + 
      (prizeIndex * (2 * Math.PI / prizes.length))
    );

    // Animate with dynamic easing
    const startTime = performance.now();
    const startRotation = currentRotation;
    const duration = 6000;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeOut = (t: number) => {
        const c4 = (2 * Math.PI) / 3;
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4);
      };
      const currentProgress = easeOut(progress);

      const newRotation = startRotation + (targetRotation - startRotation) * currentProgress;
      setCurrentRotation(newRotation);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        setSelectedPrize(selected);
        onResult?.(selected);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={size}
          height={size}
          className="rounded-full shadow-2xl"
          style={{
            filter: 'drop-shadow(0 0 10px rgba(0, 0, 0, 0.3))',
          }}
        />
      </div>

      <button
        onClick={spin}
        disabled={isSpinning}
        className={`
          px-8 py-3 rounded-full text-xl font-bold
          transition-all duration-300 transform
          ${isSpinning
            ? 'bg-gray-400 cursor-not-allowed scale-95'
            : 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 hover:scale-105 active:scale-95'
          }
          text-white shadow-lg
        `}
      >
        {isSpinning ? '抽奖中...' : '开始抽奖'}
      </button>
    </div>
  );
}