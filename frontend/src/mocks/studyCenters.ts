import type { StudyCenter } from '../types';

export const MOCK_STUDY_CENTERS: StudyCenter[] = [
  {
    id: 1,
    name: 'Ingeniería de Sistemas',
    description:
      'Acá podrás encontrar bebidas, empanadas, chocolate caliente, postres, servicio de videojuegos, y un excelente ambiente para estudiar.',
    logoUrl:
      'https://lh3.googleusercontent.com/aida/ADBb0uh7dW3lYfY5pkI6F-3wPbI49RlCXO7r_pb70iKfd-P8GV-mqxPCgqz9y4nHMOilh2g3aEwWfGzHpPUf7T7cmWeTi3ymPjX_H8uN3I79V_qPOU9Bgddorm3SLvAqqXeIV6sXgt3wKotVvLrYg0frXMU0psn_o0fJZH8nVwQaIO1rCD_gct8uixkveKSid2q6RLGgzOSHzc9ZM6-Ory143ibQYBFaLcuw3kqciAonW0PyCs7Rn9-FBbGkbKY3DdQNSEwF7GPoEFUzfzo',
    location: 'Edificio de Ingenierías, Piso 3',
    amenities: ['wifi', 'ac', 'microwave', 'games'],
    schedule: 'Lun - Vie  8:00 AM - 6:00 PM',
    membershipFree: true,
  },
  {
    id: 2,
    name: 'Ingeniería Civil',
    description:
      'Espacio de estudio con recursos especializados en construcción e infraestructura.',
    logoUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBP69IUfaOqvhkO8RV-4-Sibzd7bHFEs30ZPHTwXjx8FYxWY0ojAA2_P4UPnQr4PDrnLuUuAQ-jJCw9CN0y3JwsTB9Lo4itU-pkZwvR07E5G5VOzO_Yl0nOLlMNf-AAn7R6bnsOhnkCsAwUvTc1fCYV1a4CyQ--Uovh42vdyOqgaEjh1it64pppW620RHKvCUFUKzU47nj-cUJxjbMbLt5lTNsp6hKLFmy90AJHsWfc0aXKswKVHMrex8v3gSUkUjE1CVglCVHiFim3',
    location: 'Edificio A, Piso 1',
    amenities: ['wifi'],
    schedule: 'Lun - Vie  7:00 AM - 5:00 PM',
    membershipFree: true,
  },
  {
    id: 3,
    name: 'Ingeniería Mecánica',
    description: 'Laboratorios de robótica avanzada y sistemas automatizados.',
    logoUrl: null,
    location: 'Edificio de Talleres',
    amenities: ['wifi', 'ac'],
    schedule: 'Lun - Vie  8:00 AM - 5:00 PM',
    membershipFree: false,
  },
  {
    id: 4,
    name: 'Química',
    description: 'Laboratorios de ingeniería química y biología molecular.',
    logoUrl: null,
    location: 'Edificio B, Piso 2',
    amenities: ['ac'],
    schedule: 'Lun - Vie  8:00 AM - 5:00 PM',
    membershipFree: false,
  },
  {
    id: 5,
    name: 'Derecho',
    description: 'Biblioteca jurídica y salas de litigación simulada.',
    logoUrl: null,
    location: 'Edificio C, Piso 1',
    amenities: ['wifi'],
    schedule: 'Lun - Vie  8:00 AM - 6:00 PM',
    membershipFree: true,
  },
  {
    id: 6,
    name: 'Petróleos',
    description: 'Centros de recursos energéticos e investigación geológica.',
    logoUrl: null,
    location: 'Edificio D, Piso 2',
    amenities: ['wifi', 'ac'],
    schedule: 'Lun - Vie  8:00 AM - 5:00 PM',
    membershipFree: false,
  },
];
