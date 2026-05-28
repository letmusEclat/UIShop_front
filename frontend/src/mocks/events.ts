import type { AppEvent } from '../types';

const SERVER = 'http://localhost:3000';

export const MOCK_EVENTS: AppEvent[] = [
  {
    id: 1,
    title: 'Feria de Innovación y Nuevas Tecnologías',
    studyCenterName: 'Ingeniería Mecánica',
    date: '2026-10-15',
    category: 'Ingeniería Mecánica',
    actionLabel: 'Ver Detalles',
    imageUrl: `${SERVER}/uploads/inovacion.png`,
  },
  {
    id: 2,
    title: 'Hackathon UIS 2026',
    studyCenterName: 'Ingeniería de Sistemas',
    date: '2026-09-05',
    time: '08:00 - 18:00',
    category: 'Ingeniería de Sistemas',
    actionLabel: 'Registrarse',
    imageUrl: `${SERVER}/uploads/hackathon.jpg`,
  },
  {
    id: 3,
    title: 'Seminario de Termodinámica',
    studyCenterName: 'Química',
    date: '2026-11-22',
    time: '14:00 - 17:00',
    category: 'Química',
    actionLabel: 'Registrarse',
    imageUrl: null,
  },
];
